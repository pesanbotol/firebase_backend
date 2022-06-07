import {logger} from 'firebase-functions/v1'
import * as Joi from 'joi'
import {UserProfile, UserProfileSummaryGet, UserUpdateProfile} from '../interfaces/User'
import {fbTimestampOrJsDateSchema, mediaSchema} from './shared'
import {UserMetaSchema} from './UserMetaSchema'

const DEFAULT_AVATAR_URL = process.env.DEFAULT_AVATAR_URL
const DEFAULT_AVATAR_THUMB_URL = process.env.DEFAULT_AVATAR_THUMB_URL

if (!DEFAULT_AVATAR_URL) {
  logger.warn("DEFAULT_AVATAR_URL is not set")
}
if (!DEFAULT_AVATAR_THUMB_URL) {
  logger.warn("DEFAULT_AVATAR_THUMB_URL is not set")
}

const _avatarMedia = mediaSchema.default({
  kind: 'image',
  mediaThumbnailUrl: DEFAULT_AVATAR_THUMB_URL,
  mediaUrl: DEFAULT_AVATAR_URL,
})

const _displayNameOrUsername = Joi.string().min(1).max(64).default((parent) => {
  return parent.username
})

/**
 * Schema profile user creating
 */
const _userProfileCreateSchema = {
  registeredAt: fbTimestampOrJsDateSchema.required(),
  username: Joi.string().min(3).max(64).required(),
  description: Joi.string().max(256),
  displayName: _displayNameOrUsername,
}

/** =================== */

/**
 * Schema data di `users/{uid}/meta/socials
 */
export const UserUpdateProfileSchema = Joi.object<UserUpdateProfile>({
  facebook: Joi.string(),
  instagram: Joi.string(),
  twitter: Joi.string(),
  description: Joi.string().max(256),
  displayName: Joi.string().min(1).max(64)
}).meta({className: 'UserUpdateProfile'})

/**
 * Untuk ngebuat user baru
 */
export const UserCreateProfileSchema = Joi.object(_userProfileCreateSchema).meta({className: 'UserCreateProfile'})

/**
 * Schema profile user
 */
export const UserProfileSchema = Joi.object<UserProfile>({
  ..._userProfileCreateSchema,
  avatar: _avatarMedia,

  follows: Joi.array(),
  recvFollows: Joi.array(),

  meta: UserMetaSchema.required(),
})
  .meta({className: 'UserProfile'})

/**
 * Schema profile for user, as seen by other user, used in list bottle index
 */
export const UserProfileSummaryGetSchema = Joi.object<UserProfileSummaryGet>({
  username: Joi.string().min(3).max(64).required(),
  displayName: _displayNameOrUsername,
  avatar: _avatarMedia,
})
  .meta({className: 'UserProfileSummaryGet'})
