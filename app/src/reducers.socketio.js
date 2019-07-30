import { clientSendMessage, updateMessageInput } from './actions.socketio';

const broadcastMessage = 'broadcastMessage';
// const braodcastName = 'broadcastName';
// const broadcastIsTyping = 'broadcastIsTyping';

const initialState = Object.freeze({
    name: '',
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
        default:
            return state;
    }
}
