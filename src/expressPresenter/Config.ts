import { Service } from '../service';

interface Config {
  llClientInfoEndpoint: string;
  customRoute: string;
  customRouteText: string;
  morganDirectory: string;
  bodyParserLimit: string;
  service: Service;
}

export default Config;
