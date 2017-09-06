import { extension } from 'mime-types';

export default (contentType: string) => {
  try {
    const ext = extension(contentType);
    return ext;
  } catch (err) {
    return 'bin';
  }
};
