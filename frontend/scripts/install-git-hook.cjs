const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const hook = `#!/bin/sh
set -e
echo "pre-commit: eslint"
ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT/frontend"
if command -v npm >/dev/null 2>&1; then
  npm run lint
else
  cmd.exe /c npm run lint
fi
`;

const root = path.resolve(__dirname, '../..');
const tracked = path.join(root, '.githooks', 'pre-commit');
const dest = path.join(root, '.git', 'hooks', 'pre-commit');

fs.mkdirSync(path.dirname(tracked), { recursive: true });
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(tracked, hook);
fs.writeFileSync(dest, hook);

try {
  execSync('git config --unset core.hooksPath', { cwd: root, stdio: 'ignore' });
} catch {
  // hooksPath may already be unset
}

console.log('Installed git hook:', dest);
