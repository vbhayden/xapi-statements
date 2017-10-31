import config from './config';

export type Tracker = (name: string, value: any) => void;

/* istanbul ignore next */
export default async (): Promise<Tracker> => {
  if (config.tracker.newrelic.enabled === true) {
    const newrelic = require('newrelic');
    const tracker: Tracker = (name, value) => {
      newrelic.addCustomParameter(name, value);
    };
    return tracker;
  } else {
    const tracker: Tracker = () => {};
    return tracker;
  }
};
