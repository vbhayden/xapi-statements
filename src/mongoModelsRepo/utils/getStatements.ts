import Config from '../Config';

interface Options {
  config: Config;
  query: Object;
  project: Object;
}

export default async ({ config, query, project }: Options) => {
  const collection = (await config.db).collection('statements');
  const results = await collection.find(query).project(project).toArray();
  return results;
};
