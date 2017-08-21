import { parse } from 'url';
import { defaultTo } from 'lodash';
import { Request } from 'express';

export default (req: Request) => defaultTo<string>(parse(req.originalUrl).pathname, '/');
