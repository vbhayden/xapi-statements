import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import * as express from 'express';
import translatorFactory from './translatorFactory';
import serviceFactory from './serviceFactory';
import presenter from './expressPresenter';
import config from './config';
import { aboutRoute, fullActivitiesRoute, statementsRoute } from './utils/constants';
import logger from './logger';
import tracker from './tracker';

const app = express();

const translator = translatorFactory();
const serviceFacade = serviceFactory();
const presenterFacade = presenter({
  llClientInfoEndpoint: config.llClientInfoEndpoint,
  customRoute: config.express.customRoute,
  customRouteText: config.express.customRouteText,
  morganDirectory: config.express.morganDirectory,
  bodyParserLimit: config.express.bodyParserLimit,
  service: serviceFacade,
  tracker,
  translator,
  logger,
});

const handleExit = (event: string) => {
  return (error?: any) => {
    if (error) logger.error(error.stack);
    logger.info(event);
    process.exit();
  };
};

app.use(aboutRoute, presenterFacade.aboutRouter);
app.use(fullActivitiesRoute, presenterFacade.fullActivitiesRouter);
app.use(statementsRoute, presenterFacade.statementsRouter);

app.listen(config.express.port, () => {
  logger.info(`Listening on port ${config.express.port}`);
  if (process.send) {
    logger.info('Process ready');
    process.send('ready');
  }
  if (process.on) {
    process.on('exit', handleExit('exit'));
    process.on('SIGINT', handleExit('SIGINT'));
    process.on('SIGTERM', handleExit('SIGTERM'));
    process.on('uncaughtException', handleExit('uncaughtException'));
  }
});
