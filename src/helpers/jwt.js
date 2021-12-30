import jwt from 'jsonwebtoken';

import { JWT_EXPIRES_IN, JWT_SECRET } from '../../config/env';

export default (userid) => {
  const token = jwt.sign({ id: userid }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};
