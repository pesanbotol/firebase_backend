import * as Joi from 'joi'

export const IndexByGeoposDOISchema = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required()
}).meta({ className: 'IndexByGeoposDOISchema' })
