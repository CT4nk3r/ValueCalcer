const fs = require('fs');
const path = require('path');

const rootPkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));
const version = rootPkg.version;

// Update web/package.json
const webPkgPath = path.join(__dirname, '..', 'web', 'package.json');
const webPkg = JSON.parse(fs.readFileSync(webPkgPath, 'utf-8'));
webPkg.version = version;
fs.writeFileSync(webPkgPath, JSON.stringify(webPkg, null, 2) + '\n');
console.log(`Updated web/package.json to version ${version}`);

// Update tauri.conf.json
const tauriConfPath = path.join(__dirname, '..', 'web', 'src-tauri', 'tauri.conf.json');
const tauriConf = JSON.parse(fs.readFileSync(tauriConfPath, 'utf-8'));
tauriConf.package.version = version;
fs.writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2) + '\n');
console.log(`Updated tauri.conf.json to version ${version}`);
