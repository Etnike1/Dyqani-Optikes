import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/pages')
let count = 0
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.jsx'))) {
  const p = path.join(dir, f)
  let c = fs.readFileSync(p, 'utf8')
  const o = c
  c = c.replace(/import DashboardShell from ['"].*?['"]\r?\n/g, '')
  c = c.replace(/<DashboardShell>\s*/g, '')
  c = c.replace(/\s*<\/DashboardShell>/g, '')
  if (c !== o) {
    fs.writeFileSync(p, c)
    count++
  }
}
console.log('Updated', count, 'files')
