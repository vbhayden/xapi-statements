import * as FileStreamRotator from 'file-stream-rotator';
import * as morgan from 'morgan';

export default (morganDirectory: string) => {
  const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: `${morganDirectory}/access-%DATE%.log`,
    frequency: 'daily',
    verbose: false
  });
  morgan.token('query', req => JSON.stringify(req.query));
  return morgan(
    ':method :url :remote-addr :referrer :date :query :status',
    { stream: accessLogStream }
  );
};
