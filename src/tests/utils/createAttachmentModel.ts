import createSha from './createSha';

export default (content: string): any => {
  return {
    content,
    contentType: 'text/plain',
    hash: createSha(content),
  };
};
