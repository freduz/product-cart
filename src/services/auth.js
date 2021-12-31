import User from '../models/User';
import { signToken } from '../helpers/jwt';
import AppError from '../utils/AppError';

export default () => ({
  async signUp(req) {
    if (Object.keys(req.body).includes('role')) delete req.body.role;
    const user = await User.create(req.body);
    const token = signToken(user.id);

    return { user, token };
  },
  async login(req, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new AppError(400, 'Please provide the email and password'));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.checkPassword(password, user.password))) {
      return next(new AppError(400, 'Incorrect email or password'));
    }
    const token = signToken(user.id);
    return { user, token };
  },
});
