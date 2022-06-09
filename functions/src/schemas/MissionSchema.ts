import Joi = require("joi");
import {Mission, MissionSubmission, MissionSubmitDTO} from "../interfaces/Mission";
import {fbTimestampOrJsDateSchema, geoSchema, mediaSchema} from "./shared";

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

/**
 * Ini yang disimpen di users/{uid}/missions
 */
export const MissionSubmissionSchema = Joi.object<MissionSubmission>({
  missionId: Joi.string().required(),
  geo: geoSchema,
  _imagePath: Joi.string(),
  image: mediaSchema,
  rewarded: Joi.array().items(Joi.string().required()).required(),
  submittedAt: fbTimestampOrJsDateSchema.required(),
}).meta({className: "MissionSubmission"})

/**
 * Yang dikirim sama user pas submit proses misi
 */
export const MissionSubmitDTOSchema = Joi.object<MissionSubmitDTO>({
  missionId: Joi.string().required(),
  geo: geoSchema,
  imagePath: Joi.string(),
}).meta({className: "MissionSubmitDTO"})