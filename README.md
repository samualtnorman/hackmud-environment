# hackmud-environment
A workspace to build, minify, and push your scripts to specific or multiple users at once, with typings for hackmud, and support for Typescript files.

## Typings
The typings mean that if you are using a smart editor like VS Code, you will have autocompletes built in for all hackmud trust scripts (including `scripts.lib`).

This is currently work in progress, although all trust scripts have been added to the typings, not all args and returns have been typed.

## Setup
First, run `npm install`, then `npx hsm config set hackmudPath <hackmud directory>`.

If you are using an editor like VS Code, I suggest using the workspace's version of typescript to get more accurate typings.
To enable this, open a typescript file, hit `F1`, type `typescript select`, press `enter`, and select `Use Workspace Version`.

My last suggestion for VS Code is my extension [Hackmud Color](https://marketplace.visualstudio.com/items?itemName=Samual.hackmud-color) which colours strings to how they appear in game.

## Differences
Scripting is slightly different in this environment due to trying to comply with VS Code's Typescript checker. You will need to replace `#`s with `$`s, and scripts will need to start with `export function script(...` (as seen in the [example](src/example.ts)).

## Writings scripts
Write your scripts in the `src` directory, these scripts by default will be pushed to all your users.

If you want a script to only be pushed to a specific user, create a folder in `src` with the name of that user.
Scripts in that folder will only be pushed to that user.

If you are using TypeScript, you can give the `context` arg the `Context` type.

## Pushing Your Scripts
Use `npm run push` to push all your scripts to all your users.

To automatically push scripts as you edit them, leave `npm run watch` running.

For pullings scripts, or pushing specific script to specific users, see [hackmud-script-manager](https://github.com/samualtnorman/hackmud-script-manager).

## Useful links
- [Scripting Reference](https://hackmud.com/forums/general_discussion/scripting_reference)
- [The Trust Scripts](https://hackmud.com/forums/new_players/the_trust_scripts___documentation_for__scripts_trust__scripts)
- [Color Reference](https://hackmud.com/forums/general_discussion/color_reference)

## Contributing
Contributing is apreciated, especially if you have an API to add to the [typings](index.d.ts).

## Credit
This project and Hackmud Script Manager, were actually originally forks of [Snazzah](https://github.com/Snazzah)'s [hackmud_env](https://github.com/Snazzah/hackmud_env)
