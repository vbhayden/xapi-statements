import createStatement from '../../utils/createStatement';
import setupIdsTest from './setupIdsTest';

const createIdsActivity = (id: any): any => {
  return {
    objectType: 'Activity',
    id,
  };
};

const createExactActivity = (id: any): any => {
  return {
    definition: {},
    ...createIdsActivity(id),
  };
};

export default (createActivityStatement: (activity: any) => any) => {
  const assertIdsStatements = setupIdsTest();

  const assertIdsActivity = async (id: any) => {
    const exactStatement = createStatement(createActivityStatement(createExactActivity(id)));
    const expectedStatement = createStatement(createActivityStatement(createIdsActivity(id)));
    await assertIdsStatements(exactStatement, expectedStatement);
  };

  it('should return the id and objectType without the definition', async () => {
    await assertIdsActivity('http://www.example.com/object');
  });
};
