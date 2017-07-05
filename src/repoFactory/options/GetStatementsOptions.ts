import ClientModel from '../../models/ClientModel';
import FilterAgent from '../../models/FilterAgent';

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
  client: ClientModel;
  cursor?: string;
}

export default GetStatementsOptions;
