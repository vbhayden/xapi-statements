import { Service } from '../../../service';
import GetStatementsOptions from '../../../service/options/GetStatementsOptions';

type FilteredStatementsAsserter = (service: Service) =>
  (opts: GetStatementsOptions, expectedIds: string[]) =>
    Promise<void>;

export default FilteredStatementsAsserter;
