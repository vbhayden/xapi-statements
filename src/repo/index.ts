import MemoryRepoConfig from '../memoryRepo/Config';
import memoryRepo from '../memoryRepo';
import StatementModel from '../models/StatementModel';
import CreateStatementsOptions from './CreateStatementsOptions';
import GetStatementsOptions from './GetStatementsOptions';
import GetStatementOptions from './GetStatementOptions';
import GetVoiderOptions from './GetVoiderOptions';
import VoidStatementsOptions from './VoidStatementsOptions';

interface RepoConfig {
  repoName: string;
  memoryRepoConfig: MemoryRepoConfig;
}

export interface Repo {
  // Statement functions.
  createStatements: (opts: CreateStatementsOptions) => Promise<StatementModel[]>;
  getStatement: (opts: GetStatementOptions) => Promise<StatementModel>;
  getStatements: (opts: GetStatementsOptions) => Promise<StatementModel[]>;
  getVoider: (opts: GetVoiderOptions) => Promise<StatementModel>;
  voidStatements: (opts: VoidStatementsOptions) => Promise<void>;

  // Repo-wide functions.
  clearRepo: () => Promise<void>;
  migrate: () => Promise<void>;
  rollback: () => Promise<void>;
}

export default (config: RepoConfig): Repo => {
  switch (config.repoName) {
    default: case 'memory':
      return memoryRepo(config.memoryRepoConfig);
  }
};
