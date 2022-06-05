/**
 * This `schema` folder will contain DTO (Data Transfer Object)
 * and object shape validation logic/rule
 *
 * Why? Ketika ada request masuk, dari client android maka ada kemungkinan
 * ada satu dua data yang kosong, tipe data salah etc
 * Dan dengan make JOI untuk ngevalidasi, kita bisa ngecek bentuk data masuk
 * dengan mudah, gak usah manual make if-else-then
 *
 * PS. This schema folder is used to create a Typescript `interfaces`
 * folder `interfaces` dibuat full secara otomatis pake command `npm run joi2ts`
 * fungsi dari interfaces adalah untuk autocompletion dan type checking
 */

export * from './BottleSchema'
export * from './IndexDOISchema'
export * from './SearchSchema'
export * from './UserSchema'
export * from './shared'
export * from './UserMetaSchema'