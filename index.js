import server from './config/server';
import { PORT } from './config/env';

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
