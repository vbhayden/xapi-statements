import * as cors from 'cors';

export default () => {
  return cors({
    origin: '*',
    preflightContinue: true
  });
};
