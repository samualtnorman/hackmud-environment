# hackmud-environment
A workspace to build, minify, and push your scripts to specific or multiple users at once, fit with typings for hackmud, and support for Typescript files.

### How to use
First, run `npm install` to install dependencies.
Then run `npx hsm config set hackmudPath <hackmud directory>`.

#### Making scripts
Write your scripts in the `src` directory in TypeScript and JavaScript, these scripts by default will be pushed to all your users.

If you want a script to only be pushed to a specific user, create a folder in `src` with the name of user.
Scripts you write in that folder will only be pushed to that user.

If you are using TypeScript, you can give the `context` arg the type `HackmudContext`.

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
- [Scripting Tutorial](https://docs.google.com/document/d/1cNms-T_KSFy0F5j1xHXrUZEGd7AM49QEork3KlpGqkc/edit#)
- [colors](https://cdn.discordapp.com/attachments/240033069203980290/240183438789967873/bl-0.png)
- [eslint-plugin-hackmud2](https://www.npmjs.com/package/eslint-plugin-hackmud2)

### Contributing
Contributing is apreciated, but if you have an API to add to the typeings, you should probably pull request that into the original repo.
