import Service from '../../../serviceFactory/Service';
import GetStatementsOptions from '../../../serviceFactory/options/GetStatementsOptions';

type FilteredStatementsAsserter = (service: Service) =>
  (opts: GetStatementsOptions, expectedIds: string[]) =>
    Promise<void>;

export default FilteredStatementsAsserter;
