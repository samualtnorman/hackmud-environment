const action = process.argv[2];
const { exec } = require('child_process');
const fs = require('fs');
const { watch } = require('chokidar')
let config, user, files, pushedFiles, monitor;

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
      return console.error('!!! You need to set a path before clearing');
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
  case 'watch':
    if (!config.path)
      return console.error('!!! You need to set a path before pushing');
    user = process.argv[3] || config.default_user;
    console.log('watching for changes in src/')
    // chokidar triggers add events for each file on startup
    let ignore = fs.readdirSync('./src').length
    watch('', { depth: 0, cwd: './src', awaitWriteFinish: { stabilityThreshold: 100 } }).on("change", path => {
      function rebuild (file) {
        console.log(`-- rebuilding ${file}`);
        const distFile = (file.split('.').slice(0, -1).join('.') + '.js').split('/').pop();
        exec(`tsc --outFile dist/${distFile} ${file}`, () => {
          console.log(`--- built to ${file}`);
          exec(`node ./tools/minify.js ${distFile}`, (_, out) => {
            console.log('--' + out.trim());
            fs.writeFileSync(`${config.path}/${user}/scripts/${distFile}`, fs.readFileSync(`./dist/${distFile}`));
            console.log(`--- pushed to ${user}`)
          });
        });
      }
      console.log(`- ${path} changed`);
      rebuild(path);
    }).on("add", path => {
      if (!ignore--)
        console.log(`- ${path} created (trigger a file change to auto-build)`);
    }).on("unlink", path => {
      console.log(`- ${path} removed`)
    });
    break;
  default:
    console.log('available actions: push, build, clear, watch');
    break;
}