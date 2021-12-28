/* eslint-disable import/prefer-default-export */
import { check, validationResult } from 'express-validator';
import Joi from 'joi';

// eslint-disable-next-line consistent-return
export const productValidate = async (req, res, next) => {
  await check('title').isString().notEmpty().run(req);
  await check('price').isNumeric().notEmpty().run(req);
  await check('quantity').isNumeric().notEmpty().run(req);
  await check('image').notEmpty().run(req);
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  next();
};

// eslint-disable-next-line consistent-return
export const userValidate = async (req, res, next) => {
  const userSchema = Joi.object({
    username: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    mobile: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    countryCode: Joi.string().required(),
    password: Joi.string().min(6).max(8).required(),
  });
  const { error } = userSchema.validate(req.body);
  if (error) return next(error);
  next();
};
