import CommonExpressConfig from 'jscommons/dist/expressPresenter/Config';
import { Service } from '../service';
import Translator from '../translator';

interface Config extends CommonExpressConfig {
  llClientInfoEndpoint: string;
  service: Service;
  translator: Translator;
}

export default Config;
