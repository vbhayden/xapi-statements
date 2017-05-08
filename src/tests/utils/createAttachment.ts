import createSha from './createSha';

export default (content: string): any => {
  return {
    usageType: 'http://www.example.com',
    display: {},
    contentType: 'text/plain',
    length: 0,
    sha2: createSha(content),
  };
};
