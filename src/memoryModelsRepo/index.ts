import commonMemoryRepo from 'jscommons/dist/memoryRepo';
import ModelsRepo from '../repoFactory/ModelsRepo';
import Config from './Config';
import createStatements from './createStatements';
import getFullActivity from './getFullActivity';
import getHashes from './getHashes';
import getStatement from './getStatement';
import getStatements from './getStatements';
import getVoidersByObjectIds from './getVoidersByObjectIds';
import getVoidersByIds from './getVoidersByIds';
import voidStatements from './voidStatements';
import getDownRefId from './getDownRefId';
import getUpRefIds from './getUpRefIds';
import setRefs from './setRefs';
import getStatementsByIds from './getStatementsByIds';
import getUpRefsByIds from './getUpRefsByIds';
import updateFullActivities from './updateFullActivities';

export default (config: Config): ModelsRepo => {
  return {
    createStatements: createStatements(config),
    getFullActivity: getFullActivity(config),
    getHashes: getHashes(config),
    getStatement: getStatement(config),
    getStatements: getStatements(config),
    getVoidersByObjectIds: getVoidersByObjectIds(config),
    getVoidersByIds: getVoidersByIds(config),
    voidStatements: voidStatements(config),
    getDownRefId: getDownRefId(config),
    getUpRefIds: getUpRefIds(config),
    setRefs: setRefs(config),
    getStatementsByIds: getStatementsByIds(config),
    getUpRefsByIds: getUpRefsByIds(config),
    updateFullActivities: updateFullActivities(config),
    ...commonMemoryRepo(config),
  };
};
