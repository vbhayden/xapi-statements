import 'mocha';
import { Service } from '../../service';

export default (service: Service): void => {
  beforeEach(async () => {
    await service.rollback();
    await service.migrate();
  });

  afterEach(async () => {
    await service.clearService();
  });
};
