/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';

dotenv.config({});

export const { PORT, DATABASE, DATABASE_PASSWORD, JWT_SECRET, JWT_EXPIRES_IN } =
  process.env;
