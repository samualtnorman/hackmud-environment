# hackmud-environment
A workspace to build, minify, and push your scripts to specific or multiple users at once, with typings for hackmud, and support for Typescript files.

## Typings
The typings mean that if you are using a smart editor like VS Code, you will have autocompletes built in for all hackmud trust scripts (including `scripts.lib`).

This is currently work in progress, although all trust scripts have been added to the typings, not all args and returns have been typed.

## Setup
First, run `npm install`, then `npx hsm config set hackmudPath <hackmud directory>`.

If you are using an editor like VS Code, I suggest using the workspace's version of typescript to get more accurate typings.
To enable this, open a typescript file, hit `f1`, type `typescript select`, press `enter`, and select `Use Workspace Version`.

## Writings scripts
Write your scripts in the `src` directory, these scripts by default will be pushed to all your users.

If you want a script to only be pushed to a specific user, create a folder in `src` with the name of that user.
Scripts in that folder will only be pushed to that user.

If you are using TypeScript, you can give the `context` arg the `Context` type.

### Autocomplete
You can set the autocomplete string either by a comment after the function header:
```ts
function (context: Context, args) { // example:true
```

...or by adding an `@autocomplete` comment above the function closure:
```ts
// @autocomplete example: true
function (context: Context, args) {
```

## Pushing Your Scripts
Use `npm run push` to push all your scripts to all your users.

To automatically push scripts as you edit them, leave `npm run watch` running.

For pullings scripts, or pushing specific script to specific users, see [hackmud-script-manager](https://github.com/samualtnorman/hackmud-script-manager).

## Useful links
- [Scripting Reference](https://hackmud.com/forums/general_discussion/scripting_reference)
- [The Trust Scripts](https://hackmud.com/forums/new_players/the_trust_scripts___documentation_for__scripts_trust__scripts)
- [Color Reference](https://hackmud.com/forums/general_discussion/color_reference)
- [eslint-plugin-hackmud2](https://www.npmjs.com/package/eslint-plugin-hackmud2)

## Contributing
Contributing is apreciated, especially if you have an API to add to the [typings](index.d.ts).
