import * as stringToStream from 'string-to-stream';
import createSha from './createSha';

export default (content: string): any => {
  return {
    stream: stringToStream(content),
    hash: createSha(content),
  };
};
