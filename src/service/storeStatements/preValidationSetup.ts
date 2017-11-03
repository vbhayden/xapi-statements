import * as modr from '../../utils/modr';
import removeNulls from './removeNulls';
import Config from '../Config';

const wrapObjectInArray = modr.modifyType(Object, (data) => {
  return [data];
});

const modifyContext = modr.modifySchema({
  contextActivities: modr.modifySchema({
    parent: wrapObjectInArray,
    grouping: wrapObjectInArray,
    category: wrapObjectInArray,
    other: wrapObjectInArray,
  }),
});

const modifySubStatement = modr.modifySchema({
  context: modifyContext,
});

export default (config: Config, models: any[]): any[] => {
  return models.map((model) => {
    const setup = modr.composeModifiers([
      removeNulls(config),
      modr.modifySchema({
        context: modifyContext,
        object: modr.modifyType(Object, (data) => {
          return (
            data.objectType === 'SubStatement'
              ? modifySubStatement(data)
              : data
          );
        })
      })
    ]);
    const setupModel = setup(model);
    return setupModel;
  });
};
