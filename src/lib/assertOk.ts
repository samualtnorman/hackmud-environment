import { isScriptFailure } from "./isScriptFailure"
import { assert } from "@samual/lib/assert"

export function assertOk<T>(
	result: T | ScriptFailure,
	message = "Got script failure in assertion"
): asserts result is T {
	assert(!isScriptFailure(result), message)
}

export function ensureOk<T>(result: T | ScriptFailure, message = "Got script failure in assertion"): T {
	assertOk(result, message)

	return result
}
