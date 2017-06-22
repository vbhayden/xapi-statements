import { S3 } from 'aws-sdk';

interface Config {
  client: S3;
  bucketName: string,
  subFolder: string,
}

export default Config;
