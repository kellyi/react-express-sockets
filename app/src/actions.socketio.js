export const clientMove = 'clientMove';

export function makeClientMove(indexToUpdate) {
    return (dispatch, getState) => {
        const {
            socketIO: {
                board,
            },
        } = getState();

        const updatedBoard = board
              .slice(0, indexToUpdate)
              .concat(
                  'X',
                  board.slice(indexToUpdate + 1),
              );

        return dispatch({
            type: clientMove,
            payload: {
                board: updatedBoard,
            },
        });
    };
}
