import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import Service from './serviceFactory/Service';
import serviceFactory from './serviceFactory';
const serviceFacade: Service = serviceFactory();
export default serviceFacade;
