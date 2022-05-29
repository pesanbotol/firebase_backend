import * as Joi from 'joi'
import { UserMetaAggegator, UserProfile, UserProfileGet, UserUpdateProfile } from '../interfaces/User'

/**
 * Schema counter di `users/{uid}/meta/aggregator
 */
export const UserMetaAggegatorSchema = Joi.object<UserMetaAggegator>({
  postCount: Joi.number().required().min(0),
  commentCount: Joi.number().required().min(0),
  recvCommentCount: Joi.number().required().min(0),
  likeCount: Joi.number().required().min(0),
  recvLikeCount: Joi.number().required().min(0)
}).meta({ className: 'UserMetaAggegator' })

/**
 * Schema data di `users/{uid}/meta/socials
 */
 export const UserUpdateProfileSchema = Joi.object<UserUpdateProfile>({
  facebook: Joi.string(),
  instagram: Joi.string(),
  twitter: Joi.string(),
  description: Joi.string().max(256),
  displayName: Joi.string().min(1).max(64),
}).meta({ className: 'UserUpdateProfile' })

/**
 * Schema profile user
 */
export const UserProfileSchema = Joi.object<UserProfile>({
  registeredAt: Joi.date().required(),
  username: Joi.string().min(3).max(64).required(),
  description: Joi.string().max(256),
  displayName: Joi.string().min(1).max(64),

  follows: Joi.array(),
  recvFollows: Joi.array()
})
  .meta({ className: 'UserProfile' })

/**
 * Schema profile for user, as seen by other user
 */
 export const UserProfileGetSchema = Joi.object<UserProfileGet>({
  username: Joi.string().min(3).max(64).required(),
  displayName: Joi.string().min(1).max(64),
})
  .meta({ className: 'UserProfileGet' })