import { Router } from 'express';
import mixinCors from './mixins/cors';
import mixinBodyParser from './mixins/bodyParser';
import mixinHelmet from './mixins/helmet';
import mixinMorgan from './mixins/morgan';
import handleCustomRoute from './handleCustomRoute';
import getAbout from './getAbout';
import getDemoAuth from './getDemoAuth';
import getStatements from './getStatements';
import storeStatements from './storeStatements';
import Config from './Config';

export default (config: Config): Router => {
  const router = Router();

  router.use(mixinCors());
  router.use(mixinBodyParser(config.bodyParserLimit));
  router.use(mixinHelmet());
  router.use(mixinMorgan(config.morganDirectory));

  router.get('/auth', getDemoAuth(config));
  router.get(`/${config.customRoute}`, handleCustomRoute(config));
  router.get('/xAPI/about', getAbout(config));
  router.get('/xAPI/statements', getStatements(config));
  router.put('/xAPI/statements', () => { });
  router.post('/xAPI/statements', storeStatements(config));
  return router;
};
