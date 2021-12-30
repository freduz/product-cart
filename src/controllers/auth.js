import catchAsync from '../helpers/catchAsync';
import authService from '../services/auth';

export const signUp = catchAsync(async (req, res) => {
  const userData = await authService().signUp(req);
  res.status(201).json({
    status: 'success',
    token: userData.token,
    data: {
      data: userData.user,
    },
  });
});

export const login = catchAsync(async (req, res) => {
  await authService().login(req);
});
