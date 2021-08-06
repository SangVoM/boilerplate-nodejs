import { config } from './config';
import { errors, logger } from '../utils/system';
import redisAdapter from 'socket.io-redis';
import socketIOJwt from 'socketio-jwt';
import { auth } from '../middleware/Admin/AuthenticationSocket';

const socketIO = app => {
    try {
        /** Create socket service */
        const io = require('socket.io')(app, config.socket.settings.options);

        /** Setting Socket IO JWT */
        io.use(
            socketIOJwt.authorize({
                secret: getEnv('JWT_SECRET'),
                handshake: true,
                auth_header_required: true
            })
        );

        // io.adapter(redisAdapter({ host: getEnv('REDIS_HOST'), port: getEnv('REDIS_PORT') }, {}));

        // Connect socket.
        io.use(async (socket, next) => {
            const user = socket.decoded_token;
            user._id = user.sub;
            if (!user) {
                socket.emit('auAuthorization', errors.NOT_AUTHENTICATED);
                socket.disconnect();
            }
            return auth(socket, user, next);
        }).on('connection', async socket => {
            logger.info(`Welcome to server: ${socket.id}`);
            console.log('connection.....');
        });
    } catch (e) {
        console.log('[CONNECTION] connection failed! ' + e);
    }
};
export default socketIO;
