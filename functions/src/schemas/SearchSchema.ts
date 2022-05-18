import * as Joi from 'joi'
import { IndexByGeocordReqDTO, SearchReqDTO } from '../interfaces'
import { geoSchema } from './shared'

export const SearchReqDTOSchema = Joi.object<SearchReqDTO>({
  q: Joi.string().allow('', null).required(),
  searchKind: Joi.string().valid('all', 'users', 'bottles').required(),
  perPage: Joi.number().default(30),
  page: Joi.number().min(1).default(1)
}).meta({ className: 'SearchReqDTO' })

/**
 * Halaman muka, tampilkan post dari following x jam terakhir
 */
export const IndexByGeocordReqDTOSchema = Joi.object<IndexByGeocordReqDTO>({
  geo: geoSchema, // TODO: Make it required
  // TODO:  also add radius
  minutes: Joi.number().default(24 * 60).description('show post as recent as x minutes, default to 24 hours')
}).meta({ className: 'IndexByGeocordReqDTO' })
