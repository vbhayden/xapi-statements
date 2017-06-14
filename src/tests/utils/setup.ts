import 'mocha';
import { Service } from '../../service';
import service from '../../tester';

export default (): Service => {
  before(async () => {
    await service.rollback();
    await service.migrate();
    await service.clearService();
  });

  afterEach(async () => {
    await service.clearService();
  });

  return service;
};
