import Koa from 'koa';
import exampleRouter from './components/example/exampleRouter';

const routes = (server: Koa) => {
  server.use(exampleRouter.allowedMethods());
  server.use(exampleRouter.routes());
};

export default routes;
