# hackmud-environment
![Test](https://github.com/samualtnorman/hackmud-environment/workflows/Test/badge.svg)

## Features
### Minification
This is the main feature of this project and works with JavaScript or TypeScript. All scripts are automatically minified before being written into the hackmud folder. This means you can focus less on getting your character count down, and more on writing understandable scripts.

### Autocompletes
As a side effect of having written up the type defintions for every trust script, your editor should be able to autocomplete as you write, even in JavaScript files.

### Intellisense
This is similar to the autocompletes feature, but as you're writing the name of a hackmud script, drop down menus of potential matches should appear. Hovering over a script should also tell you its security level.

### TypeScript Support
Using TypeScript in this environment is completely optional in this environment, but does give you benefits you're used to if you already use TypeScript.

## First Time Setup
Before you are able to push scripts into the hackmud directory, you need to install the script manager.

Open a terminal in the environment and run `npm install`.

Next you'll need to tell the script manager where your hackmud directory is.
Run `npx hsm config set hackmudPath <hackmud directory>` (replace `<hackmud directory>` with the path to the hackmud directory).

You can find your hackmud directory by running `#dir` in hackmud and going up two directories.

## Guide
### Writings scripts
Create files in the `src` directory, these scripts by default will be pushed to all your users.
If you want a script to only be pushed to a specific user, create a folder in the `src` folder with the name of that user. Then create files in this new folder.

### Pushing Your Scripts
Use `npm run push` to push all your scripts to all your users.
To automatically push scripts as you edit them, leave `npm run watch` running.

## Optional Features
This is only for if you're using TypeScript.

## Alternative Subscript Format
To take advantage of the type defintions written for subscripts, you'll need to replace the `#`s with `$`s. For example instead of writing `#fs.scripts.trust()`, you'll need to write `$fs.scripts.trust()`. A big change, I know.

### Type Checking For Your Scripts
To gain type checking for your other scripts you've written in the environment, instead of starting your scripts with `function (...`, you'll need to start them with `export function script(...`.

## Useful links
- [Scripting Reference](https://hackmud.com/forums/general_discussion/scripting_reference)
- [The Trust Scripts](https://hackmud.com/forums/new_players/the_trust_scripts___documentation_for__scripts_trust__scripts)
- [Color Reference](https://hackmud.com/forums/general_discussion/color_reference)

## Contributing
Contributing is apreciated, especially if you have an API to add to the [type definition](hackmud.d.ts).

## Credit
This project and Hackmud Script Manager, were originally forks of [Snazzah](https://github.com/Snazzah)'s [hackmud_env](https://github.com/Snazzah/hackmud_env)

## Other Projects
If you want to see your strings coloured to how they'd appear in game, you should checkout [Hackmud Color](https://marketplace.visualstudio.com/items?itemName=Samual.hackmud-color), my VS Code extension.
