import 'dotenv/config.js';

const { NODE_ENV, PORT, HOST, M_USERNAME, M_PASSWORD, M_HOSTNAME, M_PORT, M_DATABASE } = process.env;

export default {
    build: NODE_ENV,
    server: {
        protocol: 'http',
        port: parseInt(PORT as string) || 3030,
        host: HOST || 'localhost',
    },
    chat: {
        url: '/chat/',
    },
    mongo: {
        url: `mongodb://${M_USERNAME}:${M_PASSWORD}@${M_HOSTNAME}:${M_PORT}/${M_DATABASE}?authMechanism=DEFAULT&authSource=${M_DATABASE}`,
    },
    cors: {
        allowedOrigin: [
            'http://localhost',
            'http://localhost:80',
            'http://localhost:8080',
            'http://localhost:5000',
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:5175',
            'http://localhost:5176',
        ],
    },
};
