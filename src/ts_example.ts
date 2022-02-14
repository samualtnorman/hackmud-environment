export default (context: Context, args?: unknown) => {
	let { caller } = context
	const l = $fs.scripts.lib()
	return { ok: false }
}
