import { config } from 'dotenv';
config();

export default {
  llClientInfoEndpoint: process.env.LL_CLIENT_INFO_ENDPOINT,
  logLevel: process.env.LOG_MIN_LEVEL || 'info',
  defaultTimeout: process.env.DEFAULT_TIMEOUT_MS || 300000,
  express: {
    port: Number(process.env.EXPRESS_PORT) || 80,
    customRoute: process.env.EXPRESS_CUSTOM_ROUTE || 'status',
    customRouteText: process.env.EXPRESS_CUSTOM_ROUTE_TEXT || 'ok',
    morganDirectory: process.env.EXPRESS_MORGAN_DIRECTORY || `${process.cwd()}/logs/access`,
    bodyParserLimit: process.env.EXPRESS_BODY_PARSER_LIMIT || '5mb',
  },
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/xapiserver'
  },
  testing: {
    repo: process.env.TESTING_REPO || 'memory',
  },
  production: {
    repo: process.env.PRODUCTION_REPO || 'mongo',
  },
};
