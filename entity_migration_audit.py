import re
import json
from pathlib import Path

BASE = Path('Backend/src/main/java/com/dyqanioptikes/backend/models')
SQL_DIR = Path('Backend/src/main/resources/db/migration')

create_table_re = re.compile(r'CREATE\s+TABLE\s+([\[\]`\w]+)\s*\((.*?)\)\s*;', re.S | re.I)
col_def_re = re.compile(r'^[ \t]*(["`\[]?\w+["`\]]?)\s+', re.I)

migration_tables = {}
for p in sorted(SQL_DIR.glob('*.sql')):
    text = p.read_text(encoding='utf-8', errors='ignore')
    for m in create_table_re.finditer(text):
        tname = m.group(1).strip().strip('"`[]').lower()
        cols = []
        body = m.group(2)
        for line in body.splitlines():
            line = line.strip()
            if not line:
                continue
            if line.upper().startswith(('CONSTRAINT', 'PRIMARY KEY', 'FOREIGN KEY', 'UNIQUE', 'CHECK')):
                continue
            mm = col_def_re.match(line)
            if mm:
                col = mm.group(1).strip('"`[]').lower()
                cols.append(col)
        migration_tables[tname] = migration_tables.get(tname, []) + cols

entity_files = sorted(BASE.glob('*.java'))

entities = []
for p in entity_files:
    text = p.read_text(encoding='utf-8', errors='ignore')
    lines = text.splitlines()
    table_name = None
    class_name = None
    fields = []
    annotation_buf = []
    for i, line in enumerate(lines):
        s = line.strip()
        if not s:
            continue
        if class_name is None:
            m = re.search(r'class\s+(\w+)', line)
            if m:
                class_name = m.group(1).strip()
        if '@Table' in line:
            m = re.search(r'@Table\s*\(.*name\s*=\s*"([^"]+)"', line)
            if m:
                table_name = m.group(1).strip().lower()
            else:
                if '(' in line and 'name' not in line:
                    j = i + 1
                    block = line
                    while j < len(lines) and ')' not in lines[j]:
                        block += ' ' + lines[j].strip()
                        j += 1
                    if j < len(lines):
                        block += ' ' + lines[j].strip()
                    m = re.search(r'name\s*=\s*"([^"]+)"', block)
                    if m:
                        table_name = m.group(1).strip().lower()
        if s.startswith('@'):
            annotation_buf.append(s)
            continue
        m = re.match(r'^(private|protected|public)\s+([\w<>,?\[\]]+)\s+(\w+)\s*;', s)
        if m:
            field_name = m.group(3)
            colname = None
            for ann in reversed(annotation_buf):
                if ann.startswith('@Column'):
                    m2 = re.search(r'name\s*=\s*"([^"]+)"', ann)
                    if m2:
                        colname = m2.group(1).strip().lower()
                        break
            if colname is None:
                for ann in reversed(annotation_buf):
                    if ann.startswith('@JoinColumn'):
                        m2 = re.search(r'name\s*=\s*"([^"]+)"', ann)
                        if m2:
                            colname = m2.group(1).strip().lower()
                            break
            if colname is None:
                colname = field_name.lower()
            fields.append({'field': field_name, 'column': colname, 'annotations': annotation_buf.copy()})
            annotation_buf.clear()
        else:
            if not s.startswith('@'):
                annotation_buf.clear()
    if not table_name and class_name:
        table_name = class_name.lower()
    entities.append({'entity': p.name, 'table': table_name, 'fields': fields})

report = []
for ent in entities:
    table = ent['table']
    table_cols = set(migration_tables.get(table, []))
    row = {'entity': ent['entity'], 'table': table, 'table_exists': table in migration_tables, 'fields': []}
    for f in ent['fields']:
        row['fields'].append({'field': f['field'], 'column': f['column'], 'mapped': f['column'] in table_cols, 'annotations': f['annotations']})
    report.append(row)

out_path = Path('entity_migration_audit.json')
out_path.write_text(json.dumps({'migration_tables': migration_tables, 'entities': report}, indent=2), encoding='utf-8')
print('Wrote', out_path)
for r in report:
    if not r['table_exists']:
        print(f"[TABLE MISSING] {r['entity']} -> table '{r['table']}'")
    for f in r['fields']:
        if not f['mapped']:
            print(f"[COLUMN MISMATCH] {r['entity']}.{f['field']} -> '{f['column']}' not found in {r['table']}")
PY