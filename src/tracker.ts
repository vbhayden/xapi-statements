import Tracker from 'jscommons/dist/tracker/Tracker';
import fakeTracker from 'jscommons/dist/tracker/fake';

/* istanbul ignore next */
export default async (): Promise<Tracker> => {
  return fakeTracker;
};
