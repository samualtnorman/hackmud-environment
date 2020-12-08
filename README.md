# hackmud-environment
![Test](https://github.com/samualtnorman/hackmud-environment/workflows/Test/badge.svg)

## Features
### Minification
This is the main feature of this project and works with JavaScript or [TypeScript](https://www.typescriptlang.org/). All scripts are automatically minified before being written into the hackmud folder. This means you can focus less on getting your character count down, and more on writing understandable scripts.

### Autocompletes/Intellisense
In modern editors like [Visual Studio Code](https://code.visualstudio.com/), as you're typing the names of subscripts or filling the args of subscripts, drop down menus of relevant autocompletes will appear. Hovering over a script also tells you info like its security level.

### TypeScript Support
Using TypeScript in this environment is completely optional, but using it means warnings when you use the wrong type in a subscript's args, or using an unsupported type in a db query.

## First Time Setup
1. Install [NodeJS](https://nodejs.org/).
2. Install the script manager by running `npm install` in a terminal in the environment folder.
3. Tell the script manager where the hackmud directory is with `npx hsm config set hackmudPath <hackmud directory>`
  - Replace `<hackmud directory>` with the path to the hackmud directory.
  - You can find your hackmud directory by running `#dir` in hackmud and going up two directories.

## Guide
### Writings scripts
You can create scripts in the `src` directory directly, and you can create a folder with name of one of your users, and create scripts in that folder too.

### Pushing Your Scripts
Use `npm run push` to push all your scripts to all your users.
To automatically push scripts as you edit them, leave `npm run watch` running.

Scripts directly in the `src` folder are pushed to all your users while scripts in folders are pushed to just the associated user.

## Useful links
- [Scripting Reference](https://hackmud.com/forums/general_discussion/scripting_reference)
- [The Trust Scripts](https://hackmud.com/forums/new_players/the_trust_scripts___documentation_for__scripts_trust__scripts)
- [Color Reference](https://hackmud.com/forums/general_discussion/color_reference)

## Optional Features
This is only for if you're using TypeScript.

### Alternative Preprocessor Format
To take advantage of the type defintions written for subscripts and preprocessor functions, you'll need to replace the `#` characters with `$` characters. For example instead of writing `#fs.scripts.trust()`, you'll need to write `$fs.scripts.trust()`. A big change, I know.

### Inter-script Type Checking
To gain type checking for your other scripts you've written in the environment, instead of starting your scripts with `function (...`, start them with `export function script(...`.

## Contributing
Contributing is apreciated, especially if you have an API to add to the [type definitions](hackmud.d.ts).

## Credit
This project was originally a fork of [Snazzah](https://github.com/Snazzah)'s [hackmud_env](https://github.com/Snazzah/hackmud_env).

## Related Projects
### Hackmud Color
If you want to see your strings coloured to how they'd appear in game, check out [Hackmud Color](https://marketplace.visualstudio.com/items?itemName=Samual.hackmud-color), my VS Code extension.
### Hackmud Script Manager
This is the script manager that this environment relies on. Visit the [NPM page](https://www.npmjs.com/package/hackmud-script-manager), or the [repo](https://github.com/samualtnorman/hackmud-script-manager).
