'use strict';
import { errors, jsonError, handleExceptionResponse } from '../../utils/system';
import { User } from '../../models/schema/User';
import { Jwt } from '../../utils/jwt';

/**
 * isExistedAdmin middleware used for checking admin existed
 */
export const isExistedAdmin = () => {
    return async (req, res, next) => {
        try {
            const { username } = req.body;

            const user = await User.findOne({
                where: {
                    username,
                    deleted: false
                }
            });

            if (!user) {
                return res.json(jsonError(errors.USER_NOT_FOUND));
            }

            req.body.user = user;
            return next();
        } catch (error) {
            handleExceptionResponse(res, 'ERRORS_ADMIN_POLICIES_IS_EXISTED_ADMIN_MIDDLEWARE', error);
        }
    };
};

export const authenticated = () => {
    return async (req, res, next) => {
        try {
            const authorization = req.header('Authorization');

            if (!authorization) {
                return res.json(jsonError(errors.NOT_AUTHENTICATED_ERROR));
            }

            // Decode token
            const decoded = await Jwt.verify(authorization);
            if (!decoded.success) {
                return res.json(decoded);
            }

            req.user = decoded.result;
            return next();
        } catch (error) {
            handleExceptionResponse(res, 'ERRORS_ADMIN_POLICIES_AUTHENTICATED_MIDDLEWARE', error);
        }
    };
};
