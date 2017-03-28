import { Repo } from '../repo';

interface ServiceConfig {
  defaultTimeout: number;
  repo: Repo;
}

export default ({ repo }: ServiceConfig) => {
  return {
    migrate: repo.migrate,
    rollback: repo.rollback,
  };
};
