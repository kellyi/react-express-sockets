import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import flow from 'lodash/flow';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';

import { updateName, setName } from './actions.socketio';

const nameInputStyles = Object.freeze({
    containerStyles: Object.freeze({
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    inputStyles: Object.freeze({
        margin: '1rem',
        width: '500px',
    }),
    buttonStyles: Object.freeze({
        margin: '1rem',
    }),
});

function NameInput({
    name,
    handleUpdateName,
    handleSetName,
    handleSetNameOnEnterKeyPress,
}) {
    return (
        <div style={nameInputStyles.containerStyles}>
            <TextField
                value={name}
                label="Enter your name"
                variant="outlined"
                onChange={handleUpdateName}
                onKeyPress={isEmpty(name) ? noop : handleSetNameOnEnterKeyPress}
                style={nameInputStyles.inputStyles}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSetName}
                disabled={isEmpty(name)}
                style={nameInputStyles.buttonStyles}
            >
                Submit
            </Button>
        </div>
    );
}

const mapStateToProps = ({ socketIO: { name } }) => ({ name });

const mapDispatchToProps = dispatch => ({
    handleSetName: flow(
        setName,
        dispatch,
    ),
    handleUpdateName: flow(
        ({ currentTarget: { value } }) => value,
        updateName,
        dispatch,
    ),
    handleSetNameOnEnterKeyPress: ({ key }) => {
        if (key !== 'Enter') {
            return noop();
        }

        return dispatch(setName());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NameInput);
