// You can optionally declare the seclevel of this script
// @seclevel FULLSEC

// @autocomplete s: #s.trust.me
// This is how you declare the autocomplete of a TypeScript script (also optional)

// You can import functions from other modules
import { isRecord } from "/lib/isRecord"
import { isScriptor } from "/lib/isScriptor"

// Code is allowed to live outside the main function
const DEFAULT_MESSAGE = `\
This script checks if arg s is a scriptor
e\`S.\`g.\n${_FULL_SCRIPT_NAME} { s: #s.trust.me }
	Should return true
e\`S.\`g.\n${_FULL_SCRIPT_NAME} { s: "trust.me" }
	Should return false`

// This is a pretty standard signature for a hackmud script
export default (context: Context, args?: unknown) => {
	// We check if `args` is an object and if it is, it will be treated like a `Record<string, unknown>`
	if (isRecord(args)) {
		if (isScriptor(args.s))
			return `You gave a scriptor and it returned ${args.s.call()}`

		return "That is not a scriptor"
	}

	// Otherwise we print our default message declared above
	return DEFAULT_MESSAGE
}
