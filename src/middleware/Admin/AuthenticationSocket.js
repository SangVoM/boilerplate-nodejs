import { User } from '../../models/schema/User';
import { errors, logger } from '../../utils/system';

export const auth = async (socket, user, next) => {
    console.log('Middleware authentication');
    user = await User.findOne({ where: { id: user.id } });

    if (user && user.username) {
        logger.info(`User ${user.username} connected`);
    }

    if (!user) {
        logger.error('cant find user');
        socket.emit('unAuthorization', errors.NOT_AUTHENTICATED);
        socket.disconnect();
        return false;
    }

    return next();
};
