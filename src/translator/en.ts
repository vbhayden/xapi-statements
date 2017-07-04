import commonTranslator from 'jscommons/dist/translator/en';
import Translator from './index';

const translator: Translator = {
  queryIdsError: () => '',
  queryOptionsError: () => '',
  forbiddenError: () => '',
  ...commonTranslator,
};

export default translator;
