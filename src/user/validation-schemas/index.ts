import Joi from 'joi';
// @ts-ignore
import convert from 'joi-to-json-schema';

const joiUserSchma = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().regex(/^[0-9]+$/),
  })
  .required();

const joiLoginSchema = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .required();

export const userSchema = convert(joiUserSchma);
export const loginSchema = convert(joiLoginSchema);
