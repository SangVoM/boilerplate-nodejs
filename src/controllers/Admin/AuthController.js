import { handleExceptionResponse } from '../../utils/system';
import AuthService from '../../services/Admin/AuthService';
import { isExistedAdmin, authenticated } from '../../middleware/Admin/policies';

/** import validator */
import loginValidator from '../../validations/api/Admin/loginValidator';

const AuthController = require('express').Router();
AuthController.base = 'auth';

/**
 * @description Login with email or username and password
 * @param {String} email
 * @param {String} password
 */
AuthController.post('/login', [loginValidator, isExistedAdmin()], async (req, res) => {
    try {
        const result = await AuthService.login(req.body);
        res.json(result);
    } catch (error) {
        handleExceptionResponse(res, 'ERRORS_ADMIN_LOGIN_API', error);
    }
});

AuthController.get('/getInfo', [authenticated()], async (req, res) => {
    try {
        const result = await AuthService.getInfo(req.user);
        res.json(result);
    } catch (error) {
        handleExceptionResponse(res, 'ERRORS_GET_INFO_API', error);
    }
});

export { AuthController };
