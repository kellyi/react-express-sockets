export const clientSendMessage = 'clientSendMessage';
export const clientSetName = 'clientSetName';
export const clientIsTyping = 'clientIsTyping';

export const updateMessageInput = 'updateMessageInput';
export const updateNameInput = 'updateNameInput';

export function updateMessage(payload) {
    return {
        type: updateMessageInput,
        payload,
    };
}

export function sendMessage() {
    return (dispatch, getState) => {
        const {
            socketIO: { currentMessage },
        } = getState();

        return dispatch({
            type: clientSendMessage,
            payload: currentMessage,
        });
    };
}

export function isTyping() {
    return {
        type: clientIsTyping,
    };
}

export function updateName(payload) {
    return {
        type: updateNameInput,
        payload,
    };
}

export function setName() {
    return (dispatch, getState) => {
        const {
            socketIO: { name },
        } = getState();

        return dispatch({
            type: clientSetName,
            payload: name,
        });
    };
}
