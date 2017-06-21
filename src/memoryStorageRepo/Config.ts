import AttachmentModel from '../models/AttachmentModel';

interface State {
  attachments: AttachmentModel[];
}

interface Config {
  state: State;
}

export default Config;
