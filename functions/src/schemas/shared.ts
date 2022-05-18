import * as Joi from 'joi'

export const fbTimestampOrJsDateSchema = Joi.alternatives([
  Joi.object().keys({ _seconds: Joi.number(), _nanoseconds: Joi.number() }),
  Joi.object().keys({ seconds: Joi.number(), nanoseconds: Joi.number() }),
  Joi.date()
]).description('a firebase timestamp (If getting data from firestore) or js date (if creating data to store to firestore)')

export const geoSchema = Joi.array().length(2).ordered(
  Joi.number().min(-90).max(90).required().description('Lat is from -90.0 to +90.0 degree'),
  Joi.number().min(-180).max(180).required().description('Longitude is from -180.0 to +180.0 degree')
).description('Unified typesense, firestore, and client geoposition data type, [lat, lng]')
