import productRoute from './product';
import userRoute from './user';

export default (server) => {
  server.use('/api/v1/products', productRoute());
  server.use('/api/v1/users', userRoute());
};
