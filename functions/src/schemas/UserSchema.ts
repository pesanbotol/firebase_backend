import * as Joi from 'joi'
import { UserMetaAggegator, UserProfile, UserProfileSummaryGet, UserUpdateProfile } from '../interfaces/User'
import {mediaSchema} from './shared'

const _avatarMedia = mediaSchema.default({
  kind: 'image',
  mediaThumbnailUrl: 'http://localhost:9199/v0/b/semiotic-joy-349807.appspot.com/o/staticfiles%2Fdefaultavatar%2Fblank-thumbnail.jpeg?alt=media&token=771e3be0-b864-4b23-8df1-ef3380eeec83',
  mediaUrl: 'http://localhost:9199/v0/b/semiotic-joy-349807.appspot.com/o/staticfiles%2Fdefaultavatar%2Fblank.jpeg?alt=media&token=db1f2cd3-558a-4cb0-b5c0-98066588e91d'
})

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
  displayName: Joi.string().min(1).max(64)
}).meta({ className: 'UserUpdateProfile' })

/**
 * Schema profile user
 */
export const UserProfileSchema = Joi.object<UserProfile>({
  avatar: _avatarMedia,
  registeredAt: Joi.date().required(),
  username: Joi.string().min(3).max(64).required(),
  description: Joi.string().max(256),
  displayName: Joi.string().min(1).max(64),

  follows: Joi.array(),
  recvFollows: Joi.array()
})
  .meta({ className: 'UserProfile' })

/**
 * Schema profile for user, as seen by other user, used in list bottle index
 */
export const UserProfileSummaryGetSchema = Joi.object<UserProfileSummaryGet>({
  username: Joi.string().min(3).max(64).required(),
  displayName: Joi.string().min(1).max(64),
  // TODO: Add avatar
})
  .meta({ className: 'UserProfileSummaryGet' })
