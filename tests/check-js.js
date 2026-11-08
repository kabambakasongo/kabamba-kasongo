const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const roots = [path.join(root, 'assets', 'js'), __dirname];

function collectJavaScript(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectJavaScript(file);
    return entry.isFile() && file.endsWith('.js') ? [file] : [];
  });
}

const files = roots.flatMap(collectJavaScript);
let failed = false;

files.forEach((file) => {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) failed = true;
});

if (failed) process.exitCode = 1;
else console.log(`Syntax OK: ${files.length} JavaScript files.`);
