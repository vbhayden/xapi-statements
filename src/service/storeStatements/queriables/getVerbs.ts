export default (statement: any, basePath: string = ''): string[] => {
  const key = `${basePath}statement.verb.id`;
  return statement[key] ? statement[key] : [];
};
