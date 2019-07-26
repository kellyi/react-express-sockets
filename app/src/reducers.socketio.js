import { clientMove } from './actions.socketio';

const gameStart = 'gameStart';
const serverMove = 'serverMove';
const gameEnd = 'gameEnd';

const initialState = Object.freeze({
    board: null,
    winner: null,
    isClientTurn: true,
});

export default function socketIOReducers(
    state = initialState,
    { type, payload },
) {
    switch (type) {
        case clientMove:
            return {
                ...state,
                ...payload,
                isClientTurn: false,
            };
        case gameEnd:
            return {
                ...state,
                ...payload,
                isClientTurn: false,
            };
        case gameStart:
        case serverMove:
            return {
                ...state,
                ...payload,
                isClientTurn: true,
            };
        default:
            return state;
    }
}
