import React from 'react';
import { connect } from 'react-redux';
import take from 'lodash/take';
import drop from 'lodash/drop';
import map from 'lodash/map';

import { makeClientMove } from './actions.socketio';

const styles = Object.freeze({
    containerStyles: Object.freeze({
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    boardStyles: Object.freeze({
        display: 'flex',
        flexDirection: 'column',
    }),
    rowStyles: Object.freeze({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    cellStyles: Object.freeze({
        width: '30vw',
        height: '30vw',
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '25vw',
        border: 'none',
        margin: '5px',
        backgroundColor: 'white',
    }),
});

function App({ board, winner, isClientTurn, makeMove }) {
    const boardElements = map(board, (occupant, index) => {
        if (occupant === '-') {
            return (
                <button
                    key={index}
                    onClick={() => makeMove(index)}
                    disabled={winner || !isClientTurn}
                    style={Object.assign({}, styles.cellStyles, {
                        cursor: 'pointer',
                    })}
                >
                    {occupant}
                </button>
            );
        }

        return (
            <div key={index} style={styles.cellStyles}>
                {occupant}
            </div>
        );
    });

    return (
        <div style={styles.containerStyles}>
            <div style={styles.boardStyles}>
                <div style={styles.rowStyles}>{take(boardElements, 3)}</div>
                <div style={styles.rowStyles}>
                    {take(drop(boardElements, 3), 3)}
                </div>
                <div style={styles.rowStyles}>
                    {take(drop(boardElements, 6), 3)}
                </div>
            </div>
        </div>
    );
}

function mapStateToProps({ socketIO: { board, winner, isClientTurn } }) {
    return {
        board,
        winner,
        isClientTurn,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        makeMove: index => dispatch(makeClientMove(index)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
