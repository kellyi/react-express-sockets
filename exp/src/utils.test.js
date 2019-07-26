const utils = require('./utils');
const constants = require('./constants');

const { X, O } = constants;

const { checkForXWin, checkForOWin } = utils;

it('checks whether X or O have won', () => {
    const leftWinBoard = 'X--X--X--';
    const centerWinBoard = '-X--X--X-';
    const rightWinBoard = '--X--X--X';
    const noWinBoardVert = '-O--X--X-';

    const topWinBoard = 'OOO------';
    const midWinBoard = '---OOO---';
    const bottomWinBoard = '------OOO';
    const noWinBoardHoriz = '---OXO---';

    const ascWinBoard = '--X-X-X--';
    const descWinBoard = 'O---O---O';
    const noWinBoardDiag = 'X---O---O';

    expect(checkForXWin(leftWinBoard)).toBe(X);
    expect(checkForXWin(centerWinBoard)).toBe(X);
    expect(checkForXWin(rightWinBoard)).toBe(X);
    expect(checkForXWin(noWinBoardVert)).toBeNull();

    expect(checkForOWin(topWinBoard)).toBe(O);
    expect(checkForOWin(midWinBoard)).toBe(O);
    expect(checkForOWin(bottomWinBoard)).toBe(O);
    expect(checkForOWin(noWinBoardHoriz)).toBeNull();

    expect(checkForXWin(ascWinBoard)).toBe(X);
    expect(checkForOWin(descWinBoard)).toBe(O);
    expect(checkForXWin(noWinBoardDiag)).toBeNull();
});
