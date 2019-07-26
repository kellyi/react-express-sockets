const X = 'X';
const O = 'O';

const spaceStatusEnum = Object.freeze({
    X,
    O,
    Empty: '-',
});

const socketEventTypesEnum = Object.freeze({
    serverMove: 'serverMove',
    clientMove: 'clientMove',
    gameStart: 'gameStart',
    gameEnd: 'gameEnd',
});

const emptyBoard = '---------';

const action = 'action';

module.exports = {
    X,
    O,
    spaceStatusEnum,
    socketEventTypesEnum,
    action,
    emptyBoard,
};
