import { Router } from 'express';
import mixinCors from './mixins/cors';
import mixinBodyParser from './mixins/bodyParser';
import mixinHelmet from './mixins/helmet';
import mixinMorgan from './mixins/morgan';
import mixinAttachments from './mixins/attachments';
import catchErrors from './utils/catchErrors';
import customHandler from './utils/customHandler';
// import defaultAuthenticator from './utils/authenticator';
import demoAuth from './auth';

interface Config {
  llClientInfoEndpoint: string;
  customRoute: string;
  customRouteText: string;
  morganDirectory: string;
  bodyParserLimit: string;
  service: any;
}

export default (config: Config): Router => {
  const router = Router();

  router.use(mixinCors());
  router.use(mixinBodyParser(config.bodyParserLimit));
  router.use(mixinHelmet());
  router.use(mixinMorgan(config.morganDirectory));
  router.use(mixinAttachments());

  router.get('/auth', catchErrors(demoAuth));
  router.get(`/${config.customRoute}`, catchErrors(customHandler(config.customRouteText)));
  router.get('/xAPI/statements', () => {});
  router.put('/xAPI/statements', () => {});
  router.post('/xAPI/statements', () => {});
  return router;
};
