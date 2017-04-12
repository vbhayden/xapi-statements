import 'mocha';
import { Service } from '../../service';
import service from '../../tester';

export default (): Service => {
  beforeEach(async () => {
    await service.rollback();
    await service.migrate();
  });

  afterEach(async () => {
    await service.clearService();
  });

  return service;
};
