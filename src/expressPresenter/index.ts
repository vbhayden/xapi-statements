import commonExpressPresenter from 'jscommons/dist/expressPresenter';
import { Router } from 'express';
import getAbout from './getAbout';
import getDemoAuth from './getDemoAuth';
import getFullActivity from './getFullActivity';
import getStatements from './getStatements';
import postStatements from './postStatements';
import putStatement from './putStatement';
import Config from './Config';

export default (config: Config): Router => {
  const router = commonExpressPresenter(config);
  router.get('/auth', getDemoAuth(config));
  router.get('/xAPI/about', getAbout(config));
  router.get('/xAPI/activities', getFullActivity(config));
  router.get('/xAPI/statements', getStatements(config));
  router.put('/xAPI/statements', putStatement(config));
  router.post('/xAPI/statements', postStatements(config));
  return router;
};
