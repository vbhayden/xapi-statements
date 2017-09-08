import { pickBy, isUndefined } from 'lodash';

const not = <V>(f: (value: V) => boolean) => (v: V): boolean => !f(v);

export default <T>(obj: T) => pickBy<T, T>(obj, not(isUndefined));
