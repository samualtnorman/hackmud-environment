interface MongoDBDatabase {
  /**
   * Inserts a document or documents into a collection.
   * @param documents A document or array of documents to insert into the collection.
   */
  i(documents: object|Array<object>): void

  /**
   * Removes documents from a collection.
   * @param query Specifies deletion criteria using query operators.
   */
  r(query: object): void

  /**
   * Selects documents in a collection or view and returns a cursor to the selected documents.
   * @param query Specifies deletion criteria using query operators.
   * @param projection Specifies the fields to return in the documents that match the query filter.
   */
  f(query?: object, projection?: object): MongoDBPointer

  /**
   * Modifies an existing document or documents in a collection.
   * @param query Specifies deletion criteria using query operators.
   * @param update The modifications to apply. {@link https://docs.mongodb.com/manual/reference/method/db.collection.update/#parameters}
   */
  u(documents: object|Array<object>, update: object): void

  /**
   * Updates a single document within the collection based on the filter.
   * @param query Specifies deletion criteria using query operators.
   * @param update The modifications to apply. {@link https://docs.mongodb.com/manual/reference/method/db.collection.update/#parameters}
   */
  u1(documents: object|Array<object>, update: object): void

  /**
   * Same as {#u}, but if no documents match the query, one document will be inserted based on the properties in both the query and the command. 
   * The `$setOnInsert` operator is useful to set defaults.
   * @param query Specifies deletion criteria using query operators.
   * @param update The modifications to apply. {@link https://docs.mongodb.com/manual/reference/method/db.collection.update/#parameters}
   */
  us(documents: object|Array<object>, update: object): void
}

interface MongoDBPointer {
  /**
   * Returns the first object of the query.
   */
  first(): object

  /**
   * Returns all objects of the query in an array.
   */
  array(): Array<object>
}

/**
 * The database class that can do database operations based on MongoDB.
 */
declare const #db: MongoDBDatabase;

interface SubscriptsBase {
  [user: string]: {
    [script: string]: ScriptsBase;  
  }
}

interface ScriptsBase {
  (args?: object): object;
}

interface ScriptsLib {
  ok(): {ok: true};
  not_impl(): {ok: false, msg: "not implemented"};
  log(message: string): void;
  get_log(): Array<string>;
  rand_int(min: number, max: number, rand: number): number;
  are_ids_eq(id1: string, id2: string): boolean;
  is_obj(what: any): boolean;
  is_str(what: any): boolean;
  is_num(what: any): boolean;
  is_int(what: any): boolean;
  is_neg(what: any): boolean;
  is_arr(what: any): boolean;
  is_func(what: any): boolean;
  is_def(what: any): boolean;
  is_valid_name(what: any): boolean;
  dump(obj: object): string;
  clone(obj: object): object;
  merge(obj1: object, obj2: object): object;
  get_values(obj: object): Array<any>;
  hash_code(string: string): string;
  to_gc_str(num: number): string;
  to_gc_num(str: string): number;
  to_game_timestr(str: Date): string;
  cap_str_len(string: string, length: number): string;
  each(array: Array<any>, fn: { (key: any, value: any): void }): void;
  select(array: Array<any>, fn: { (key: any, value: any): boolean }): Array<any>;
  count(array: Array<any>, fn: { (key: any, value: any): boolean }): number;
  select_one(array: Array<any>, fn: { (key: any, value: any): boolean }): any;
  map(array: Array<any>, fn: { (key: any, value: any): any }): Array<any>;
  shuffle(array: Array<any>): Array<any>;
  num_sort_asc(num1: number, num2: number): -1 | 1 | 0;
  num_sort_desc(num1: number, num2: number): -1 | 1 | 0;
  max_val_index(array: Array<any>): number;
  add_time(date: Date, add_ms: number): number;
  create_rand_string(length: number): string;
  get_user_from_script(script_name: string): string;
  u_sort_num_arr_desc(array: Array<any>): Array<any>;
  can_continue_execution(time_left: number): boolean;
  can_continue_execution_error(): string;
  date(): Date;
  get_date(): Date;
  get_date_time(): number;

  security_level_names: [
    "NULLSEC",
    "LOWSEC",
    "MIDSEC",
    "HIGHSEC",
    "FULLSEC"
  ];
  get_security_level_name(security_level: number): string;
}

interface JadeVitaEscrowResult {
  ok: boolean,
  charged: boolean,
  time: number,
  msg: string
}

type Subscripts = SubscriptsBase & {
  scripts: ScriptsBase & {
    lib(): ScriptsLib;  
  };
  jade: ScriptsBase & {
    vita(vita_charge: string, dep_acct: string, msg: string): JadeVitaEscrowResult;  
  };
}

/**
 * A scriptor space that can call FULLSEC scripts
 */
declare const #fs: Subscripts;

/**
 * A scriptor space that can call HIGHSEC scripts
 */
declare const #hs: Subscripts;

/**
 * A scriptor space that can call MIDSEC scripts
 */
declare const #ms: Subscripts;

/**
 * A scriptor space that can call LOWSEC scripts
 */
declare const #ls: Subscripts;

/**
 * A scriptor space that can call NULLSEC scripts
 */
declare const #ns: Subscripts;

/**
 * A scriptor space that can call any scripts
 * Note that this makes your script level as NULLSEC. It is preferred that you use other scriptor syntaxes.
 * @deprecated
 */
declare const #s: Subscripts;

/**
 * Function Multi-Call Lock: this is used by escrow to ensure that it is used called once in script execution.
 * The first time (in each script) that `#FMCL `is encountered, it returns falsey, and every time thereafter it returns truthy
 */
declare const #FMCL: boolean;

/**
 * A mutable, per-script global object.
 * If your script is called multiple times in a single overall script run, its #G is persisted between those calls (but each script sees its own #G).
 */
declare const #G: {};

/**
 * The epoch timestamp right before the script starts running.
 */
declare const _START: number;

/**
 * The epoch timestamp right before the script starts running.
 */
declare const _ST: number;

/**
 * The epoch timestamp when your script stops runing.
 */
declare const _END: number;

/**
 * The amount of time (in ms) for your script to run for.
 * Effectively always just 5000, except when a trust script is called on the command line and its value is, presumably, 8000.
 */
declare const _TIMEOUT: number;

/**
 * The amount of time (in ms) for your script to run for.
 * Effectively always just 5000, except when a trust script is called on the command line and its value is, presumably, 8000.
 */
declare const _TO: number;

interface HackmudContext {
  caller: string;
  this_script: string;
  calling_script: string | null;
  is_brain: boolean;
  cols: number;
  rows: number
}