import * as assert from 'assert';

export default (expectedConstructor: any) => {
  return (promise: Promise<any>): Promise<void> => {
    return promise.then(() => {
      assert(false, 'Expected an error to be thrown');
    }, (err) => {
      const actualConstructor = err.constructor;
      assert.equal(actualConstructor, expectedConstructor);
    });
  };
};
