import * as modr from '../utils/modr';

const wrapObjectInArray = modr.modifyType(Object, (data) => {
  return [data];
});

export default (models: any[], authority: any): any[] => {
  return models.map((model) => {
    const setup = modr.modifySchema({
      authority: modr.overrideValue(authority),
      context: modr.modifySchema({
        contextActivities: modr.modifySchema({
          parent: wrapObjectInArray,
          grouping: wrapObjectInArray,
          category: wrapObjectInArray,
          other: wrapObjectInArray,
        }),
      }),
    });
    const setupModel = setup(model);
    return setupModel;
  });
};
