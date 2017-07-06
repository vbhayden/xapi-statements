import Actor from '../../models/Actor';
import ClientModel from '../../models/ClientModel';
import { ALL } from '../../utils/scopes';

const DEFAULT_AUTHORITY: Actor = {
  objectType: 'Agent',
  mbox: 'mailto:authority@example.com',
};

export default (overrides: Partial<ClientModel> = {}): ClientModel => {
  return {
    _id: 'test_id',
    title: 'test_title',
    organisation: 'test_organisation',
    lrs_id: 'test_lrs_id',
    api: {
      basic_key: 'test_basic_key',
      basic_secret: 'test_basic_secret',
    },
    authority: DEFAULT_AUTHORITY,
    isTrusted: true,
    scopes: [ALL],
    ...overrides
  };
};
