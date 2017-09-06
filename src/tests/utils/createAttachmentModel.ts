import * as stringToStream from 'string-to-stream';
import createSha from './createSha';

export default (content: string, contentType: string = 'text/plain'): any => {
  return {
    stream: stringToStream(content),
    hash: createSha(content),
    contentType,
  };
};
