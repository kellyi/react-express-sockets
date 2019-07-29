const _ = require('lodash');

const initialUsers = Object.freeze({});

const maybeGetUserName = (sessionID, users = initialUsers) =>
    _.get(users, sessionID, 'anonymous');

const setUserName = (sessionID, username, users = initialUsers) => ({
    ...users,
    [sessionID]: username,
});

const removeUserName = (sessionID, users = initialUsers) =>
    _.omit(users, [sessionID]);

module.exports = {
    maybeGetUserName,
    setUserName,
    removeUserName,
};
