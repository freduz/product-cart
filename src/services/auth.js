import User from '../models/User';
import jwt from '../helpers/jwt';

export default () => ({
  async signUp(req) {
    if (Object.keys(req.body).includes('role')) delete req.body.role;
    const user = await User.create(req.body);
    const token = jwt(user.id);

    return { user, token };
  },
  async login(req) {
    console.log(req.body);
  },
});
