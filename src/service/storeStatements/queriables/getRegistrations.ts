export default (statement: any, basePath: string = ''): string[] => {
  const key = `${basePath}statement.vregistration`;
  return statement[key] ? statement[key] : [];
};
