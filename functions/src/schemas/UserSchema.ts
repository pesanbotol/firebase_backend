import * as Joi from 'joi'
import { UserProfile } from '../interfaces/User'

/**
 * Schema profile user
 */
export const UserProfileSchema = Joi.object<UserProfile>({
  registeredAt: Joi.date().required(),
  username: Joi.string().min(3).max(64),
  description: Joi.string().max(256)
})
  .meta({ className: 'UserProfile' })
