const jsMinify = require("javascript-minifier");
const fs = require("fs");

async function minify(code) {
  const anon_code = Date.now().toString(16);
	return (await jsMinify.minify(
		code
			.replace("function", `function script_${anon_code}`)
			.replace(/#(?:(?:f|h|m|l|n|[0-4])?s|db|G|FMCL)/g, a => {
				return a.replace("#", `_hash_${anon_code}_`);
			})
	))
		.replace(`script_${anon_code}`, "")
		.replace(new RegExp(`_hash_${anon_code}_`, 'g'), a => {
			return '#';
		});
}

function toSourceFile(file) {
	return `./src/${file.split('.')[0]}.ts`;
}

function addAutocomplete(file, code) {
	const sourceCode = fs.readFileSync(toSourceFile(file), { encoding: 'utf8' });
	const autocompleteRegex = /^(?:\/\/ @autocomplete (.+)|function\s*\([^\)]*\)\s*{\s*\/\/(.+))\n/;
	const match = sourceCode.match(autocompleteRegex);
	if (!match) return code;
	const autocomplete = (match[1] || match[2]).trim();
	return code.replace(/function\s*\([^\)]*\){/, `$& // ${autocomplete}\n`);
}

const files = fs.readdirSync('./dist')

files.map(async file => {
	const code = fs.readFileSync(`./dist/${file}`, { encoding: 'utf8' });
	const minCode = await minify(code);
	fs.writeFileSync(`./dist/${file}`, addAutocomplete(file, minCode));
	console.log(`${file} [${minCode.length} chars]`)
})