import Translator from './translator';
import en from './translator/en';

export default (): Translator => {
  return en;
};
