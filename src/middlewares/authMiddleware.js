import AppError from '../utils/AppError';
import { verifyToken } from '../helpers/jwt';
import catchAsync from '../helpers/catchAsync';
import User from '../models/User';

export const protectedRoute = catchAsync(async (req, _res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token)
    return next(new AppError(401, 'Please login to get access this route'));

  const decoded = await verifyToken(token);
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(401, 'The user belonging to the token is no longer exist')
    );
  }
  if (freshUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError(
        401,
        'User recently changed the password! please login again'
      )
    );
  }
  req.user = freshUser;
  next();
});
