import CommonTranslator from 'jscommons/dist/translator';
import QueryIds from '../errors/QueryIds';
import QueryOptions from '../errors/QueryOptions';
import Forbidden from '../errors/Forbidden';

interface Translator extends CommonTranslator {
  readonly queryIdsError: (err: QueryIds) => string;
  readonly queryOptionsError: (err: QueryOptions) => string;
  readonly forbiddenError: (err: Forbidden) => string;
}

export default Translator;
