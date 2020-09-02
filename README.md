# hackmud-environment
A workspace to build, minify, and push your scripts to specific or multiple users at once, fit with typings for hackmud, and support for Typescript files.

### How to use
First, run `npm install`, then `npx hsm config set hackmudPath <hackmud directory>`.

If you are using an editor like VS Code, I suggest using the workspace's version of typescript to get more accurate typings.
To enable this, open a typescript file, hit `f1`, type `typescript select`, press `enter`, and select `Use Workspace Version`.

#### Making scripts
Write your scripts in the `src` directory, these scripts by default will be pushed to all your users.

If you want a script to only be pushed to a specific user, create a folder in `src` with the name of that user.
Scripts in that folder will only be pushed to that user.

If you are using TypeScript, you can give the `context` arg the `HackmudContext` type.

<!-- #### Autocomplete
You can set the autocomplete string either by a comment after the function header:
```ts
function (context: HackmudContext, args) { // example:true
```

Or by adding an `@autocomplete` comment above the function call:
```ts
// @autocomplete example:true
function (context: HackmudContext, args) {
``` -->

#### Compiling and pushing
There are a few scripts available in the `package.json`, but my suggestion is to use `npm run tsc-watch` and `npm run hsm-watch` simultaneously to automatically compile, build, and push changes you make to your users in the hackmud folder.

### Useful links
- [Scripting Reference](https://hackmud.com/forums/general_discussion/scripting_reference)
- [New Player Guides / Reference](https://hackmud.com/forums/new_players/new_player_guides___reference)
- [Advanced Reference / Guides](https://hackmud.com/forums/general_discussion/reference___guides)
- [eslint-plugin-hackmud2](https://www.npmjs.com/package/eslint-plugin-hackmud2)

### Contributing
Contributing is apreciated, but if you have an API to add to the typings, you should probably pull request that into the original repo.
