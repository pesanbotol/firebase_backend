import * as Joi from 'joi'

const fbTimestampOrJsDate = Joi.alternatives([
  Joi.object().keys({_seconds: Joi.number(), _nanoseconds: Joi.number()}), 
  Joi.date()
]).required()
