import Joi = require("joi");
import {Mission} from "../interfaces/Mission";
import {fbTimestampOrJsDateSchema, geoSchema} from "./shared";

const _missionSchemaContent = {
  kind: Joi.string().required().valid('geofence', 'geofence+picture', 'geofence+posted', 'geofence+posted+dated'),
  geofence: Joi.array().items(geoSchema),
  center: geoSchema.required(),
  description: Joi.string().required(),
  _class_id: Joi.number().min(0).max(16),
  startAt: fbTimestampOrJsDateSchema,
  endAt: fbTimestampOrJsDateSchema,
  createdAt: fbTimestampOrJsDateSchema.required(),
  enable: Joi.bool().required().default(false),
  reward: Joi.string().required(), // Reward kasih badge aja dulu
}

export const MissionCreateSchema = Joi.object({
  id: Joi.string().required(),
  ..._missionSchemaContent,
}).meta({className: 'MissionCreate'})

export const MissionSchema = Joi.object<Mission>({
  ..._missionSchemaContent,
}).meta({className: 'Mission'})