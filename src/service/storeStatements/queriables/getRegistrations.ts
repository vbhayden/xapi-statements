export default (statement: any, basePath: string = ''): string[] => {
  const key = `${basePath}statement.registration`;
  return statement[key] ? statement[key] : [];
};
