import * as Joi from 'joi'
import { Bottle, BottleCreateReqDTO, BottleGetResDTO } from '../interfaces'
import { fbTimestampOrJsDateSchema, geoSchema } from './shared'

// #region SHARED SCHEMA FOR BOTTLE POST
/**
 * Schema untuk data yang dikirim oleh user
 * Yang perlu dikirim dari client cuma secuil ini + Auth token
 */
const _userSuppliedBottleDataSchema = {
  kind: Joi.valid('text'),
  /**
     * `content` boleh gak diisi misal ketika jenis konten adalah foto
     */
  contentText: Joi.string().min(1).max(255),
  geo: geoSchema,
}

/**
 * Schema untuk data yang diisi oleh server secara otomatis baik ekstraksi data dari unstructured text/image
 * atau apalah, lalu agregated counter juga kek like number, comment number
 * Note bahwa tidak ada kolom `relevance` disini karena itu personalized
 */
const _serverSuppliedBottleDataSchema = {
  createdAt: fbTimestampOrJsDateSchema.required(),
  uid: Joi.string().required(),
  likeCount: Joi.number(),
  commentCount: Joi.number().description('Auto aggregated number of comments received for this post (Including filtered, spam etc)'),
  /**
   * Signal
   */
  lastLikeAt: Joi.date().optional().description('Last time someone like this post, used for relevance'),
  lastCommentAt: Joi.date().optional().description('Last time someone commented on this post, used for relevance'),
  lastSignalAt: Joi.date().optional().description('Last time someone either like or commented on this post, for easier relevance scoring'),
  /**
   * Extracted from text, or somewhere idk
   */
  tags: Joi.array().items(Joi.string()), // TODO: Tambahin validasi tag (Gaisi spasi etc), simpen # atau teks aja?
  mentions: Joi.array().items(Joi.string()), // TODO: Validasi, simpen tanda @ atau teks aja?
  /**
   * ML filled
   */
  autoTags: Joi.array().items(Joi.string()), // Mirip kek tag, tapi ditambahin tag yang disarankan
  flags: Joi.array().items(Joi.string()),
  /**
   * Media
   */
  _contentImagePath: Joi.string(),
  contentImageUrl: Joi.string(),
}
// #endregion

// #region DTO, android hanya lihat yang disini aja
/**
 * DTO untuk data yang dikirim client
 * Client -> Server data validation
 * bentuk geo yang diterima berupa object {lat, lng}
 * beda dengan yang disimpan di Firestore sebagai
 * Geoposition, dan di Typesense yang pake array [lat, lng]
 */
export const BottleCreateReqDTOSchema =
  Joi.object<BottleCreateReqDTO>({
    contentImagePath: Joi.string(),
    ..._userSuppliedBottleDataSchema
  })
    .meta({ className: 'BottleCreateReqDTO' })
    .description('Schema for creating a new post, sent from client')

/**
 * DTO untuk data yang dikirim server ke client
 * Server -> Client data validation
 */
export const BottleGetResDTOSchema = Joi.object<BottleGetResDTO>({
  relevanceScore: Joi.number().optional(),
  ..._userSuppliedBottleDataSchema,
  ..._serverSuppliedBottleDataSchema,
  ..._userSuppliedBottleDataSchema
})
  .meta({ className: 'BottleGetResDTO' })
  .description('Schema for validating post received by client from server, this adds personalized relevance score')
// #endregion

/**
 * DOI untuk data yang disimpan di server (Firestore)
 * perhatikan gaada `relevance` disini
 * Note: Nanti kalau pake Firestore, validasi dan migrasi bakalan susah
 * ... itu adalah Spread Operator
 * Todo: created_at masih tipenya `Date`, firebase pake `Timestamp`
 */
export const BottleSchema = Joi.object<Bottle>({
  ..._serverSuppliedBottleDataSchema,
  ..._userSuppliedBottleDataSchema
}).meta({ className: 'Bottle' })
