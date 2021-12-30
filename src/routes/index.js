import productRoute from './product';
import userRoute from './user';
import authRoute from './auth';

export default (server) => {
  server.use('/api/v1', authRoute());
  server.use('/api/v1/products', productRoute());
  server.use('/api/v1/users', userRoute());
};
