import Verb from '../../../models/Verb';
import IdFormattedVerb from '../../../models/IdFormattedVerb';

export default (verb: Verb): IdFormattedVerb => {
  return {
    id: verb.id,
  };
};
