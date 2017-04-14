import FilterAgent from '../models/FilterAgent';

interface GetStatementsOptions {
  agent?: FilterAgent;
  activity?: string;
  verb?: string;
  relatedAgents?: boolean;
  relatedActivities?: boolean;
  registration?: string;
  since?: string;
  until?: string;
  ascending: boolean;
  limit?: number;
  skip?: number;
}

export default GetStatementsOptions;
