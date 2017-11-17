import Tracker from 'jscommons/dist/tracker/Tracker';
import fakeTracker from 'jscommons/dist/tracker/fake';

/* istanbul ignore next */
const trackerFactory = async (): Promise<Tracker> => {
  return fakeTracker;
};

export default trackerFactory();
