const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const socketio = require('socket.io');
const AI = require('tictactoe-agent');

const constants = require('./constants');
const utils = require('./utils');

const {
    socketEventTypesEnum: { serverMove, clientMove, gameStart, gameEnd },
    action,
    emptyBoard,
    O,
    X,
} = constants;

const { checkForXWin, checkForOWin } = utils;

const app = express();
const PORT = 9700;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

const server = http.Server(app);

const io = socketio(server);

io.on('connection', socket => {
    socket.emit(action, {
        type: gameStart,
        payload: {
            board: emptyBoard,
            winner: null,
        },
    });

    socket.on(action, ({ type, payload: { board } }) =>
        setTimeout(() => {
            if (type !== clientMove) {
                console.warn(type);
                return null;
            }

            if (checkForXWin(board)) {
                return socket.emit(action, {
                    type: gameEnd,
                    payload: {
                        board,
                        winner: X,
                    },
                });
            }

            const model = new AI.Model(board, O);
            const { index } = model.getRecommendation();

            if (index === undefined) {
                return socket.emit(action, {
                    type: gameEnd,
                    payload: {
                        board,
                    },
                });
            }

            const updatedBoard = board
                .slice(0, index)
                .concat(O, board.slice(index + 1));

            if (checkForOWin(updatedBoard)) {
                return socket.emit(action, {
                    type: gameEnd,
                    payload: {
                        board: updatedBoard,
                        winner: O,
                    },
                });
            }

            return socket.emit(action, {
                type: serverMove,
                payload: {
                    board: updatedBoard,
                    winner: null,
                },
            });
        }, Math.random() * 3000));
});

server.listen(PORT);
