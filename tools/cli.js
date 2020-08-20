const action = process.argv[2];
const { exec } = require('child_process');
const fs = require('fs');
let config, user, files, pushedFiles;
try {
  config = require('../hackmud.json');
} catch (e) {
  fs.writeFileSync('./hackmud.json', '{\n  "path": "",\n  "default_user": ""\n}');
  console.warn('!!! a hackmud.json file was created, make sure to set the appropriate settings');
  config = {};
}

switch (action) {
  case 'push':
    if (!config.path)
      return console.error('!!! You need to set a path before pushing');
    user = process.argv[3] || config.default_user;
    files = fs.readdirSync('./dist');
    files.map(file => fs.writeFileSync(`${config.path}/${user}/scripts/${file}`, fs.readFileSync(`./dist/${file}`)));
    console.log(`Pushed up ${files.length} file(s) to ${user}`);
    break;
  case 'clear':
    if (!config.path)
      return console.error('!!! You need to set a path before pushing');
    user = process.argv[3] || config.default_user;
    files = fs.readdirSync('./dist');
    files.map(file => fs.unlinkSync(`./dist/${file}`));
    pushedFiles = fs.readdirSync(`${config.path}/${user}/scripts`);
    pushedFiles.map(file => fs.unlinkSync(`${config.path}/${user}/scripts/${file}`));
    console.log(`Removed ${files.length} file(s) [${pushedFiles.length} pushed files]`);
    break;
  case 'build':
    exec('tsc', () => {
      console.log('built files')
      exec('node ./tools/minify.js', (_, out) => console.log(out));
    });
    break;
  default:
    console.log('available actions: push, build');
    break;
}