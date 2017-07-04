import * as bodyParser from 'body-parser';

export default (limit: string) => {
  return bodyParser.urlencoded({
    type: 'application/x-www-form-urlencoded',
    extended: true,
    limit,
  });
};
