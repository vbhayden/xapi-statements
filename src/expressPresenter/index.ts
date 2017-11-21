import commonExpressPresenter from 'jscommons/dist/expressPresenter';
import { Router } from 'express';
import getAbout from './getAbout';
import getFullActivity from './getFullActivity';
import getStatements from './getStatements';
import postStatements from './postStatements';
import putStatement from './putStatement';
import Config from './Config';

export default (config: Config) => {
  const aboutRouter = commonExpressPresenter(config);
  aboutRouter.get('', getAbout(config));

  const fullActivitiesRouter = commonExpressPresenter(config);
  fullActivitiesRouter.get('', getFullActivity(config));

  const statementsRouter = commonExpressPresenter(config);
  statementsRouter.get('', getStatements(config));
  statementsRouter.put('', putStatement(config));
  statementsRouter.post('', postStatements(config));

  return { aboutRouter, fullActivitiesRouter, statementsRouter };
};
