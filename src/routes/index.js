import productRoute from './product';

export default (server) => {
  server.use('/api/v1/products', productRoute());
};
