import 'mocha';
import Service from '../../serviceFactory/Service';
import service from '../../tester';

export default (): Service => {
  before(async () => {
    await service.rollback();
    await service.migrate();
  });

  beforeEach(async () => {
    await service.clearService();
  });

  return service;
};
