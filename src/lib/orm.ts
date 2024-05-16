import type { JsonValue } from "@samual/lib"
import { tryCatch } from "@samual/lib/tryCatch"
import { ArraySchema, isString } from "@samual/lib/predicates"

const isStringArray = ArraySchema(isString)

function parseDataDocument(document: MongoDocument): JsonValue | undefined {
	if (typeof document._id == `string` && typeof document.data == `string`) {
		const { data } = document

		return tryCatch(() => JSON.oparse(data) as JsonValue)
	}
}

type TableFields = Record<string, (`undefined` | `boolean` | `number` | `string`)[]>
type Table<T extends TableFields> = { namespace: string, fields: T, primaryKey: keyof T }

const Table = <T extends TableFields>(namespace: string, fields: T, primaryKey: keyof T): Table<T> =>
	({ namespace, fields, primaryKey })

const User = Table(
	`xn5ykmk61e6iajtjj54uw7rj`,
	{ username: [ `string` ], email: [ `string` ], firstName: [ `string` ], lastName: [ `string` ] },
	`username`
)

type FieldType = undefined | boolean | number | string

const getIndexesId = (namespace: string, key: string, value: FieldType): string =>
	`${namespace}.indexes.${key}.${JSON.ostringify(value)}`

function getIndexes(_id: string): string[] | undefined {
	const document = $db.f({ _id }).first()

	if (document && typeof document._id == `string` && typeof document.indexes == `string`) {
		const indexesJson = document.indexes
		const indexes = tryCatch(() => JSON.oparse(indexesJson))

		if (isStringArray(indexes))
			return indexes
	}
}

function setIndexes(namespace: string, key: string, value: FieldType): void {
	
}

export function create<T extends TableFields>(
	table: Table<T>,
	object: {
		[K in keyof T as "undefined" extends T[K][number] ? never : K]:
			("boolean" extends T[K][number] ? boolean : never) |
			("number" extends T[K][number] ? number : never) |
			("string" extends T[K][number] ? string : never)
	} & {
		[K in keyof T as "undefined" extends T[K][number] ? K : never]?:
			("boolean" extends T[K][number] ? boolean : never) |
			("number" extends T[K][number] ? number : never) |
			("string" extends T[K][number] ? string : never)
	}
): void {
	$db.i({ _id: `${table.namespace}.data.${(object as any)[table.primaryKey]}`, data: JSON.ostringify(object) })

	for (const key of Object.keys(table.fields)) {
		if (key == table.primaryKey)
			continue
		
		const indexes = getIndexes(table.namespace, key, (object as any)[key])

		if (indexes) {
			$db.u1({ _id:  })
		}
	}
}

create(User, { username: "", email: "", firstName: "", lastName: null })

