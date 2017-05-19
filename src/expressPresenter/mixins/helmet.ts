import * as helmet from 'helmet';

export default () => {
  return helmet({
    frameguard: false
  });
};
