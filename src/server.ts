import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import * as express from 'express';
import repo from './repo';
import expressFace from './expressFace';
import service from './service';
import config from './config';
import logger from './logger';

const app = express();

const repoFacade = repo({
  repoName: config.production.repo,
  memoryRepoConfig: {
    state: {
      statements: [],
      attachments: [],
    },
  },
});
const serviceFacade = service({
  defaultTimeout: 1000,
  repo: repoFacade,
  enableConflictChecks: true,
  enableAttachmentValidation: true,
  enableVoidingChecks: true,
  enableStatementCreation: true,
  enableAttachmentCreation: true,
  enableVoiding: true,
  enableReferencing: true,
  awaitUpdates: true,
});
const faceFacade = expressFace({
  llClientInfoEndpoint: config.llClientInfoEndpoint,
  customRoute: config.express.customRoute,
  customRouteText: config.express.customRouteText,
  morganDirectory: config.express.morganDirectory,
  bodyParserLimit: config.express.bodyParserLimit,
  service: serviceFacade,
});

const handleExit = (event: string) => {
  process.on(event, function (error?: any) {
    if (error) logger.error(error.stack);
    logger.info(event);
    process.exit();
  });
};

app.use(faceFacade);

app.listen(config.express.port, () => {
  logger.info(`Listening on port ${config.express.port}`);
  if (process.send) {
    logger.info('Process ready');
    process.send('ready');
  }
  if (process.on) {
    handleExit('exit');
    handleExit('SIGINT');
    handleExit('SIGTERM');
    handleExit('uncaughtException');
  }
});
