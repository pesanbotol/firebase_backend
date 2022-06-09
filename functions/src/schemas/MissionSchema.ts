import Joi = require("joi");
import {fbTimestampOrJsDateSchema, geoSchema} from "./shared";

const _missionSchemaContent = {
  kind: Joi.string().required().valid('geofence', 'geofence+picture', 'geofence+posted', 'geofence+posted+dated'),
  geofence: Joi.array().items(geoSchema.required()),
  center: geoSchema.required(),
  description: Joi.string().required(),
  _class_id: Joi.number().min(0).max(16),
  startAt: fbTimestampOrJsDateSchema,
  endAt: fbTimestampOrJsDateSchema,
  createdAt: fbTimestampOrJsDateSchema,
  enable: Joi.bool().required().default(false),
  reward: Joi.array().items(Joi.string()).required(), // Reward kasih badge aja dulu
}

export const MissionCreateSchema = Joi.object({
  id: Joi.string().required(),
  ..._missionSchemaContent,
})

export const MissionSchema = Joi.object({
  ..._missionSchemaContent,
}).meta({className: 'Mission'})