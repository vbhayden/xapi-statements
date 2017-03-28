import Actor from '../models/Actor';

interface GetStatementsOptions {
  agent?: Actor;
  activity?: string;
  verb?: string;
  relatedAgents?: boolean;
  relatedActivities?: boolean;
  registration?: string;
  since?: Date;
  until?: Date;
  ascending: boolean;
  limit?: number;
}

export default GetStatementsOptions;
