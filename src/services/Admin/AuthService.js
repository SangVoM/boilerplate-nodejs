import { errors, jsonSuccess, jsonError, logger } from '../../utils/system';
import { Jwt } from '../../utils/jwt';
import { Service } from '../Service';
import { UserRepository } from '../../repositories/Admin/UserRepository';
import { hashPassword, comparePassword } from '../../utils/encryption';

class AuthService extends Service {
    constructor() {
        super(UserRepository);
    }

    async login({ password, user }) {
        try {
            const checkPassword = await comparePassword(password, user.password);
            if (!checkPassword) {
                return jsonError(errors.PASSWORD_WRONG);
            }

            const token = await Jwt.sign({
                id: user.id,
                email: user.email
            });
            return jsonSuccess({ token });
        } catch (e) {
            logger.error(`${new Date().toDateString()}_ERRORS_ADMIN_LOGIN`, e);
            return jsonError(errors.SYSTEM_ERROR);
        }
    }

    async getInfo(user) {
        try {
            const info = await this.baseRepository.getOne(
                { id: user.id, active: true },
                {
                    attributes: {
                        exclude: ['password']
                    }
                }
            );
            return jsonSuccess(info);
        } catch (e) {
            logger.error(`${new Date().toDateString()}_ERRORS_INFO_USER`, e);
            return jsonError(errors.SYSTEM_ERROR);
        }
    }

    async createUser({ username, password }) {
        try {
            const passwordHash = await hashPassword(password);

            await this.baseRepository.create({
                username,
                password: passwordHash,
                email: 'sangvm2@vnext.com.vn',
                role_id: 5,
                active: true
            });
        } catch (e) {
            logger.error(`${new Date().toDateString()}_ERRORS_CREATE_USER`, e);
            return jsonError(errors.SYSTEM_ERROR);
        }
    }
}

export default new AuthService();
