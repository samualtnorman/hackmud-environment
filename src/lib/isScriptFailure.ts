import { isRecord } from "@samual/lib/isRecord";

export const isScriptFailure = (result: unknown): result is ScriptFailure =>
	isRecord(result) && result.ok === false && (result.msg === undefined || typeof result.msg == `string`)
