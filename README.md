# Hackmud Scripting Environment
This is for the game [hackmud](https://hackmud.com/). If you don't know what that is, you should go away and play it!

This is the whole kitchen sink built around HSM, setting this up takes more effort but will give you autocompletes in your IDE, automatic script pushing when you save a script, as well as minification. If you only need minification, I instead recommend heading over to [Hackmud Script Manager](https://github.com/samualtnorman/hackmud-script-manager#readme).

Join [our Discord server](https://discord.gg/RSa4Sc6pNA)!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/R6R0XN5CX)

## Features
### Minification
This is the main feature of this project and works with JavaScript or [TypeScript](https://www.typescriptlang.org/). All
scripts are automatically minified before being written into the hackmud folder. This means you can focus less on
getting your character count down, and more on writing readable scripts.

### Autocompletes/Intellisense
In modern editors like [Visual Studio Code](https://code.visualstudio.com/), as you're typing the names of subscripts or
filling the args of subscripts, drop-down menus of relevant autocompletes will appear. Hovering over a script also tells
you info like its security level.

### TypeScript Support
Using TypeScript in this environment is completely optional, but using it means warnings when you use the wrong type in
a subscript's args or use an unsupported type in a DB query.

## First Time Setup
1. Install [Node.JS](https://nodejs.org/en/download) and [PNPM](https://pnpm.io/installation)
2. Download this template:
   - If you have [Git installed](https://git-scm.com/downloads), make a new folder, `cd` to it, and run `pnpm dlx tiged samualtnorman/hackmud-environment`
   - Otherwise, [click here to download the ZIP](https://github.com/samualtnorman/hackmud-environment/archive/refs/heads/main.zip) and extract it somewhere, then `cd` to it
4. Run `pnpm install`

Once you have everything setup, you just need to open the folder in your editor of choice.

> [!IMPORTANT]
> Do not put this template in your hackmud folder. This will not work.<br>Instead put this template somewhere you have easy access to like your desktop or home folder.

> [!NOTE]
> If you get an error message that looks like this:
> ```
> [...]\AppData\Local\pnpm\hsm.ps1 cannot be loaded because running scripts is disabled on this system. [...]
> ```
> You will need to run `Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser` in PowerShell as an administrator. For more information, see [Microsoft's page about Execution Policies](https://learn.microsoft.com/en-gb/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.4).

## Guide
### Writing scripts
You can create scripts in the `src/scripts` directory directly, and you can create a folder with the name of one of your users,
and create scripts in that folder too.

#### Alternative Preprocessor Format
To get autocompletes, you'll need to replace the `#` characters with `$` characters. For example instead of writing `#fs.scripts.trust()`, you'll need to write
`$fs.scripts.trust()`.

#### Inter-script Type Checking
To get autocompletes for the other scripts you've written in the environment, instead of starting your scripts with
`function (...`, start them with `export default function(...`.

> [!NOTE]
> When using this format, to get autocompletes working in hackmud, you must have a `// @autocomplete foo: "bar"` comment at the top above all other code.

### Pushing Your Scripts
Use `pnpm push` to push all your scripts to all your users.
To automatically push scripts as you edit them, leave `pnpm dev` running.

Scripts directly in the `src/scripts` folder are pushed to all your users.
To have a script be pushed to only a specific user, create a folder in the `src/scripts` folder and create your scripts in that
new folder.

Once a script has been pushed to a user, you can run `#up <script>` in game to upload it.

## Useful links
- [Scripting Reference](https://hackmud.com/forums/general_discussion/scripting_reference)
- [The Trust Scripts](https://wiki.hackmud.com/scripting/trust_scripts)
- [Color Reference](https://wiki.hackmud.com/scripting/syntax/colors)

## Contributing
Contributing is appreciated, especially if you have an API to add to the [type definitions](https://github.com/samualtnorman/hackmud-script-manager/blob/main/env.d.ts).

## Credit
This project was originally a fork of [Snazzah](https://github.com/Snazzah)'s
[hackmud_env](https://github.com/Snazzah/hackmud_env). Please also check out the [list of people who contributed to HSM](https://github.com/samualtnorman/hackmud-script-manager/graphs/contributors).

## Related Projects
### Hackmud Color
If you want to see your strings coloured to how they'd appear in the game, check out
[Hackmud Color](https://marketplace.visualstudio.com/items?itemName=Samual.hackmud-color), my VS Code extension.

### Hackmud Script Manager
This is the script manager that this environment relies on. Visit the
[NPM page](https://www.npmjs.com/package/hackmud-script-manager), or the
[repo](https://github.com/samualtnorman/hackmud-script-manager).
