import * as modr from '../../utils/modr';
import Extensions from '../../models/Extensions';
import StatementObject from '../../models/StatementObject';
import SubStatementObject from '../../models/SubStatementObject';
import { mapKeys } from 'lodash';

const replaceDotsInExtensions = (searchValue: RegExp, replaceValue: string) => {
  return modr.modifyType(Object, (extensions: Extensions) => {
    return mapKeys(extensions, (_value: any, key: string) => {
      return key.replace(searchValue, replaceValue);
    });
  });
};

const replaceDotsInParent = (searchValue: RegExp, replaceValue: string) => {
  return modr.modifySchema({
    extensions: replaceDotsInExtensions(searchValue, replaceValue),
  });
};

const replaceDotsInActivity = (searchValue: RegExp, replaceValue: string) => {
  return modr.modifySchema({
    definition: replaceDotsInParent(searchValue, replaceValue),
  });
};

const replaceDotsInActivities = (searchValue: RegExp, replaceValue: string) => {
  return modr.modifyCollection(() => replaceDotsInActivity(searchValue, replaceValue));
};

const replaceDotsInObject = (searchValue: RegExp, replaceValue: string) => {
  return (data: StatementObject|SubStatementObject): StatementObject|SubStatementObject => {
    if (data.objectType === 'Activity') {
      return replaceDotsInActivity(searchValue, replaceValue)(data);
    }
    if (data.objectType === 'SubStatement') {
      return replaceDotsInStatement(searchValue, replaceValue)(data);
    }
    return data;
  };
};

const replaceDotsInContext = (searchValue: RegExp, replaceValue: string) => {
  return modr.modifySchema({
    contextActivities: modr.modifySchema({
      category: replaceDotsInActivities(searchValue, replaceValue),
      grouping: replaceDotsInActivities(searchValue, replaceValue),
      parent: replaceDotsInActivities(searchValue, replaceValue),
      other: replaceDotsInActivities(searchValue, replaceValue),
    }),
    extensions: replaceDotsInExtensions(searchValue, replaceValue),
  });
};

const replaceDotsInStatement = (searchValue: RegExp, replaceValue: string) => {
  return modr.modifySchema({
    object: replaceDotsInObject(searchValue, replaceValue),
    context: replaceDotsInContext(searchValue, replaceValue),
    result: replaceDotsInParent(searchValue, replaceValue)
  });
};

export const encodeDotsInStatement = replaceDotsInStatement(/\./g, '&46;');
export const decodeDotsInStatement = replaceDotsInStatement(/&46;/g, '.');
