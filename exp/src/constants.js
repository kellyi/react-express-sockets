const socketEventTypesEnum = Object.freeze({
    sendMessage: 'sendMessage',
    broadcastMessage: 'broadcastMessage',
    setName: 'setName',
    broadcastName: 'broadcastName',
    isTyping: 'isTyping',
    broadcastIsTyping: 'broadcastIsTyping',
    newConnection: 'newConnection',
    disconnect: 'disconnect',
});

const action = 'action';

module.exports = {
    socketEventTypesEnum,
    action,
};
