import * as Storage from '@google-cloud/storage';
import * as S3 from 'aws-sdk/clients/s3';
import googleFactory from './utils/googleStorage/factory';
import localFactory from './utils/localStorage/factory';
import s3Factory from './utils/s3Storage/factory';
import Facade from './Facade';
import FactoryConfig from './FactoryConfig';

export default (config: FactoryConfig): Facade => {
  switch (config.facade) {
    case 's3':
      return s3Factory(config.s3);
    case 'google':
      return googleFactory(config.google);
    case 'local': default:
      return localFactory(config.local);
  }
};
