type Subscripts = Record<string, Scripts>
type Scripts = Record<string, (args?: any) => any>

interface ScriptError<T = string> {
	ok: false
	msg: T
}

type Fullsec = Subscripts & {
	accts: Scripts & {
		/**
		 * **FULLSEC**
		 */
		balance_of_owner(): number

		/**
		 * **FULLSEC**
		 */
		xfer_gc_to_caller(): {
			ok: false
			msg: string
		}

		xfer_gc_to_caller(args: {
			amount: number | string
			memo?: string
		}): {
			ok: false
			msg: string
		}
	}

	chats: Scripts & {
		/**
		 * **FULLSEC**
		 */
		create()

		/**
		 * **FULLSEC**
		 */
		send()

		/**
		 * **FULLSEC**
		 */
		tell()
	}

	escrow: Scripts & {
		/**
		 * **FULLSEC**
		 */
		charge()

		/**
		 * **FULLSEC**
		 */
		confirm()
	}

	gui: Scripts & {
		/**
		 * **FULLSEC**
		 */
		chats()

		/**
		 * **FULLSEC**
		 */
		quiet()

		/**
		 * **FULLSEC**
		 */
		size()

		/**
		 * **FULLSEC**
		 */
		vfx()

		/**
		 * **FULLSEC**
		 */
		vol()
	}

	market: Scripts & {
		/**
		 * **FULLSEC**
		 */
		browse()
	}

	scripts: Scripts & {
		/**
		 * **FULLSEC**
		 */
		fullsec()

		/**
		 * **FULLSEC**
		 */
		get_access_level()

		/**
		 * **FULLSEC**
		 */
		get_level({ name: string }): ScriptError<"Script doesn't exist."> | number

		/**
		 * **FULLSEC**
		 */
		highsec()

		/**
		 * **FULLSEC**
		 */
		lowsec()

		/**
		 * **FULLSEC**
		 */
		midsec()

		/**
		 * **FULLSEC**
		 */
		nullsec()

		/**
		 * **FULLSEC**
		 */
		trust()

		/**
		 * FULLSEC
		 *
		 * This is a code library containing useful helper functions you can use in your scripts.
		 */
		lib(): {
			ok()

			not_impl()

			log(message: any)

			get_log(): string[]

			rand_int(min: number, max: number): number

			are_ids_eq(id1: any, id2: any): boolean

			is_obj(what: any): boolean

			is_str(what: any): boolean

			is_num(what: any): boolean

			is_int(what: any): boolean

			is_neg(what: any): boolean

			is_arr(what: any): boolean

			is_func(what: any): boolean

			is_def(what: any): boolean

			is_valid_name(what: any): boolean

			dump(obj: object): string

			clone<T>(obj: object & T): T

			merge<T0, T1>(obj1: object & T0, obj2: object & T1): T0 & T1

			get_values(obj: object)

			hash_code(string: string): number

			to_gc_str(num: number): string

			to_gc_num(str: string): number

			to_game_timestr(date: Date): string

			cap_str_len(string: string, length: number): string

			each<T>(array: T[], fn: (key: string, value: T) => void): void

			select<T>(array: T[], fn: (key: string, value: T) => boolean): T[]

			count<T>(array: T[], fn: (key: string, value: T) => boolean): number

			select_one<T>(array: T[], fn: (key: string, value: T) => boolean): T

			map<T>(array: T[], fn: (key: string, value: T) => boolean): T[]

			shuffle<T>(array: T[]): T[]

			sort_asc()

			sort_desc()

			num_sort_asc(one: number, two: number): 1 | -1 | 0

			num_sort_desc(one: number, two: number): 1 | -1 | 0

			max_val_index(array: number[]): number

			add_time(date: Date, add_ms: number): Date

			security_level_names(security_level: number)

			get_security_level_name(security_level: number)

			create_rand_string(len: number): string

			get_user_from_script(script_name: string): string

			u_sort_num_arr_desc<T>(array: T[]): T[]

			can_continue_execution(time_left: number): boolean

			can_continue_execution_error()

			date()

			get_date()

			get_date_utcsecs(): number
		}
	}

	sys: Scripts & {
		/**
		 * **FULLSEC**
		 */
		init()

		/**
		 * **FULLSEC**
		 */
		upgrades_of_owner()
	}

	users: Scripts & {
		/**
		 * **FULLSEC**
		 */
		active()

		/**
		 * **FULLSEC**
		 */
		last_action()

		/**
		 * **FULLSEC**
		 */
		top()
	}
}

type Highsec = Subscripts & {
	accts: Scripts & {
		/**
		 * **HIGHSEC**
		 *
		 * Shows your GC balance
		 */
		balance(args?: {
			/**
			 * If true, output is a number, otherwise a GC string
			 */
			is_script?: boolean
		})

		/**
		 * **HIGHSEC**
		 */
		transactions()
	}

	scripts: Scripts & {
		/**
		 * **HIGHSEC**
		 */
		sys()
	}

	sys: Scripts & {
		/**
		 * **HIGHSEC**
		 */
		specs()

		/**
		 * **HIGHSEC**
		 */
		status()

		/**
		 * **HIGHSEC**
		 */
		upgrade_log()

		/**
		 * **HIGHSEC**
		 */
		upgrades()
	}

	users: Scripts & {
		/**
		 * **HIGHSEC**
		 */
		inspect()
	}
}

type Midsec = Subscripts & {
	accts: Scripts & {
		/**
		 * **MIDSEC**
		 */
		xfer_gc_to()
	}

	autos: Scripts & {
		/**
		 * **MIDSEC**
		 */
		reset()
	}

	chats: Scripts & {
		/**
		 * **MIDSEC**
		 */
		channels()

		/**
		 * **MIDSEC**
		 */
		join()

		/**
		 * **MIDSEC**
		 */
		leave()

		/**
		 * **MIDSEC**
		 */
		users()
	}

	escrow: Scripts & {
		/**
		 * **MIDSEC**
		 */
		stats()
	}

	market: Scripts & {
		/**
		 * **MIDSEC**
		 */
		buy()

		/**
		 * **MIDSEC**
		 */
		stats()
	}

	scripts: Scripts & {
		/**
		 * **MIDSEC**
		 */
		user()
	}

	sys: Scripts & {
		/**
		 * **MIDSEC**
		 */
		manage()
	}
}

type Lowsec = Subscripts & {
	kernel: Scripts & {
		/**
		 * **LOWSEC**
		 */
		hardline()
	}

	market: Scripts & {
		/**
		 * **LOWSEC**
		 */
		sell()
	}

	sys: Scripts & {
		/**
		 * **LOWSEC**
		 */
		access_log()

		/**
		 * **LOWSEC**
		 */
		cull()

		/**
		 * **LOWSEC**
		 */
		loc()

		/**
		 * **LOWSEC**
		 */
		xfer_upgrade_to()
	}
}

type Nullsec = Subscripts & {
	corps: Scripts & {
		/**
		 * **NULLSEC**
		 */
		create()

		/**
		 * **NULLSEC**
		 */
		hire()

		/**
		 * **NULLSEC**
		 */
		manage()

		/**
		 * **NULLSEC**
		 */
		offers()

		/**
		 * **NULLSEC**
		 */
		quit()

		/**
		 * **NULLSEC**
		 */
		top()
	}

	sys: Scripts & {
		/**
		 * **NULLSEC**
		 */
		breach()
	}

	trust: Scripts & {
		/**
		 * **NULLSEC**
		 */
		me()
	}

	users: Scripts & {
		/**
		 * **NULLSEC**
		 */
		config()
	}
}

/**
 * Subscript space that can call FULLSEC scripts.
 */
declare const #fs: Fullsec

/**
 * Subscript space that can call HIGHSEC and above scripts.
 * Makes your script HIGHSEC.
 */
declare const #hs: Fullsec & Highsec

/**
 * Subscript space that can call MIDSEC and above scripts.
 * Makes your script MIDSEC (overrides higher security levels).
 */
declare const #ms: Fullsec & Highsec & Midsec

/**
 * Subscript space that can call LOWSEC and above scripts.
 * Makes your script LOWSEC (overrides higher security levels).
 */
declare const #ls: Fullsec & Highsec & Midsec & Lowsec

/**
 * Subscript space that can call NULLSEC and above scripts.
 * Makes your script NULLSEC (overrides higher security levels).
 */
declare const #ns: Fullsec & Highsec & Midsec & Lowsec & Nullsec

/**
 * Debug Log
 *
 * If #D is called in a script you own, the return value of the top level script is suppressed and instead an array of every #D’d entry is printed.
 * This lets you use #D kind of like console.log.
 * #D in scripts not owned by you are not shown.
 * #D returns its argument unchanged, so you can do things like return #D(ob) to return the object when the caller isn’t you, and debug-log it when it is you (allowing you to “keep” your returns with other debug logs).
 * #D’d items are returned even if the script times out or errors.
 */
declare function #D<T = undefined>(args?: T): T

/**
 * Function Multi-Call Lock
 *
 * This is used by escrow to ensure that it is used called once in script execution.
 * The first time (in each script) that `#FMCL `is encountered, it returns falsey, and every time thereafter it returns truthy
 *
 * @example
 * if (#FMCL)
 * 	return "error"
 */
declare const #FMCL: boolean

/**
 * Global
 *
 * A mutable, per-script global object.
 * #G persists between script calls until the end of a main script run, making it useful for caching db entries when your script is a subscript.
 *
 * @example
 * if (!#G.dbCache)
 * 	#G.dbCache = #db.f({ whatever: true }).first()
 */
declare const #G: {}

/**
 * This contains a JS timestamp (not Date) set immediately before your code begins running.
 *
 * @example
 * Date.now() - _START // How much time remains
 */
declare const _START: number

/**
 * This contains a JS timestamp (not Date) set immediately before your code begins running.
 *
 * @example
 * Date.now() - _ST // How much time remains
 */
declare const _ST = _START

/**
 * This contains a JS timestamp for the end of your script run -- effectively just `_ST+_TO`
 */
declare const _END: number

/**
 * This contains the number of milliseconds a script is allowed to run for.
 * Effectively always just 5000, except when a trust script is called on the command line and its value is, presumably, 6000.
 */
declare const _TIMEOUT: number

/**
 * This contains the number of milliseconds a script is allowed to run for.
 * Effectively always just 5000, except when a trust script is called on the command line and its value is, presumably, 6000.
 */
declare const _TO = _TIMEOUT

declare const #db: {
	/**
	 * Insert
	 *
	 * Inserts a document or documents into a collection.
	 * @param documents A document or array of documents to insert into the collection.
	 */
	i(documents: object | object[]): void

	/**
	 * Remove
	 *
	 * Removes documents from a collection.
	 * @param query Specifies deletion criteria using query operators.
	 */
	r(query: object): void

	/**
	 * Find
	 *
	 * Selects documents in a collection or view and returns a cursor to the selected documents.
	 * @param query Specifies deletion criteria using query operators.
	 * @param projection Specifies the fields to return in the documents that match the query filter.
	 */
	f(query?: object, projection?: object): {
		/**
		 * Returns the first object of the query.
		 */
		first(): object

		/**
		 * Returns all objects of the query in an array.
		 */
		array(): object[]

		distinct()

		sort()

		limit()

		skip()
	}

	/**
	 * Update
	 *
	 * Modifies an existing document or documents in a collection.
	 * @param query Specifies deletion criteria using query operators.
	 * @param command The modifications to apply. {@link https://docs.mongodb.com/manual/reference/method/db.collection.update/#parameters}
	 */
	u(query: object | object[], command: object): void

	/**
	 * Update 1
	 *
	 * Updates a single document within the collection based on the filter.
	 * @param query Specifies deletion criteria using query operators.
	 * @param command The modifications to apply. {@link https://docs.mongodb.com/manual/reference/method/db.collection.update/#parameters}
	 */
	u1(query: object | object[], command: object): void

	/**
	 * Upsert
	 *
	 * Same as Update, but if no documents match the query, one document will be inserted based on the properties in both the query and the command.
	 * The `$setOnInsert` operator is useful to set defaults.
	 * @param query Specifies deletion criteria using query operators.
	 * @param command The modifications to apply. {@link https://docs.mongodb.com/manual/reference/method/db.collection.update/#parameters}
	 */
	us(query: object | object[], command: object): void
}

interface Context {
	caller: string
	this_script: string
	calling_script: string | null
	is_brain: boolean
	cols: number
	rows: number
}
