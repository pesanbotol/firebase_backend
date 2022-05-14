import * as Joi from 'joi'
import { Bottle, BottleCreateDOI } from '../interfaces'

const _baseBottleSchema = {
  kind: Joi.valid('text'),
  /**
     * `content` boleh gak diisi misal ketika jenis konten adalah foto
     */
  content: Joi.string().min(1).max(255)
}

/**
 * DTO untuk data yang diterima dari client
 * bentuk geo yang diterima berupa object {lat, lng}
 * beda dengan yang disimpan di Firestore sebagai
 * Geoposition, dan di Typesense yang pake array [lat, lng]
 */
export const BottleCreateDOISchema =
  Joi.object<BottleCreateDOI>({
    geo: Joi.object({
      lat: Joi.number().required(),
      lng: Joi.number().required()
    }).required(),
    ..._baseBottleSchema
  })
    .meta({ className: 'BottleCreateDOI' })

/**
 * DOI untuk data yang disimpan di server
 * Note: Nanti kalau pake Firestore, validasi dan migrasi bakalan susah
 * ... itu adalah Spread Operator
 * Todo: created_at masih tipenya `Date`, firebase pake `Timestamp`
 */
export const BottleSchema = Joi.object<Bottle>({
  createdAt: Joi.date().required(),
  uid: Joi.string().required(),
  geo: Joi.array().length(2),
  ..._baseBottleSchema
}).meta({ className: 'Bottle' })
