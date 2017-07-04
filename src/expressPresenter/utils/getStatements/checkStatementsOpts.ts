import QueryOptions from '../../../errors/QueryOptions';

export default (opts: { [key: string]: any }): void => {
  const setOpts = Object.keys(opts).filter((opt: string) => {
    return opts[opt] !== undefined;
  });
  const hasOpts = setOpts.length !== 0;

  if (hasOpts) {
    throw new QueryOptions(setOpts);
  }
};
