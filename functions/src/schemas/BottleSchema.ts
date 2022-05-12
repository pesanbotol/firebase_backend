import * as Joi from "joi";
import {Bottle, BottleCreateDOI} from "../interfaces";

const _baseBottleSchema = {
  kind: Joi.valid("text"),
  geo: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }).required(),
  /**
     * `content` boleh gak diisi misal ketika jenis konten adalah foto
     */
  content: Joi.string().min(1).max(255),
};

/**
 * DOI untuk data yang diterima dari client
 */
export const BottleCreateDOISchema =
  Joi.object<BottleCreateDOI>(_baseBottleSchema).meta({className: "BottleCreateDOI"});

/**
 * DOI untuk data yang disimpan di server
 * Note: Nanti kalau pake Firestore, validasi dan migrasi bakalan susah
 * ... itu adalah Spread Operator
 * Todo: created_at masih tipenya `Date`, firebase pake `Timestamp`
 */
export const BottleSchema = Joi.object<Bottle>({
  created_at: Joi.date().required(),
  uid: Joi.string().required(),
  ..._baseBottleSchema,
}).meta({className: "Bottle"});
