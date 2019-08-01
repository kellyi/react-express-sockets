import {
    clientSendMessage,
    updateMessageInput,
    updateNameInput,
} from './actions.socketio';

const broadcastMessage = 'broadcastMessage';
const broadcastName = 'broadcastName';
// const broadcastIsTyping = 'broadcastIsTyping';

const initialState = Object.freeze({
    name: '',
    nameIsSet: false,
    isTyping: false,
    currentMessage: '',
    messages: [],
});

export default function socketIOReducers(
    state = initialState,
    { type, payload },
) {
    switch (type) {
        case broadcastMessage:
            return {
                ...state,
                messages: [payload, ...state.messages],
            };
        case clientSendMessage:
            return {
                ...state,
                currentMessage: initialState.currentMessage,
            };
        case updateMessageInput:
            return {
                ...state,
                currentMessage: payload,
            };
        case broadcastName:
            return {
                ...state,
                nameIsSet: true,
            };
        case updateNameInput:
            return {
                ...state,
                name: payload,
            };
        default:
            return state;
    }
}
