import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import repoFactory from './repoFactory';
import service from './service';
import config from './config';

const repoFacade = repoFactory({
  repoName: config.testing.repo,
  memoryRepoConfig: {
    state: {
      statements: [],
      attachments: [],
    },
  },
  mongoRepoConfig: {
    url: config.mongo.url,
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

export default serviceFacade;
