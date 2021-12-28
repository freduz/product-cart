import userService from '../services/user';
import catchAsync from '../helpers/catchAsync';

export const createUser = catchAsync(async (req, res) => {
  const user = await userService().create(req);
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const getUser = catchAsync(async (req, res) => {
  const user = await userService().getOne(req);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const getAllUser = catchAsync(async (req, res) => {
  const users = await userService().getAll();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});
export const updateUser = catchAsync(async (req, res) => {
  const user = await userService().update(req);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  await userService().delete(req);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
