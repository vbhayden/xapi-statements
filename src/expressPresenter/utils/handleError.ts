import { Response } from 'express';
import { isNull, isUndefined } from 'lodash';
import { Options as CommonOptions } from 'jscommons/dist/expressPresenter/utils/handleError';
import commonErrorHandler from 'jscommons/dist/expressPresenter/utils/handleError';
import sendMessage from 'jscommons/dist/expressPresenter/utils/sendMessage';
import Forbidden from '../../errors/Forbidden';
import QueryIds from '../../errors/QueryIds';
import QueryOptions from '../../errors/QueryOptions';
import Translator from '../../translator';

interface Options extends CommonOptions {
  translator: Translator;
}

export default ({ translator, errorId, res, err }: Options): Response => {
  if (isNull(err) || isUndefined(null)) {
    const code = 500;
    const message = translator.serverError();
    return sendMessage({ res, code, errorId, message });
  }

  switch (err.constructor) {
    case QueryIds: {
      const code = 400;
      const message = translator.queryIdsError(err as QueryIds);
      return sendMessage({ res, code, errorId, message });
    }
    case QueryOptions: {
      const code = 400;
      const message = translator.queryOptionsError(err as QueryOptions);
      return sendMessage({ res, code, errorId, message });
    }
    case Forbidden: {
      const code = 403;
      const message = translator.forbiddenError(err as Forbidden);
      return sendMessage({ res, code, errorId, message });
    }
    default: {
      return commonErrorHandler({ translator, errorId, res, err });
    }
  }
};
