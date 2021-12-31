import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { JWT_EXPIRES_IN, JWT_SECRET } from '../../config/env';

export const signToken = (userid) => {
  const token = jwt.sign({ id: userid }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyToken = async (token) => {
  const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

  return decoded;
};
