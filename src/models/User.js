import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'User must have a username'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email is provided',
    },
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Please provide the password'],
    select: false,
  },
  mobile: {
    type: String,
    validate: {
      validator(el) {
        return validator.isMobilePhone(el, 'en-IN');
      },
      message: 'Please provide the valid mobile number',
    },
    required: [true, 'Please provide the mobile number'],
  },
  countryCode: {
    type: String,
    required: [true, 'Please provide the country code'],
  },
  userImage: String,

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  passwordChangedAt: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkPassword = async function (
  plainPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.methods.passwordChangedAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }
};

export default mongoose.model('User', userSchema);
