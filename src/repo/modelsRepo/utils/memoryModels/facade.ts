import commonMemoryRepo from 'jscommons/dist/memoryRepo';
import Repo from '../../Repo';
import Config from './Config';
import createStatements from '../../createStatements/memory';
import getFullActivity from '../../getFullActivity/memory';
import getHashes from '../../getHashes/memory';
import getStatement from '../../getStatement/memory';
import getStatements from '../../getStatements/memory';
import getVoidersByObjectIds from '../../getVoidersByObjectIds/memory';
import getVoidersByIds from '../../getVoidersByIds/memory';
import voidStatements from '../../voidStatements/memory';
import getDownRefId from '../../getDownRefId/memory';
import getUpRefIds from '../../getUpRefIds/memory';
import setQueriables from '../../setQueriables/memory';
import getStatementsByIds from '../../getStatementsByIds/memory';
import getUpRefsByIds from '../../getUpRefsByIds/memory';
import updateFullActivities from '../../updateFullActivities/memory';
import incrementStoreCount from '../../incrementStoreCount/memory';

export default (config: Config): Repo => {
  return {
    ...commonMemoryRepo(config),
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
    setQueriables: setQueriables(config),
    getStatementsByIds: getStatementsByIds(config),
    getUpRefsByIds: getUpRefsByIds(config),
    updateFullActivities: updateFullActivities(config),
    incrementStoreCount: incrementStoreCount(config),
  };
};
