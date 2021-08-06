import jwt from 'jsonwebtoken';
import { jsonError, jsonSuccess, errors } from './system';

class Jwt {
    static sign(data) {
        return new Promise((resolve, reject) => {
            jwt.sign(data, getEnv('JWT_SECRET'), { expiresIn: getEnv('JWT_EXPIRE_TIME') }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        });
    }

    static verify(bearer) {
        return new Promise(resolve => {
            let token;
            const [scheme, credential] = bearer.split(' ');

            if (/^Bearer$/i.test(scheme) && credential) {
                token = credential;
            } else {
                return resolve(jsonError(errors.INVALID_TOKEN));
            }

            jwt.verify(token, getEnv('JWT_SECRET'), (error, decode) => {
                if (error) {
                    switch (error.message) {
                        case 'jwt expired':
                            error = errors.TOKEN_EXPIRED_ERROR;
                            break;

                        default:
                            error = errors.INVALID_TOKEN;
                    }

                    return resolve(jsonError(error));
                }
                return resolve(jsonSuccess(decode));
            });
        });
    }
}

export { Jwt };
