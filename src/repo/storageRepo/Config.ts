import * as S3 from 'aws-sdk/clients/s3';
import LocalConfig from './utils/localStorage/Config';
import S3Config from './utils/s3Storage/Config';

export default interface Config {
  readonly facade: string;
  readonly local: LocalConfig;
  readonly s3: {
    readonly bucketName: string;
    readonly subFolder: string;
    readonly awsConfig: S3.ClientConfiguration;
  };
}
