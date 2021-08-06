'use strict';

import { logger, handleExceptionResponse, jsonError } from '../utils/system';
import { textAttrs } from '../core/boot';

const requestLogger = () => {
    return (req, res, next) => {
        if (['GET', 'POST', 'PUT', 'DELETE'].indexOf(req.method) >= 0) logger.verbose(req.url, req.body);
        next();
    };
};

/** Check max length string attributes 255 of body*/
const checkMaxLengthBody = () => {
    return (req, res, next) => {
        try {
            if (req.body) {
                let keys = Object.keys(req.body);
                for (let i = 0; i < keys.length; i++) {
                    if (!textAttrs.includes(keys[i]) && req.body[keys[i]] && req.body[keys[i]].length > 255) {
                        return res.json(jsonError({ code: `${keys[i].toUpperCase()}_MAX_255_ERROR` }));
                    }
                }
            }
            return next();
        } catch (error) {
            handleExceptionResponse(res, 'ERRORS_CHECK_MAX_LENGTH_BODY_MIDDLEWARE', error);
        }
    };
};

const regulators = [requestLogger(), checkMaxLengthBody()];

export { regulators };
