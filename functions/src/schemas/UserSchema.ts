import * as Joi from 'joi'
import { UserProfile } from '../interfaces/User'

/**
 * Schema profile user
 */
export const UserProfileSchema = Joi.object({
  registeredAt: Joi.date().required(),
  username: Joi.string().min(3).max(64),
  description: Joi.string().max(256),
  displayName: Joi.string().min(1).max(64),
})
  .meta({ className: 'UserProfile' })
