import { body } from 'express-validator';
import { errors } from '../../../utils/system';
import { Validator } from '../../validator';

export default [
    body('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage(errors.REQUIRED_USERNAME)
        .isLength({ max: 255 })
        .withMessage(errors.USERNAME_MAX_255),
    body('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage(errors.PASSWORD_REQUIRED)
        .isLength({ min: 6 })
        .withMessage(errors.PASSWORD_MIN_LENGTH_6_ERROR)
        .isLength({ max: 255 })
        .withMessage(errors.PASSWORD_MAX_255_ERROR),
    Validator.check()
];
