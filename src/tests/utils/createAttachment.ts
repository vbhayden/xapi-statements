import createSha from './createSha';

export default (content: string, fileUrl?: string): any => {
  return {
    usageType: 'http://www.example.com',
    display: {},
    contentType: 'text/plain',
    length: 0,
    sha2: createSha(content),
    ...(
      fileUrl === undefined ? {} :
      { fileUrl }
    ),
  };
};
