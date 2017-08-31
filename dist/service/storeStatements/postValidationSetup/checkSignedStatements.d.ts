/// <reference types="lodash" />
import { Dictionary } from 'lodash';
import AttachmentModel from '../../../models/AttachmentModel';
import Statement from '../../../models/Statement';
declare const _default: (statement: Statement, uniqueHashAttachmentDictionary: Dictionary<AttachmentModel>) => Promise<void>;
export default _default;
