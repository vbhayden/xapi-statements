import { isArray } from 'lodash';
import setupDefaultObjectType from './setupDefaultObjectType'

export default (defaultObjectType: string, objs: any): any => {
  return isArray(objs) ? objs.map((obj: any) => {
    return setupDefaultObjectType(defaultObjectType, obj);
  }) : objs;
};
