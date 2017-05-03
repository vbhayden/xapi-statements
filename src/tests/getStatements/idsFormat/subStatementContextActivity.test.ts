import createSubStatementContext from '../../utils/createSubStatementContext';
import activityFormatTest from './utils/activityFormatTest';

describe('get ids statements in sub statement parent contextActivities', () => {
  activityFormatTest((activity: any): any => {
    return createSubStatementContext({ parent: [activity] });
  });
});

describe('get ids statements in sub statement grouping contextActivities', () => {
  activityFormatTest((activity: any): any => {
    return createSubStatementContext({ grouping: [activity] });
  });
});

describe('get ids statements in sub statement category contextActivities', () => {
  activityFormatTest((activity: any): any => {
    return createSubStatementContext({ category: [activity] });
  });
});

describe('get ids statements in sub statement other contextActivities', () => {
  activityFormatTest((activity: any): any => {
    return createSubStatementContext({ other: [activity] });
  });
});
