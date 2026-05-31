$modelDir = 'Backend\src\main\java\com\dyqanioptikes\backend\models'
$sqlDir = 'Backend\src\main\resources\db\migration'

function Get-TableDefinitions {
    param([string]$path)
    $text = Get-Content $path -Raw
    $tables = @{}
    $pattern = '(?i)CREATE\s+TABLE\s+([\[`"\]\w]+)\s*\('
    $matches = [regex]::Matches($text, $pattern)
    foreach ($m in $matches) {
        $name = $m.Groups[1].Value.Trim('"[]`').ToLower()
        $startIndex = $m.Index + $m.Length - 1
        $depth = 1
        $endIndex = $startIndex
        while ($endIndex -lt $text.Length -and $depth -gt 0) {
            $endIndex++
            switch ($text[$endIndex]) {
                '(' { $depth++ }
                ')' { $depth-- }
            }
        }
        if ($depth -ne 0) { continue }
        $body = $text.Substring($startIndex + 1, $endIndex - $startIndex - 1)
        $cols = @()
        foreach ($line in $body -split "\r?\n") {
            $line = $line.Trim()
            if (-not $line) { continue }
            if ($line -match '^(CONSTRAINT|PRIMARY KEY|FOREIGN KEY|UNIQUE|CHECK)\b') { continue }
            if ($line -match '^["`\[]?(\w+)["`\]]?\s+') {
                $cols += $Matches[1].Trim('"[]`').ToLower()
            }
        }
        if (-not $tables.ContainsKey($name)) { $tables[$name] = @() }
        foreach ($col in $cols) {
            if (-not $tables[$name] -contains $col) { $tables[$name] += $col }
        }
    }

    $alterPattern = '(?im)ALTER\s+TABLE\s+([\[`"\]\w]+)\s+ADD\s+(?:COLUMN\s+)?(?!CONSTRAINT)(["`\[]?\w+["`\]]?)\s+'
    $alterMatches = [regex]::Matches($text, $alterPattern)
    foreach ($am in $alterMatches) {
        $name = $am.Groups[1].Value.Trim('"[]`').ToLower()
        $col = $am.Groups[2].Value.Trim('"[]`').ToLower()
        if (-not $tables.ContainsKey($name)) { $tables[$name] = @() }
        if (-not $tables[$name] -contains $col) { $tables[$name] += $col }
    }

    foreach ($tableName in $tables.Keys) {
        [PSCustomObject]@{ Table = $tableName; Columns = $tables[$tableName] }
    }
}

function Get-EntityMappings {
    param([string]$path)
    $text = Get-Content $path
    $table = $null
    $class = $null
    $fields = @()
    $annotations = @()
    foreach ($line in $text) {
        $trim = $line.Trim()
        if (-not $trim) { continue }
        if (-not $class -and $trim -match 'class\s+(\w+)') {
            $class = $Matches[1]
        }
        if ($trim -match '@Table\s*\(') {
            $block = $trim
            if ($trim -notmatch 'name\s*=') {
                $i = [Array]::IndexOf($text, $line)
                $j = $i + 1
                while ($j -lt $text.Length -and $text[$j] -notmatch '\)') {
                    $block += ' ' + $text[$j].Trim()
                    $j++
                }
                if ($j -lt $text.Length) { $block += ' ' + $text[$j].Trim() }
            }
            if ($block -match 'name\s*=\s*"([^"]+)"') {
                $table = $Matches[1].ToLower()
            }
        }
        if ($trim.StartsWith('@')) {
            $annotations += $trim
            continue
        }
        if ($trim -match '^(private|protected|public)\s+[\w<>,\[\]?]+\s+(\w+)\s*;') {
            $field = $matches[2]
            $col = $null
            $reversedAnnotations = $annotations.Clone()
            [System.Array]::Reverse($reversedAnnotations)
            foreach ($ann in $reversedAnnotations) {
                if ($ann -match '@Column\s*\(.*name\s*=\s*"([^"]+)"') { $col = $Matches[1].ToLower(); break }
            }
            if (-not $col) {
                $reversedAnnotations = $annotations.Clone()
                [System.Array]::Reverse($reversedAnnotations)
                foreach ($ann in $reversedAnnotations) {
                    if ($ann -match '@JoinColumn\s*\(.*name\s*=\s*"([^"]+)"') { $col = $Matches[1].ToLower(); break }
                }
            }
            if (-not $col) { $col = $field.ToLower() }
            $fields += [PSCustomObject]@{ Field = $field; Column = $col; Annotations = $annotations -join '; ' }
            $annotations = @()
        } elseif (-not $trim.StartsWith('@')) {
            $annotations = @()
        }
    }
    if (-not $table -and $class) { $table = $class.ToLower() }
    [PSCustomObject]@{ Entity = [IO.Path]::GetFileName($path); Table = $table; Fields = $fields }
}

$tables = @{}
Get-ChildItem -Path $sqlDir -Filter *.sql | ForEach-Object {
    foreach ($t in Get-TableDefinitions -path $_.FullName) {
        if (-not $tables.ContainsKey($t.Table)) { $tables[$t.Table] = @() }
        foreach ($col in $t.Columns) {
            if (-not $tables[$t.Table] -contains $col) { $tables[$t.Table] += $col }
        }
    }
}

$entities = Get-ChildItem -Path $modelDir -Filter *.java | ForEach-Object {
    Get-EntityMappings -path $_.FullName
}

$result = [System.Collections.Generic.List[object]]::new()
foreach ($e in $entities) {
    $tableExists = $tables.ContainsKey($e.Table)
    $fields = @()
    foreach ($f in $e.Fields) {
        $mapped = $tableExists -and $tables[$e.Table] -contains $f.Column
        $fields += [PSCustomObject]@{ Field = $f.Field; Column = $f.Column; Mapped = $mapped; Annotations = $f.Annotations }
    }
    $result.Add([PSCustomObject]@{ Entity = $e.Entity; Table = $e.Table; TableExists = $tableExists; Fields = $fields })
}

$report = @()
foreach ($entry in $result) {
    if (-not $entry.TableExists) {
        Write-Host "[TABLE MISSING] Entity $($entry.Entity) -> table '$($entry.Table)'"
        $report += [PSCustomObject]@{ Level = 'TABLE_MISSING'; Entity = $entry.Entity; Table = $entry.Table }
    }
    foreach ($f in $entry.Fields) {
        if (-not $f.Mapped) {
            Write-Host "[COLUMN MISMATCH] Entity $($entry.Entity).$($f.Field) -> '$($f.Column)' not found in $($entry.Table)"
            $report += [PSCustomObject]@{ Level = 'COLUMN_MISMATCH'; Entity = $entry.Entity; Field = $f.Field; Column = $f.Column; Table = $entry.Table }
        }
    }
}

$summary = [PSCustomObject]@{
    Tables = $tables.GetEnumerator() | ForEach-Object { [PSCustomObject]@{ Table = $_.Key; Columns = $_.Value } }
    Entities = $result
    Findings = $report
}
$summary | ConvertTo-Json -Depth 6 | Set-Content -Path 'entity_migration_audit.json'
Write-Host 'Audit report written to entity_migration_audit.json'
