import AttachmentModel from '../models/AttachmentModel';
import StatementModel from '../models/StatementModel';

interface State {
  attachments: AttachmentModel[];
  statements: StatementModel[];
}

interface Config {
  state: State;
}

export default Config;
