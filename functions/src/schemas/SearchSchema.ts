import * as Joi from 'joi'
import {SearchReqDTO} from '../interfaces'

export const SearchReqDTOSchema = Joi.object<SearchReqDTO>({
  q: Joi.string().required(),
  searchKind: Joi.string().valid('all', 'user', 'post').required()
}).meta({ className: 'SearchReqDTO' })
