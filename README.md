# hackmud_env
A workspace to build and minify your scripts.

### How to use
First, run `yarn` to install dependencies and install TypeScript (`npm install -g typescript`)

#### Making scripts
You can make scripts in `src/` in either TypeScript or JavaScript and make scripts as you reqularly would without the worry of variable name length.

#### Autocomplete
You can set the autocomplete string either by a comment after the function header:
```js
function (context, args) { // example:true
```
Or by adding an `@autocomplete` comment above the function call.
```js
// @autocomplete example:true
function (context, args) {
```

#### hackmud.json
When doing any CLI commands, a hackmud.json file will be created. In order for pushing to work, you must set the `path` key to the hackmud folder (not a scripts folder) and set the `default_user` to the user you want the scripts for.

#### Compiling and pushing
To compile, you can run `yarn build` to build `src/` files to `dist/`. To push, you can run `yarn push`.  \
To do both of these in one go, run `yarn fastpush`

### Useful links
- [hackmud docs](https://docs.google.com/document/d/1cNms-T_KSFy0F5j1xHXrUZEGd7AM49QEork3KlpGqkc/edit#)
- [colors](https://hackmud.fandom.com/wiki/Colors)
- [eslint-plugin-hackmud2](https://www.npmjs.com/package/eslint-plugin-hackmud2)

### Cool Macros

```
/hl = kernel.hardline
/dc = kernel.hardline {dc:true}
/c = chats.send {{ channel:"{0}", msg:{1} }}
/t = chats.tell {{ to:"{0}", msg:{1} }}
```

### Contributing

Contributing to the repo is appreciated, especially if you have an API and want to make a definition in the typings.