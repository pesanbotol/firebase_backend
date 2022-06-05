import Joi = require("joi")
import {UserMetaAggegator, UserMetaSocials} from "../interfaces/UserMeta"

/**
 * Schema counter di `users/{uid}/meta/aggregator
 */
 export const UserMetaAggegatorSchema = Joi.object<UserMetaAggegator>({
  postCount: Joi.number().required().min(0),
  commentCount: Joi.number().required().min(0),
  recvCommentCount: Joi.number().required().min(0),
  likeCount: Joi.number().required().min(0),
  recvLikeCount: Joi.number().required().min(0)
}).meta({className: 'UserMetaAggegator'})

/**
 * Schema metadata di `users/{uid}/meta/socials
 */
export const UserMetaSocialsSchema = Joi.object<UserMetaSocials>({
  facebook: Joi.string(),
  instagram: Joi.string(),
  twitter: Joi.string(),
}).meta({className: 'UserMetaSocials'})


export const UserMetaSchema = Joi.object({
  aggregator: UserMetaAggegatorSchema,
  socials: UserMetaSocialsSchema,
})
