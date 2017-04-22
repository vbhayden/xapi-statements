import { isPlainObject } from 'lodash';
import setupDefaultObjectType from './setupDefaultObjectType';
import setupArrayObjectTypes from './setupArrayObjectTypes';

export default (defaultObjectType: string, obj: any) => {
  return !isPlainObject(obj) ? obj : {
    ...setupDefaultObjectType(defaultObjectType, obj),
    ...(
      obj.member === undefined ? {} :
      { member: setupArrayObjectTypes('Agent', obj.member) }
    ),
  };
};
