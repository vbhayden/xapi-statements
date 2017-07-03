import { Readable as ReadableStream } from 'stream';
import { trim } from 'lodash';

const trimmedChars = `\r\n\s`;

export default async (stream: ReadableStream): Promise<string> => {
  let data = '';

  await new Promise((resolve, reject) => {
    stream.on('data', (chunk: string) => {
      data += chunk;
    });

    stream.on('end', () => {
      resolve();
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });

  const trimmedData = trim(data, trimmedChars);
  return trimmedData;
};
