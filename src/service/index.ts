import { Repo } from '../repo';

interface ServiceConfig {
  defaultTimeout: number;
  repo: Repo;
}

export interface Service {
  clearService: () => Promise<void>;
  migrate: () => Promise<void>;
  rollback: () => Promise<void>;
}

export default ({ repo }: ServiceConfig): Service => {
  return {
    clearService: repo.clearRepo,
    migrate: repo.migrate,
    rollback: repo.rollback,
  };
};
