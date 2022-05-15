import * as Joi from 'joi'
import { UserProfile } from '../interfaces/User'

/**
 * Schema profile user
 */
export const UserProfileSchema = Joi.object<UserProfile>({
  registeredAt: Joi.date().required(),
  username: Joi.string().min(3).max(64),
  description: Joi.string().max(256),
  displayName: Joi.string().min(1).max(64),
  postCount: Joi.number().required().min(0),
  commentCount: Joi.number().required().min(0),
  recvCommentCount: Joi.number().required().min(0),
  likeCount: Joi.number().required().min(0),
  recvLikeCount: Joi.number().required().min(0),
  follows: Joi.array(),
  recvFollows: Joi.array(),
})
  .meta({ className: 'UserProfile' })
