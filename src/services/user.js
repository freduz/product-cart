import User from '../models/User';
import { userLogger } from '../utils/logger';
import AppError from '../utils/AppError';

export default () => ({
  async create(req) {
    try {
      req.body.userImage = req.file ? req.file.filename : '';
      const user = await User.create(req.body);
      return user;
    } catch (err) {
      userLogger.error(`${err}`);
      throw Error(err);
    }
  },
  async getOne(req) {
    try {
      const user = await User.findById(req.params.id);
      // eslint-disable-next-line no-new
      if (!user) {
        throw new AppError(404, `No user found with this ${req.params.id}`);
      }
      return user;
    } catch (err) {
      userLogger.error(`${err}`);
      throw Error(err);
    }
  },
  async getAll() {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      userLogger.error(`${err}`);
      throw Error(err);
    }
  },
  async delete(req) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        throw new AppError(404, `No user found with this ${req.params.id}`);
      }

      return null;
    } catch (err) {
      userLogger.error(`${err}`);
      throw Error(err);
    }
  },
  async update(req) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        throw new AppError(404, `No user found with this ${req.params.id}`);
      }
      return user;
    } catch (err) {
      userLogger.error(`${err}`);
      throw Error(err);
    }
  },
});
