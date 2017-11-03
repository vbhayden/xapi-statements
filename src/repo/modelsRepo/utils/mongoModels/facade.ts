import commonMongoRepo from 'jscommons/dist/mongoRepo';
import Repo from '../../Repo';
import Config from './Config';
import createStatements from '../../createStatements/mongo';
import getFullActivity from '../../getFullActivity/mongo';
import getHashes from '../../getHashes/mongo';
import getStatement from '../../getStatement/mongo';
import getStatements from '../../getStatements/mongo';
import getVoidersByObjectIds from '../../getVoidersByObjectIds/mongo';
import getVoidersByIds from '../../getVoidersByIds/mongo';
import voidStatements from '../../voidStatements/mongo';
import getDownRefId from '../../getDownRefId/mongo';
import getUpRefIds from '../../getUpRefIds/mongo';
import setRefs from '../../setRefs/mongo';
import getStatementsByIds from '../../getStatementsByIds/mongo';
import getUpRefsByIds from '../../getUpRefsByIds/mongo';
import updateFullActivities from '../../updateFullActivities/mongo';
import incrementStoreCount from '../../incrementStoreCount/mongo';

export default (config: Config): Repo => {
  return {
    ...commonMongoRepo(config),
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
    incrementStoreCount: incrementStoreCount(config),
  };
};
