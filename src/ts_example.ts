export function script(context: Context, args?: null | Record<string, unknown>) {
	let { caller } = context
	const l = $fs.scripts.lib()
	return { ok: false }
}
