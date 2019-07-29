const _ = require('lodash');
const utils = require('./utils');

const { maybeGetUserName, setUserName, removeUserName } = utils;

it('sets, gets, and removes usernames', () => {
    const sessionOne = 'sessionOne';
    const nameOne = 'nameOne';
    const sessionTwo = 'sessionTwo';
    const nameTwo = 'nameTwo';
    const anonymousSession = 'anonymousSession';

    let users = {};
    users = setUserName(sessionOne, nameOne, users);
    users = setUserName(sessionTwo, nameTwo, users);

    expect(
        _.isEqual(users, {
            sessionOne: nameOne,
            sessionTwo: nameTwo,
        }),
    ).toBe(true);

    expect(maybeGetUserName(sessionOne, users)).toBe(nameOne);

    expect(maybeGetUserName(anonymousSession, users)).toBe('anonymous');

    users = removeUserName(sessionTwo, users);

    expect(
        _.isEqual(users, {
            sessionOne: nameOne,
        }),
    ).toBe(true);
});
