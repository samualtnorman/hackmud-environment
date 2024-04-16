type Replace<T, R> =
	Omit<
		T,
		Extract<keyof R, keyof T>
	> & R

type ScriptSuccess<T = object> = { ok: true } & T

type ScriptFailure = {
	ok: false
	msg?: string
}

type ScriptResponse<T = object> = ScriptSuccess<T> | ScriptFailure
type ErrorScripts = Record<string, () => ScriptFailure>

type Subscripts =
	Record<
		string,
		Record<string, (...args: any) => any>
	> & {
		accts: ErrorScripts
		autos: ErrorScripts
		bbs: ErrorScripts
		chats: ErrorScripts
		corps: ErrorScripts
		escrow: ErrorScripts
		gui: ErrorScripts
		kernel: ErrorScripts
		market: ErrorScripts
		scripts: ErrorScripts
		sys: ErrorScripts
		trust: ErrorScripts
		users: ErrorScripts
	}

interface PlayerFullsec {}

interface PlayerHighsec {}

interface PlayerMidsec {}

interface PlayerLowsec {}

interface PlayerNullsec {}

type UpgradeCore = {
	name: string
	type: "lock" | "script_space" | "chat" | "script" | "tool" | "bot_brain" | "glam"
	up_class?: -1 | 0 | 1 | 2 | 3
	tier: 1 | 2 | 3 | 4
	rarity: 0 | 1 | 2 | 3 | 4 | 5
	i: number
	loaded: boolean
	sn: string
	description: string
}

type Upgrade = UpgradeCore & Record<string, null | boolean | number | string>

type CLIUpgrade = Omit<UpgradeCore, `rarity`> & {
	[x: string]: null | boolean | number | string
	rarity: "`0noob`" | "`1kiddie`" | "`2h4x0r`" | "`3h4rdc0r3`" | "`4|_|b3|2`" | "`531337`"
}

type UsersTopItem<R> = {
	rank: R
	name: string
	last_activity: string
	balance: string
}

type CorpsTopItem<R> = {
	rank: R
	name: string
	worth: string
}

type CorpsTop = [
	CorpsTopItem<1>,
	CorpsTopItem<2>,
	CorpsTopItem<3>,
	CorpsTopItem<4>,
	CorpsTopItem<5>,
	CorpsTopItem<6>,
	CorpsTopItem<7>,
	CorpsTopItem<8>,
	CorpsTopItem<9>,
	CorpsTopItem<10>
]

type Fullsec = Subscripts & PlayerFullsec & {
	accts: {
		/**
		 * **FULLSEC**
		 *
		 * @returns GC balance of script owner
		 */
		balance_of_owner: () => number

		/**
		 * **FULLSEC**
		 */
		xfer_gc_to_caller: (args: {
			amount: number | string
			memo?: string | undefined
		}) => ScriptResponse
	}

	bbs: {
		read: () => {
			boards: {
				title: string
				slug: string
			}[]

			posts: {
				vote_count: number
				short_id: string
				is_sticky: boolean
				is_locked: boolean
				is_archived: boolean
				is_answered: boolean
				is_implemented: boolean
				title: string
				slug: string
				vote: boolean
				username: string
				time: string
			}[]
		}

		r: Fullsec["bbs"]["read"]
	}

	chats: {
		/**
		 * **FULLSEC**
		 *
		 * @summary Create a new chat channel
		 *
		 * @description This script lets you create a new chat channel.
		 * You cannot create a channel that already exists (including any of the default ports from `0000` to `FFFF`).
		 * If you do not supply a password, anyone can join your channel (but the channel name is not displayed anywhere, so they would have to discover it in some way first).
		 */
		create: ((args: {
			/**
			 * The name of the channel to create
			 */
			name: string

			/**
			 * The password to secure the channel with
			 */
			password?: string
		}) => ScriptResponse) & ((args: {
			/**
			 * The name of the channel to create
			 */
			c: string

			/**
			 * The password to secure the channel with
			 */
			password?: string
		}) => ScriptResponse)

		/**
		 * **FULLSEC**
		 *
		 * @summary Send a chat message to a channel
		 *
		 * @description This script lets you send a message to the specified channel.
		 * You must have joined the channel, and you will see your own message (unlike chats.tell).
		 */
		send: (args: {
			/**
			 * The channel to send the message to.
			 */
			channel: string

			/**
			 * The message to send
			 */
			msg: string
		}) => ScriptResponse

		/**
		 * **FULLSEC**
		 *
		 * @summary Send a chat message to a specific user
		 *
		 * @description This script lets you send a message to the specified user directly.
		 * You can message any user, you only need their username.
		 * Note that you will not be able to see your message after it is sent (though many chat scripts based on chats.tell also send the message to you to work around this limitation).
		 */
		tell: (args: {
			/**
			 * The username to send the message to
			 */
			to: string

			/**
			 * The message to send
			 */
			msg: string
		}) => ScriptResponse
	}

	escrow: {
		/**
		 * **FULLSEC**
		 */
		charge: (args: {
			cost: number | string
			is_unlim?: boolean
		}) => null | ScriptFailure

		confirm: never
	}

	gui: {
		chats: never
		quiet: never
		size: never
		vfx: never
		vol: never
	}

	market: {
		/**
		 * **FULLSEC**
		 */
		browse: ((args: {
			seller: string
			listed_before: number
			listed_after: number
			cost: number | string
		} & CLIUpgrade) => {
			i: string
			name: string
			rarity: Upgrade["rarity"]
			cost: number
		}[] | ScriptFailure) & (<I extends string>(args: { i: I }) => {
			i: I
			seller: string
			cost: number
			count: number
			description: string
			upgrade: Upgrade
			no_notify: boolean
		} | ScriptFailure) & (<I extends string[]>(args: { i: I }) => {
			i: I
			seller: string
			cost: number
			count: number
			description: string
			upgrade: Upgrade
			no_notify: boolean
		}[] | ScriptFailure)
	}

	scripts: {
		/**
		 * **FULLSEC**
		 */
		fullsec: ((args?: object) => string[]) & ((args: { sector: string }) => string[] | ScriptFailure)

		/**
		 * **FULLSEC**
		 */
		get_access_level: (args: { name: string }) => {
			public: boolean
			hidden: boolean
			trust: boolean
		} | ScriptFailure

		/**
		 * **FULLSEC**
		 */
		get_level: (args: { name: string }) => 0 | 1 | 2 | 3 | 4 | ScriptFailure

		/**
		 * **FULLSEC**
		 */
		highsec: ((args?: object) => string[]) & ((args: { sector: string }) => string[] | ScriptFailure)

		/**
		 * **FULLSEC**
		 */
		lowsec: ((args?: object) => string[]) & ((args: { sector: string }) => string[] | ScriptFailure)

		/**
		 * **FULLSEC**
		 */
		midsec: ((args?: object) => string[]) & ((args: { sector: string }) => string[] | ScriptFailure)

		/**
		 * **FULLSEC**
		 */
		nullsec: ((args?: object) => string[]) & ((args: { sector: string }) => string[] | ScriptFailure)

		/**
		 * **FULLSEC**
		 */
		trust: () => string[]

		/**
		 * FULLSEC
		 *
		 * @returns a code library containing useful helper functions you can use in your scripts.
		 */
		lib: () => {
			ok: () => ScriptSuccess

			not_impl: () => {
				ok: false
				msg: "Not Implemented."
			}
			/**
			 * Append `message` to the current script run's log.
			 */
			log: (message: any) => void
			/**
			 * @returns all messages added using `scripts.lib().log` during this script run
			 */
			get_log: () => string[]
			/**
			 * @returns a random integer in the range [min, max) generated using `rng` (defaults to `Math.random`)
			 */
			rand_int: (min: number, max: number, rng?:()=>number) => number
			/**
			 * @returns the value of `value`, bounded by the range [`floor`, `ceil`]
			 */
			clamp: (value: number, floor: number, ceil: number) => number
			/**
			 * Linear interpolation function.
			 * @returns a number <`amount*100`>% of the way from `start` to `stop`
			 */
			lerp: (amount: number, start: number, stop: number) => number
			/**
			 * @returns a random element from `array`, selected with a random number generated using `rng` (defaults to `Math.random`)
			 */
			sample: (array: any[], rng?: ()=>number) => any
			/**
			 * @returns whether two MongoDB ObjectIds are equivalent
			 */
			are_ids_eq: (id1: any, id2: any) => boolean
			/**
			 * Convert a MongoDB ObjectId to a string
			 */
			id_to_str: (id: string | {$oid: string}) => any
			/**
			 * @returns whether `value` is a boolean primitive
			 */
			is_bool: (value: any) => value is boolean
			/**
			 * @returns whether `value` is an object or `null`
			 */
			is_obj: (value: any) => value is Record<string, unknown> | null
			/**
			 * @returns whether `value` is a string
			 */
			is_str: (value: any) => value is string
			/**
			 * @returns whether `value` is a number
			 */
			is_num: (value: any) => value is number
			/**
			 * @returns whether `value` is an integer
			 */
			is_int: (value: any) => value is number
			/**
			 * @returns whether `value` is a negative number
			 */
			is_neg: (value: any) => value is number
			/**
			 * @returns whether `value` is an array
			 */
			is_arr: (value: any) => value is unknown[]
			/**
			 * @returns whether `value` is a function
			 */
			is_func: (value: any) => value is (...args: any[]) => unknown
			/**
			 * @returns whether `value` is not `undefined`
			 */
			is_def: (value: any) => boolean
			/**
			 * @returns whether `name` is a valid in-game username
			 */
			is_valid_name: (name: string) => boolean
			/**
			 * @returns the string representation of `value`
			 */
			dump: (value: { toString: () => string }) => string
			/**
			 * @returns a deep clone of `object`
			 */
			clone: <T extends object>(object: T) => T
			/**
			 * Applies all key-value pairs from `obj2` to `obj1`, overwriting if necessary.
			 */
			merge: <F extends object, S extends object>(obj1: F, obj2: S) => F & S
			/**
			 * @returns an array of `object`'s values
			 */
			get_values: (object: object) => any[]
			/**
			 * @returns a numeric hash of `string`
			 */
			hash_code: (string: string) => number
			/**
			 * @returns a numeric hash of `string`
			 */
			xmur3: (string: string) => number
			/**
			 * @returns function that generates random floats in the range [0,1] based on the numerical seeds
			 */
			sfc32: (seed1: number, seed2: number, seed3: number, seed4: number) => () => number
			/**
			 * @returns function that generates random floats in the range [0,1] based on the numerical seed
			 */
			mulberry32: (seed: number) => () => number
			/**
			 * @returns function that generates random floats in the range [0,1] based on the numerical seeds
			 */
			xoshiro128ss: (seed1: number, seed2: number, seed3: number, seed4: number) => () => number
			/**
			 * @returns function that generates random floats in the range [0,1] based on the numerical seed
			 */
			JSF: (seed: number) => () => number
			/**
			 * @returns function that generates random floats in the range [0,1] based on the numerical seed
			 */
			LCG: (seed: number) => () => number
			/**
			 * Converts a number to a GC string of the form `"1M5K20GC"`.
			 */
			to_gc_str: (number: number) => string
			/**
			 * Converts a string similar to `"1M5K20GC"` to an equivalent numerical representation.
			 */
			to_gc_num: (string: string) => number | ScriptFailure
			/**
			 * @returns a string of the form YYMMDD.HHMM derived from `date`
			 */
			to_game_timestr: (date: Date) => string
			corruption_chars: "¡¢Á¤Ã¦§¨©ª"
			/**
			 * A list of unique color codes to be used with hackmud's color formatting syntax.
			 * Does not include numeric codes, which are duplicates of some alphabetic codes.
			 */
			colors: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
			/**
			 * Used by `scripts.lib().corrupt` to determine the frequency of corruption.
			 */
			corruptions: [ 0, 1, 1.5, 2.5, 5 ]
			/**
			 * Adds colored corruption characters to `text`, with frequency determined by `amount`.
			 */
			corrupt: (text: string | string[], amount: 0 | 1 | 2 | 3 | 4) => string
			/**
			 * @returns the first <`length`> characters of `string`, or the original string if it is shorter than `length`
			 */
			cap_str_len: (string: string, length: number) => string
			/**
			 * Applies `func` to each element in `array` and returns the original array.
			 */
			each: <T>(array: T[], func: (index: number, value: T) => void) => T[]
			/**
			 * @returns a new array containing the elments of `array` for which `func` returns `true`
			 */
			select: <T>(array: T[], func: (index: number, value: T) => boolean) => T[]
			/**
			 * @returns the number of elements in `array` for which `func` returns `true`
			 */
			count: <T>(array: T[], func: (index: number, value: T) => boolean) => number
			/**
			 * @returns the first element in `array` for which `func` returns `true`
			 */
			select_one: <T>(array: T[], func: (index: number, value: T) => boolean) => T
			/**
			 * @returns a new array composed of the result of applying `func` to each element of the original array in order
			 */
			map: <T, U>(array: T[], func: (index: number, value: T) => U) => U[]
			/**
			 * @returns a new object derived from `obj` with only the keys specified in `keys`
			 */
			pick: (obj: object, keys: string[]) => any
			/**
			 * @returns an array with the elements from `array` in a random order
			 */
			shuffle: <T>(array: T[]) => T[]
			/**
			 * Comparison function for sorting arbitrary values in ascending order using builtin comparison operators.
			 */
			sort_asc: (one: any, two: any) => 1 | -1 | 0
			/**
			 * Comparison function for sorting arbitrary values in descending order using builtin comparison operators.
			 */
			sort_desc: (one: any, two: any) => 1 | -1 | 0
			/**
			 * Comparison function for sorting numbers in ascending order.
			 */
			num_sort_asc: (one: number, two: number) => 1 | -1 | 0
			/**
			 * Comparison function for sorting numbers in descending order.
			 */
			num_sort_desc: (one: number, two: number) => 1 | -1 | 0
			/**
			 * @returns the value and the index of the largest number in `array` as `[maxVal, maxIdx]`
			 */
			max_val_index: (array: number[]) => number[]
			/**
			 * @returns a new `Date` equivalent to `date.getTime() + add_ms`
			 */
			add_time: (date: Date, add_ms: number) => Date
			/**
			 * String representations of the in-game seclevels.
			 */
			security_level_names: [ "NULLSEC", "LOWSEC", "MIDSEC", "HIGHSEC", "FULLSEC" ]
			/**
			 * @returns the string name of a numeric security level
			 */
			get_security_level_name: (security_level: number) => any
			/**
			 * @param result the return value of a call to `#db.i` or `#db.r`
			 * @param nModified the expected value of `result.nModified`
			 * @returns whether the database operation failed
			 */
			dbu_result_failed: (result: ReturnType<typeof $db.u | typeof $db.u1 | typeof $db.us>, nModified?: number) => boolean
			/**
			 * @param result the return value of a call to `#db.i` or `#db.r`
			 * @param n the expected value of `result.n`
			 * @returns whether the database operation failed
			 */
			dbir_result_failed: (result: ReturnType<typeof $db.i | typeof $db.r>, n?: number) => boolean
			/**
			 * @returns a random string of length `length` on the alphabet [a-z0-9]
			 */
			create_rand_string: (length: number) => string
			/**
			 * @returns the user half `x` of a fully-qualified script name `x.y`
			 */
			get_user_from_script: (script_name: string) => string
			/**
			 * @returns the script half `y` of a fully-qualified script name `x.y`
			 */
			get_scriptname_from_script: (name: string) => string
			/**
			 * Determines whether to treat this run as a subscript, based either on the presence of `calling_script` in `context`,
			 * or the explicit passing of `is_script:true` in `args`.
			 */
			is_script: (context: Context, args: any) => boolean
			/**
			 * @returns whether the script is being called by its owner
			 */
			caller_is_owner: (context: Context) => boolean
			/**
			 * Removes consecutive duplicate elements from an array.
			 * @example
			 * ```js
			 * const arr = [1, 2, 2, 3, 2]
			 * return #fs.scripts.lib().uniq(arr)
			 * // [1, 2, 3, 2]
			 * ```
			 */
			uniq: (array: T[]) => T[]
			/**
			 * Sorts an array of numbers or number-coercible strings in descending order.
			 */
			u_sort_num_arr_desc: <T>(array: T[]) => T[]
			/**
			 * BUGGED: Creates a new string of length `length` by repeating `pad_char`.
			 */
			ljust: (input: string, length: number, pad_char?: string) => string
			/**
			 * Add characters from `pad_char` to the left of `input` until it reaches length `length`.
			 */
			rjust: (input: string, length: number, pad_char?: string) => string
			/**
			 * @returns a string with the entries from `strings` split into evenly spaced columns,
			 * organized donward and then rightward, to fit the current user's terminal
			 */
			columnize: (strings: string[]) => string
			/**
			 * Takes two newline-separated strings and formats a new string where they appear in columns, separated by `space`.
			 * @example
			 * ```js
			 * const str1 = "one\ntwo\nthree"
			 * const str2 = "four\nfive\nsix"
			 * return $fs.scripts.lib().side_by_side(str1, str2, "|")
			 * // one|four\n
			 * // two|five\n
			 * // three|six
			 * ```
			 */
			side_by_side: (str1: string, str2: string, space?:string) => string
			/**
			 * @returns whether enough time remains in the script execution window to satisfy `time_left`
			 */
			can_continue_execution: (time_left: number) => boolean
			/**
			 * @returns a human-readable error object when not enough time remains in the script execution window to satisfy `time_left`
			 */
			can_continue_execution_error: (time_left: number, name?:string) => {ok:false, msg: string}
			date: typeof Date
			/**
			 * @returns current date, equivalent to `new Date()`
			 */
			get_date: () => Date
			/**
			 * @returns time since the epoch, equivalent to `Date.now()`
			 */
			get_date_utcsecs: () => number
			/**
			 * The amount of milliseconds in a single day.
			 */
			one_day_ms: 86_400_000
			is_not_today: (date: Date) => boolean
			/**
			 * @returns the number of days that have passed between `d2` and `d1`
			 */
			utc_day_diff: (d1: Date, d2: Date) => number
			/**
			 * @returns the number of days elapsed since `date` as a string, e.g. "<n> days"
			 */
			utc_days_ago_str: (date: Date) => string
			math: typeof Math
			array: typeof Array
			parse_int: typeof parseInt
			parse_float: typeof parseFloat
			json: typeof JSON
			number: typeof Number
			object: typeof Object
		}

		/**
		 * **FULLSEC**
		 */
		quine: () => string
	}

	sys: {
		init: never

		/**
		 * **FULLSEC**
		 */
		upgrades_of_owner: (<
			F extends Partial<Upgrade & { loaded: boolean }> = object
		>(args?: { filter?: F, full?: false }) => (
			Omit<
				Pick<UpgradeCore, "tier" | "rarity" | "name" | "type" | "i" | "loaded">,
				keyof F
			> & Pick<F, "tier" | "rarity" | "name" | "type" | "i" | "loaded">
		)[] | ScriptFailure) & (<
			F extends Partial<Upgrade & { loaded: boolean }> = object
		>(args: { filter?: F, full: true }) => (
			Omit<UpgradeCore, keyof F> & F & Record<string, null | boolean | number | string>
		)[] | ScriptFailure) & (<I extends number>(args: { i: I }) => (
			Omit<UpgradeCore, "i"> & { [x: string]: null | boolean | number | string, i: I }
		) | ScriptFailure)

		/**
		 * **FULLSEC**
		 */
		xfer_upgrade_to_caller: ((args: {
			i: number | number[]
			memo?: string
		}) => ScriptResponse) & ((args: {
			sn: string | string[]
			memo?: string
		}) => ScriptResponse)
	}

	users: {
		/**
		 * **FULLSEC**
		 */
		active: () => number

		/**
		 * **FULLSEC**
		 */
		last_action: (args: { name: string | string[] }) => ({
			n: string
			t?: Date
		} | null)[]

		/**
		 * **FULLSEC**
		 */
		top: () => [
			UsersTopItem<1>,
			UsersTopItem<2>,
			UsersTopItem<3>,
			UsersTopItem<4>,
			UsersTopItem<5>,
			UsersTopItem<6>,
			UsersTopItem<7>,
			UsersTopItem<8>,
			UsersTopItem<9>,
			UsersTopItem<10>
		]
	}
}

type Highsec = Fullsec & PlayerHighsec & {
	accts: {
		/**
		 * **HIGHSEC**
		 *
		 * @returns GC balance as number if `is_script` is true (default)
		 * @returns GC balance as string if `is_script` is false
		 */
		balance: ((args?: { is_script?: true }) => number) & ((args: { is_script: false }) => string)

		/**
		 * **HIGHSEC**
		 *
		 * @returns transaction history according to filter
		 * @returns if `is_script` is true (default), time property as Date object
		 * @returns wraps transactions in object with msg, time property as string (game date format e.g. 201028.2147) if `is_script` is false
		 */
		transactions: ((args?: {
			count?: number | "all"
			to?: string
			from?: string
			script?: string
			is_script?: true
		}) => {
			time: Date
			amount: number
			sender: string
			recipient: string
			script: string | null
			memo?: string
		}[]) & ((args: {
			count?: number | "all"
			to?: string
			from?: string
			script?: string
			is_script: false
		}) => {
			msg: string
			transactions: {
				time: string
				amount: string
				sender: string
				recipient: string
				script: string | null
				memo?: string
			}[]
		})
	}

	scripts: {
		/**
		 * **HIGHSEC**
		 */
		sys: () => string | string[]
	}

	sys: {
		/**
		 * **HIGHSEC**
		 */
		specs: () => string | ScriptFailure

		/**
		 * **HIGHSEC**
		 */
		status: () => {
			hardline: number
			tutorial: string
			breach: boolean
		}

		/**
		 * **HIGHSEC**
		 */
		upgrade_log: ((args?: {
			is_script?: true
			user?: string
			run_id?: string
			count?: number
			start?: number
		}) => {
			t: Date
			u: string
			r: string
			msg: string
		}[] | ScriptFailure) & ((args: {
			is_script: false
			user?: string
			run_id?: string
			count?: number
			start?: number
		}) => string[] | ScriptFailure)

		/**
		 * **HIGHSEC**
		 */
		upgrades: (<I extends number>(args: { i: I }) => (
			Omit<UpgradeCore, "i"> & { [x: string]: null | boolean | number | string, i: I }
		) | ScriptFailure) & (<
			F extends Partial<Upgrade & { loaded: boolean }> = object
		>(args?: {
			filter?: F
			is_script?: true
			full?: false
		}) => (
			Omit<
				Pick<UpgradeCore, "tier" | "rarity" | "name" | "type" | "i" | "loaded">,
				keyof F
			> & F & Record<string, null | boolean | number | string>
		)[] | ScriptFailure) & (<
			F extends Partial<Upgrade & { loaded: boolean }> = object
		>(args?: {
			filter?: F
			is_script?: true
			full: true
		}) => (
			Omit<UpgradeCore, keyof F> & F & Record<string, null | boolean | number | string>
		)[] | ScriptFailure) & ((args?: {
			filter?: Partial<Upgrade & { loaded: boolean }>
			is_script: false
			full?: false
		}) => {
			msg: string
			upgrades: string[]
		} | ScriptFailure) & (<
			F extends Partial<Upgrade & { loaded: boolean }> = object
		>(args?: {
			filter?: F
			is_script: false
			full: true
		}) => (
			Omit<UpgradeCore, keyof F | `rarity`> & F & {
				[x: string]: null | boolean | number | string
				rarity: "`0noob`" | "`1kiddie`" | "`2h4x0r`" | "`3h4rdc0r3`" | "`4|_|b3|2`" | "`531337`"
			}
		)[] | ScriptFailure)
	}

	users: {
		/**
		 * **HIGHSEC**
		 */
		inspect: ((args: {
			name: "trust"
			is_script?: boolean
		}) => number) & ((args: {
			name: "risk"
			is_script?: boolean
		}) => string) & ((args: {
			name: string
			is_script?: true
		}) => {
			username: string
			avatar: string
			pronouns: string
			user_age?: Date
			bio?: string
			title?: string
			is_main: boolean
			alt_of?: string
			badges?: string[]
		} | ScriptFailure) & ((args: {
			name: string
			is_script: false
		}) => string | ScriptFailure)
	}
}

type Midsec = Highsec & PlayerMidsec & {
	accts: {
		/**
		 * **MIDSEC**
		 */
		xfer_gc_to: (args: {
			to: string
			amount: number | string
			memo?: string
		}) => ScriptResponse
	}

	autos: {
		/**
		 * **MIDSEC**
		 */
		reset: () => ScriptSuccess
	}

	chats: {
		/**
		 * **MIDSEC**
		 */
		channels: () => string[]

		/**
		 * **MIDSEC**
		 */
		join: (args: {
			channel: string
			password?: string
		}) => ScriptResponse

		/**
		 * **MIDSEC**
		 */
		leave: (args: { channel: string }) => ScriptResponse

		/**
		 * **MIDSEC**
		 */
		users: (args: { channel: string }) => string[] | ScriptFailure
	}

	escrow: {
		/**
		 * **MIDSEC**
		 */
		stats: () => {
			scripts: string[]
			total: string
			outstanding: string
			open_escrow_count: number
		} | ScriptFailure
	}

	market: {
		/**
		 * **MIDSEC**
		 */
		buy: (args: {
			i: string
			count: number
			confirm: true
		}) => ScriptResponse

		/**
		 * **MIDSEC**
		 */
		stats: () => ScriptFailure | {
			total: string
			outstanding: string
			listed: number
			sold: number
		}
	}

	scripts: {
		/**
		 * **MIDSEC**
		 */
		user: () => string[]
	}

	sys: {
		/**
		 * **MIDSEC**
		 */
		manage: ((args: {
			unload?: number | number[]
			load?: number | number[]
		}) => ScriptResponse) & ((args: { reorder?: ([ number, number ] | {
			from: number
			to: number
		})[] | {
			from: number
			to: number
		} }) => string[] | ScriptFailure)
	}
}

type Lowsec = Midsec & PlayerLowsec & {
	kernel: {
		/**
		 * **LOWSEC**
		 */
		hardline: () => ScriptResponse
	}

	market: {
		/**
		 * **LOWSEC**
		 */
		sell: (args: {
			i: number
			cost: number | string
			description?: string
			count?: number
			no_notify?: boolean
			confirm: true
		}) => ScriptResponse<{ token: string }>
	}

	sys: {
		/**
		 * **LOWSEC**
		 */
		access_log: ((args?: {
			user?: string
			run_id?: string
			is_script?: true
			count?: number
			start?: number
		}) => {
			t: Date
			u: string | undefined
			r: string | undefined
			msg: string
		}[] | ScriptFailure) & ((args: {
			user?: string
			run_id?: string
			is_script: false
			count?: number
			start?: number
		}) => string[])

		/**
		 * **LOWSEC**
		 */
		cull: (args: { i: number | number[], confirm: true }) => ScriptResponse

		/**
		 * **LOWSEC**
		 */
		loc: () => string | ScriptFailure

		/**
		 * **LOWSEC**
		 */
		xfer_upgrade_to: ((args: {
			i: number | number[]
			to: string
			memo?: string
		}) => ScriptResponse) & ((args: {
			sn: string | string[]
			to: string
			memo?: string
		}) => ScriptResponse)
	}
}

type Nullsec = Lowsec & PlayerNullsec & {
	corps: {
		/**
		 * **NULLSEC**
		 */
		create: (args: {
			name: string
			confirm: true
		}) => ScriptResponse

		/**
		 * **NULLSEC**
		 */
		hire: (args: { name: string }) => ScriptResponse

		/**
		 * **NULLSEC**
		 */
		manage: ((args: { command: "list" }) => {
			name: string
			is_admin: boolean
		}[] | ScriptFailure) & ((args: {
			command: "demote" | "promote"
			name: string
		} | {
			command: "fire"
			name: string
			confirm: true
		}) => ScriptResponse)

		/**
		 * **NULLSEC**
		 */
		offers: (() => {
			offers: string[]
			msg: string
		} | ScriptSuccess<{
			msg: string
			current_corp: string | null
		}>) & ((args: { accept: string }) => ScriptResponse)

		/**
		 * **NULLSEC**
		 */
		quit: (args: { confirm: true }) => ScriptResponse

		/**
		 * **NULLSEC**
		 */
		top: () => CorpsTop | {
			top: CorpsTop
			active: {
				name: string
				worth: string
			}
		}
	}

	sys: {
		/**
		 * **NULLSEC**
		 */
		breach: (args: { confirm: true }) => ScriptResponse
	}

	trust: {
		/**
		 * **NULLSEC**
		 */
		me: () => string
	}

	users: {
		/**
		 * **NULLSEC**
		 */
		config: ((args: {
			list: false
			is_script?: true | null
			avatar?: string | null
			user_age?: boolean | null
			account_age?: boolean | null
			bio?: string | null
			title?: string | null
			pronouns?: string | null
			corp?: boolean | null
			alt_of?: string | null
			badges?: string[] | null
		}) => ScriptResponse) & ((args: {
			list: true
			is_script?: true
			avatar?: string | null
			user_age?: boolean | null
			account_age?: boolean | null
			bio?: string | null
			title?: string | null
			pronouns?: string | null
			corp?: boolean | null
			alt_of?: string | null
			badges?: string[] | null
		}) => {
			avatar: string | null
			user_age?: boolean
			account_age?: boolean
			bio: string | null
			title: string | null
			pronouns: string
			corp?: boolean
			alt_of: string | null
			badges: string[]
		}) & ((args: {
			list: true
			is_script: false
			avatar?: string | null
			user_age?: boolean | null
			account_age?: boolean | null
			bio?: string | null
			title?: string | null
			pronouns?: string | null
			corp?: boolean | null
			alt_of?: string | null
			badges?: string[] | null
		}) => string)
	}
}

type MongoValue = string | number | boolean | Date | MongoValue[] | {
	[key: string]: MongoValue
} | null

type MongoCommandValue = string | number | boolean | Date | MongoCommandValue[] | {
	[key: string]: MongoCommandValue
} | null | undefined

type Query = {
	[key: string]: MongoValue | Query
} & {
	_id?: Id
	$in?: MongoValue[]
}

type Projection = Record<string, boolean | 0 | 1>

type MongoCommand = MongoCommandValue & Partial<{
	$set: Record<string, MongoCommandValue>
	$push: Record<string, MongoCommandValue>
	$unset: Record<string, "">
}>

type Id = string | number | boolean | Date | Record<string, MongoValue>

type MongoDocument = {
	[key: string]: MongoValue
	_id: Id
}

type SortOrder = {
	[key: string]: 1 | -1 | SortOrder
}

type Cursor = {
	/**
	 * Returns the first document that satisfies the query.
	 */
	first: () => MongoDocument | null

	/**
	 * Returns an array of documents that satisfy the query.
	 */
	array: () => MongoDocument[]

	/**
	 * Returns the number of documents that match the query.
	 */
	count: () => number

	/**
	 * Returns the first document that satisfies the query.
	 * Also makes cursor unusable.
	 */
	first_and_close: () => MongoDocument

	/**
	 * Returns an array of documents that satisfy the query.
	 * Also makes cursor unusable.
	 */
	array_and_close: () => MongoDocument[]

	/**
	 * Returns the number of documents that match the query.
	 * Also makes cursor unusable.
	 */
	count_and_close: () => number

	/**
	 * Run callback on each document that satisfied the query.
	 *
	 * @param funct callback function
	 */
	each: (funct: (document: MongoDocument) => void) => null

	/**
	 * Returns a new cursor with documents sorted as specified.
	 * A value of 1 sorts the property ascending, and -1 descending.
	 *
	 * @param order the way the documents are to be sorted
	 */
	sort: (order?: SortOrder) => Cursor

	/**
	 * Returns a new cursor without the first number of documents.
	 *
	 * @param count number of documents to skip
	 */
	skip: (count: number) => Cursor

	/**
	 * Returns a new cursor limited to a number of documents as specified
	 *
	 * @param count number of documents
	 */
	limit: (count: number) => Cursor

	/**
	 * @param key they key of the documents
	 */
	distinct: ((key: string) => MongoValue[]) & ((key: "_id") => Id[])

	/**
	 * Makes cursor unusable.
	 */
	close: () => null

	NumberLong: (number: number) => number
	ObjectId: () => any
}

type CLIContext = {
	/**
	 * The name of the user who is calling the script (i.e. n00b)
	 */
	caller: string

	/**
	 * The name of this script
	 */
	this_script: string

	/**
	 * the number of columns in the caller’s terminal, if reported by the client
	 */
	cols: number

	/**
	 * the number of rows in the caller’s terminal, if reported by the client
	 */
	rows: number

	/**
	 * The name of the script that directly called this script, or null if called on the command line or as a scriptor
	 */
	calling_script: null
}

type SubscriptContext = Replace<CLIContext, {
	/**
	 * The name of the script that directly called this script, or null if called on the command line or as a scriptor
	 */
	calling_script: string
}>

type ScriptorContext = CLIContext & {
	/**
	 * true if the script is being run as a scriptor, otherwise falsey (not present currently, but I wouldn’t rely on that)
	 */
	is_scriptor: true
}

type BrainContext = CLIContext & {
	/**
	 * true if the script is being run via a bot brain
	 */
	is_brain: true
}

type Context = CLIContext | SubscriptContext | ScriptorContext | BrainContext

/**
 * Subscript space that can call FULLSEC scripts.
 */
declare const $fs: Fullsec

/**
 * Subscript space that can call HIGHSEC and above scripts.
 * Makes your script HIGHSEC (overrides FULLSEC).
 */
declare const $hs: Highsec

/**
 * Subscript space that can call MIDSEC and above scripts.
 * Makes your script MIDSEC (overrides higher security levels).
 */
declare const $ms: Midsec

/**
 * Subscript space that can call LOWSEC and above scripts.
 * Makes your script LOWSEC (overrides higher security levels).
 */
declare const $ls: Lowsec

/**
 * Subscript space that can call any script.
 * Makes your script NULLSEC (overrides higher security levels).
 */
declare const $ns: Nullsec

/**
 * Subscript space that can call FULLSEC scripts.
 */
declare const $4s: typeof $fs

/**
 * Subscript space that can call HIGHSEC and above scripts.
 * Makes your script HIGHSEC (overrides FULLSEC).
 */
declare const $3s: typeof $hs

/**
 * Subscript space that can call MIDSEC and above scripts.
 * Makes your script MIDSEC (overrides higher security levels).
 */
declare const $2s: typeof $ms

/**
 * Subscript space that can call LOWSEC and above scripts.
 * Makes your script LOWSEC (overrides higher security levels).
 */
declare const $1s: typeof $ls

/**
 * Subscript space that can call any script.
 * Makes your script NULLSEC (overrides higher security levels).
 */
declare const $0s: typeof $ns

/**
 * Subscript space that can call any script.
 * Uses seclevel provided in comment before script (defaults to NULLSEC)
 *
 * ```js
 * // @seclevel MIDSEC
 * export function script() {
 * 	$s.foo.bar() // will be converted to #ms.foo.bar()
 * }
 * ```
 */
declare const $s: Nullsec

declare const $db: {
	/**
	 * Insert
	 *
	 * Inserts a document or documents into a collection.
	 * @param documents A document or array of documents to insert into the collection.
	 */
	i: (documents: object | object[]) => {
		ok: 1
		n: number
		opTime: {
			ts: "Undefined Conversion"
			t: number
		}
		electionId: "Undefined Conversion"
		operationTime: "Undefined Conversion"
		$clusterTime: {
			clusterTime: "Undefined Conversion"
			signature: {
				hash: "Undefined Conversion"
				keyId: "Undefined Conversion"
			}
		}
	}

	/**
	 * Remove
	 *
	 * Removes documents from a collection.
	 * @param query Specifies deletion criteria using query operators.
	 */
	r: (query: Query) => {
		ok: 0 | 1
		n: number
		opTime: {
			ts: "Undefined Conversion"
			t: number
		}
		electionId: "Undefined Conversion"
		operationTime: "Undefined Conversion"
		$clusterTime: {
			clusterTime: "Undefined Conversion"
			signature: {
				hash: "Undefined Conversion"
				keyId: "Undefined Conversion"
			}
		}
	}

	/**
	 * Find
	 *
	 * Selects documents in a collection or view and returns a cursor to the selected documents.
	 * @param query Specifies deletion criteria using query operators.
	 * @param projection Specifies the fields to return in the documents that match the query filter.
	 */
	f: (query?: Query, projection?: Projection) => Cursor

	/**
	 * Update
	 *
	 * Modifies an existing document or documents in a collection.
	 * @param query Specifies deletion criteria using query operators.
	 * @param command The modifications to apply. {@link https://docs.mongodb.com/manual/reference/method/db.collection.update/#parameters}
	 */
	u: (query: Query | Query[], command: MongoCommand) => {
		ok: 0 | 1
		nModified: number
		n: number
		opTime: {
			ts: "Undefined Conversion"
			t: number
		}
		electionId: "Undefined Conversion"
		operationTime: "Undefined Conversion"
		$clusterTime: {
			clusterTime: "Undefined Conversion"
			signature: {
				hash: "Undefined Conversion"
				keyId: "Undefined Conversion"
			}
		}
	}

	/**
	 * Update 1
	 *
	 * Updates a single document within the collection based on the filter.
	 * @param query Specifies deletion criteria using query operators.
	 * @param command The modifications to apply. {@link https://docs.mongodb.com/manual/reference/method/db.collection.update/#parameters}
	 */
	u1: (query: Query | Query[], command: MongoCommand) => {
		ok: 0 | 1
		nModified: number
		n: number
		opTime: {
			ts: "Undefined Conversion"
			t: number
		}
		electionId: "Undefined Conversion"
		operationTime: "Undefined Conversion"
		$clusterTime: {
			clusterTime: "Undefined Conversion"
			signature: {
				hash: "Undefined Conversion"
				keyId: "Undefined Conversion"
			}
		}
	}

	/**
	 * Upsert
	 *
	 * Same as Update, but if no documents match the query, one document will be inserted based on the properties in both the query and the command.
	 * The `$setOnInsert` operator is useful to set defaults.
	 * @param query Specifies deletion criteria using query operators.
	 * @param command The modifications to apply. {@link https://docs.mongodb.com/manual/reference/method/db.collection.update/#parameters}
	 */
	us: (query: Query | Query[], command: MongoCommand) => {
		ok: 0 | 1
		nModified: number
		n: number
		opTime: {
			ts: "Undefined Conversion"
			t: number
		}
		electionId: "Undefined Conversion"
		operationTime: "Undefined Conversion"
		$clusterTime: {
			clusterTime: "Undefined Conversion"
			signature: {
				hash: "Undefined Conversion"
				keyId: "Undefined Conversion"
			}
		}
	}
}

/**
 * Debug Log
 *
 * If `$D()` is called in a script you own, the `return` value of the top level script is suppressed and instead an array of every `$D()`’d entry is printed.
 * This lets you use `$D()` like `console.log()`.
 *
 * `$D()` in scripts not owned by you are not shown but the `return` value always is.
 *
 * `$D()` returns the first argument so `$D("Hello, World!") evaluates to `"Hello, World!"` as if the `$D` text wasn't there.
 *
 * `$D()`’d items are returned even if the script times out or errors.
 */
declare function $D<T>(args: T): T

/**
 * Function Multi-Call Lock
 *
 * This is used by escrow to ensure that it is only used once in script execution.
 *
 * The first time (per-script) `$FMCL` is encountered, it returns `undefined`, every other time it `return`s `true`.
 *
 * @example
 * if ($FMCL)
 * 	return { ok: false, msg: "this script can only be used once per script execution" }
 *
 * // all code here will only run once
 */
declare const $FMCL: undefined | true

/**
 * Global
 *
 * A mutable, per-script global object.
 * $G persists between script calls until the end of the main script run making it useful for caching db entries when your script is a subscript.
 *
 * @example
 * if (!$G.dbCache)
 * 	$G.dbCache = $db.f({ whatever: true }).first()
 */
declare const $G: any

/**
 * This contains a JS timestamp (not Date) set immediately before your code begins running.
 *
 * @example
 * Date.now() - _START // milliseconds left of run time
 */
declare const _START: number

/**
 * This contains a JS timestamp (not Date) set immediately before your code begins running.
 *
 * @example
 * Date.now() - _ST // milliseconds left of run time
 */
declare const _ST: typeof _START

/**
 * JavaScript timestamp for the end of the script run (`_START + _TIMEOUT`).
 */
declare const _END: number

/**
 * The number of milliseconds a script can run for.
 * Normally `5000` though it has been known to change.
 */
declare const _TIMEOUT: number

/**
 * The number of milliseconds a script can run for.
 * Normally `5000` though it has been known to change.
 */
declare const _TO: typeof _TIMEOUT

/** The source code of this script as a string. */
declare const _SOURCE: string

/** A unix timestamp of the date this script was built. */
declare const _BUILD_DATE: number

/**
 * The user this script has been uploaded to.
 *
 * Shorter alternative to `context.this_script.split(".")[0].
 *
 * In rare cases where it's not known at build time, it's `"UNKNOWN"`.
 */
declare const _SCRIPT_USER: string

/**
 * The name of this script excluding the user and `.`.
 *
 * e.g. in the script `foo.bar`, `_SCRIPT_NAME` is `bar`.
 *
 * Shorter alternative to `context.this_script.split(".")[1].
 *
 * In rare cases where it's not known at build time, it's `"UNKNOWN"`.
 */
declare const _SCRIPT_NAME: string

/**
 * The full name of this script equivilent to `context.this_script` but should use less characters.
 *
 * In rare cases where it's not known at build time, it's `"UNKNOWN"`.
 */
declare const _FULL_SCRIPT_NAME: string

/**
 * The seclevel of this script as a number.
 *
 * In rare cases where it's not known at build time, it's `-1`.
 */
declare const _SECLEVEL: -1 | 0 | 1 | 2 | 3 | 4
