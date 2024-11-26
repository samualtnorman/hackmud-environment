import { isRecord } from "./isRecord"

export const isScriptor = (value: unknown, name?: `${string}.${string}`): value is Scriptor =>
	isRecord(value) && (name ? value.name == name : typeof value.name == `string`) && typeof value.call == `function`
