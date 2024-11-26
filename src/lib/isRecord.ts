/** Check if the value is an object and if so assign it the type `Record<string, unknown>` */
export const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value == `object`
