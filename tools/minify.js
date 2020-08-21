const { minify } = require("terser");
const fs = require("fs");

async function hackmudMinify(code) {
  const anon_code = Date.now().toString(16);
	return (await minify(code
		.replace(/function(?: \w+| )?\(/, `function script_${anon_code}(`)
		.replace(/#(?:(?:f|h|m|l|n|[0-4])?s|db|G|FMCL)/g, a => {
			return a.replace("#", `_hash_${anon_code}_`);
		})
	)).code
		.replace(`script_${anon_code}`, "")
		.replace(new RegExp(`_hash_${anon_code}_`, 'g'), a => {
			return '#';
		});
}

function toSourceFile(file) {
	return `./src/${file.split('.')[0]}.`;
}

function addAutocomplete(file, code) {
	let sourceCode;
	try {
		sourceCode = fs.readFileSync(toSourceFile(file) + 'js', { encoding: 'utf8' });
	} catch (e) {
		sourceCode = fs.readFileSync(toSourceFile(file) + 'ts', { encoding: 'utf8' });
	}
	const autocompleteRegex = /^(?:\/\/ @autocomplete (.+)|function(?: \w+| )?\([^\)]*\)\s*{\s*\/\/(.+))\n/;
	const match = sourceCode.match(autocompleteRegex);
	if (!match) return code;
	const autocomplete = (match[1] || match[2]).trim();
	return code.replace(/function\s*\([^\)]*\){/, `$& // ${autocomplete}\n`);
}

const files = fs.readdirSync('./dist')

files.map(async file => {
	const code = fs.readFileSync(`./dist/${file}`, { encoding: 'utf8' });
	const minCode = await hackmudMinify(code);
	fs.writeFileSync(`./dist/${file}`, addAutocomplete(file, minCode));
	console.log(`- ${file} [${minCode.length} chars]`)
})