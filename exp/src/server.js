const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const socketio = require('socket.io');
const redisAdapter = require('socket.io-redis');
const expressSession = require('express-session');
const sharedSession = require('express-socket.io-session');

const constants = require('./constants');
const utils = require('./utils');

const { action, socketEventTypesEnum } = constants;

const { maybeGetUserName, setUserName, removeUserName } = utils;

const app = express();
const session = expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
});

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(session);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));
app.get('/health-check', (req, res) => res.sendStatus(204));

const server = http.Server(app);

const io = socketio(server);

io.adapter(redisAdapter({ host: 'redis', port: 6379 }));
io.use(sharedSession(session));

let users = {};

io.on('connection', socket => {
    const {
        handshake: { sessionID },
    } = socket;

    socket.broadcast.emit(action, {
        type: socketEventTypesEnum.newConnection,
        payload: `${maybeGetUserName(sessionID, users)} joined the chat`,
    });

    socket.on(action, ({ type, payload }) => {
        if (type === socketEventTypesEnum.sendMessage) {
            socket.broadcast.emit(action, {
                type: socketEventTypesEnum.broadcastMessage,
                payload: {
                    timestamp: Date.now(),
                    user: maybeGetUserName(sessionID, users),
                    message: payload,
                },
            });
        }

        if (type === socketEventTypesEnum.setName) {
            users = setUserName(sessionID, payload, users);

            socket.broadcast.emit(action, {
                type: socketEventTypesEnum.broadcastName,
                payload,
            });
        }

        if (type === socketEventTypesEnum.isTyping) {
            const isTypingMessage = `${maybeGetUserName(
                sessionID,
                users,
            )} is typing`;

            socket.broadcast.emit(action, {
                type: socketEventTypesEnum.broadcastIsTyping,
                payload: isTypingMessage,
            });
        }
    });

    socket.on(socketEventTypesEnum.disconnect, () => {
        users = removeUserName(sessionID, users);
    });
});

const PORT = 9700;
server.listen(PORT);
