/* eslint-disable import/prefer-default-export */
import { check, validationResult } from 'express-validator';

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
