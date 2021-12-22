import mongoose from 'mongoose';
import { DATABASE, DATABASE_PASSWORD } from './env';

export default async () => {
  try {
    const DB = DATABASE.replace('<password>', DATABASE_PASSWORD);
    const conn = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connected on ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
