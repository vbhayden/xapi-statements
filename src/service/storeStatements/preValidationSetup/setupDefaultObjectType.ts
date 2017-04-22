import { isPlainObject } from 'lodash';

export default (defaultObjectType: string, obj: any): any => {
  return !isPlainObject(obj) ? obj : {
    objectType: (
      obj.objectType !== undefined ? obj.objectType : defaultObjectType
    ),
    ...obj,
  };
};
