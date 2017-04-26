import * as modr from '../../utils/modr';

const wrapObjectInArray = modr.modifyType(Object, (data) => {
  return [data];
});

const context = modr.modifySchema({
  contextActivities: modr.modifySchema({
    parent: wrapObjectInArray,
    grouping: wrapObjectInArray,
    category: wrapObjectInArray,
    other: wrapObjectInArray,
  }),
});

export default (model: any) => {
  return modr.modifySchema({ context })(model);
};
