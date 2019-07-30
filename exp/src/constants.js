const socketEventTypesEnum = Object.freeze({
    clientSendMessage: 'clientSendMessage',
    broadcastMessage: 'broadcastMessage',
    clientSetName: 'clientSetName',
    broadcastName: 'broadcastName',
    clientIsTyping: 'clientIsTyping',
    broadcastIsTyping: 'broadcastIsTyping',
    newConnection: 'newConnection',
    disconnect: 'disconnect',
});

const action = 'action';

module.exports = {
    socketEventTypesEnum,
    action,
};
