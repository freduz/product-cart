import User from '../models/User';

export default () => ({
  async create(req) {
    req.body.userImage = req.file ? req.file.filename : '';
    const user = await User.create(req.body);
    return user;
  },
  async getOne(req) {
    const user = await User.findById(req.params.id);
    return user;
  },
  async getAll() {
    const users = await User.find();
    return users;
  },
  async delete(req) {
    await User.findByIdAndDelete(req.params.id);
    return null;
  },
  async update(req) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return user;
  },
});
