import * as bodyParser from 'body-parser';

export default (limit: string) => {
  return bodyParser.json({
    type: 'application/json',
    limit
  });
};
