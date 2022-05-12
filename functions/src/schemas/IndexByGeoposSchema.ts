import * as Joi from "joi";

export const JobSchema = Joi.object({
  businessName: Joi.string().required(),
  jobTitle: Joi.string().required(),
}).meta({className: "Job"});
