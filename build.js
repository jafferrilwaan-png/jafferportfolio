import fs from 'fs';
import path from 'path';

const rootDir = import.meta.dirname || process.cwd();
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');
const srcHtml = path.join(rootDir, 'index.html');

fs.mkdirSync(distDir, { recursive: true });
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, distDir, { recursive: true });
}
fs.copyFileSync(srcHtml, path.join(distDir, 'index.html'));
if (fs.existsSync(publicDir)) {
  fs.copyFileSync(srcHtml, path.join(publicDir, 'index.html'));
}
console.log('Built Neo-Brutalism Jaffer Portfolio successfully to dist/!');
