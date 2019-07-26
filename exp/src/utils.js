const R = require('ramda');

const constants = require('./constants');

const makeCheckForWinnerFunction = player => board => {
    const leftTest = new RegExp(`^${player}..${player}..${player}..$`);
    const centerTest = new RegExp(`^.${player}..${player}..${player}.$`);
    const rightTest = new RegExp(`^..${player}..${player}..${player}$`);
    const topTest = new RegExp(`^${player}${player}${player}......$`);
    const middleTest = new RegExp(`^...${player}${player}${player}...$`);
    const bottomTest = new RegExp(`^......${player}${player}${player}$`);
    const descTest = new RegExp(`^${player}...${player}...${player}$`);
    const ascTest = new RegExp(`^..${player}.${player}.${player}..$`);

    return R.any(match => R.test(match, board), [
        leftTest,
        centerTest,
        rightTest,
        topTest,
        middleTest,
        bottomTest,
        descTest,
        ascTest,
    ])
        ? player
        : null;
};

module.exports = {
    checkForXWin: makeCheckForWinnerFunction(constants.X),
    checkForOWin: makeCheckForWinnerFunction(constants.O),
};
