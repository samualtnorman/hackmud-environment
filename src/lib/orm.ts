import type { JsonValue, LaxPartial } from "@samual/lib"
import { tryCatch } from "@samual/lib/tryCatch"

type Schema = Record<string, (`undefined` | `null` | `boolean` | `number` | `string`)[]>
type Table<T extends Schema> = { namespace: string, schema: T, primaryKey: keyof T }
type FieldType = undefined | null | boolean | number | string

type SchemaType<T extends Schema> = {
	[K in keyof T as "undefined" extends T[K][number] ? never : K]:
		("null" extends T[K][number] ? null : never) |
		("boolean" extends T[K][number] ? boolean : never) |
		("number" extends T[K][number] ? number : never) |
		("string" extends T[K][number] ? string : never)
} & {
	[K in keyof T as "undefined" extends T[K][number] ? K : never]?:
		("null" extends T[K][number] ? null : never) |
		("boolean" extends T[K][number] ? boolean : never) |
		("number" extends T[K][number] ? number : never) |
		("string" extends T[K][number] ? string : never)
}

const Table = <T extends Schema>(namespace: string, schema: T, primaryKey: keyof T): Table<T> =>
	({ namespace, schema, primaryKey })

const getDataDocumentId = (namespace: string, value: FieldType): string => `${namespace}.data.${JSON.ostringify(value)}`

const getIndexesDocumentId = (namespace: string, key: string, value: FieldType): string =>
	`${namespace}.indexes.${key}.${JSON.ostringify(value)}`

function parseDataDocument(document: MongoDocument): JsonValue | undefined {
	if (typeof document._id == `string` && typeof document.data == `string`) {
		const { data } = document

		return tryCatch(() => JSON.oparse(data) as JsonValue)
	}
}

function parseIndexesDocument(document: MongoDocument): string[] | undefined {
	if (typeof document._id == `string` && typeof document.indexes == `string`) {
		const indexesJson = document.indexes
		const indexes = tryCatch(() => JSON.oparse(indexesJson))

		if (Array.isArray(indexes) && indexes.every(index => typeof index == `string`))
			return indexes as any
	}
}

export function create<T extends Schema>(table: Table<T>, object: SchemaType<T>): void {
	const _id = getDataDocumentId(table.namespace, object[table.primaryKey])

	$db.i({ _id, data: JSON.ostringify(object) })

	for (const key in table.schema) {
		if (key != table.primaryKey) {
			const indexesId = getIndexesDocumentId(table.namespace, key, (object as any)[key])
			const document = $db.f({ _id: indexesId }).first()
			const indexes = document && parseIndexesDocument(document)

			if (indexes)
				$db.u1({ _id: indexesId }, { indexes: JSON.ostringify([ ...indexes, _id ]) })
			else
				$db.i({ _id: indexesId, indexes: JSON.ostringify([ _id ]) })
		}
	}
}

export function find<T extends Schema>(
	table: Table<T>,
	query: LaxPartial<SchemaType<T>>
): SchemaType<T>[] | undefined {
	const { [table.primaryKey]: primaryKeyQuery, ...omittedPrimaryQuery } = query

	if (primaryKeyQuery === undefined) {
		const indexesDocuments = $db.f({
			_id: {
				$in: Object.keys(omittedPrimaryQuery)
					.map(key => getIndexesDocumentId(table.namespace, key, (query as any)[key]))
			}
		}).array().map(parseIndexesDocument)

		if (!indexesDocuments.includes(undefined)) {
			const [ ids, ...idsArray ] = indexesDocuments as string[][]
			const filteredIds = ids.filter(_id => idsArray.every(ids => ids.includes(_id)))

			return $db.f({ _id: { $in: filteredIds } }).array().map(parseDataDocument).filter(Boolean) as any
		}
	} else {
		const _id = getDataDocumentId(table.namespace, primaryKeyQuery)
		const document = $db.f({ _id }).first()

		if (document) {
			const data = parseDataDocument(document) as any

			if (Object.entries(omittedPrimaryQuery).every(([ queryKey, queryValue ]) => data[queryKey] == queryValue))
				return data
		}
	}
}

const User = Table(
	`xn5ykmk61e6iajtjj54uw7rj`,
	{ username: [ `string` ], email: [ `string` ], firstName: [ `string` ], lastName: [ `string`, `null` ] },
	`username`
)

create(User, { username: "", email: "", firstName: "", lastName: "" })

const users = find(User, { lastName: null })

