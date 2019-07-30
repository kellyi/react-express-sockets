import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import flow from 'lodash/flow';
import noop from 'lodash/noop';

import { updateMessage, sendMessage } from './actions.socketio';

const messageInputStyles = Object.freeze({
    containerStyles: Object.freeze({
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        height: '55px',
    }),
    textInputStyles: Object.freeze({ width: '87%' }),
    submitButtonStyles: Object.freeze({ width: '12%' }),
});

function MessageInput({
    currentMessage,
    updateInput,
    sendInput,
    sendInputOnEnterKeyPress,
}) {
    return (
        <div style={messageInputStyles.containerStyles}>
            <TextField
                variant="outlined"
                label="Type a message"
                style={messageInputStyles.textInputStyles}
                onChange={updateInput}
                value={currentMessage}
                onKeyPress={currentMessage ? sendInputOnEnterKeyPress : noop}
            />
            <Button
                variant="contained"
                color="primary"
                style={messageInputStyles.submitButtonStyles}
                onClick={sendInput}
            >
                Send
            </Button>
        </div>
    );
}

function mapStateToProps({ socketIO: { currentMessage } }) {
    return {
        currentMessage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateInput: flow(
            ({ currentTarget: { value } }) => value,
            updateMessage,
            dispatch,
        ),
        sendInput: flow(
            sendMessage,
            dispatch,
        ),
        sendInputOnEnterKeyPress: ({ key }) => {
            if (key !== 'Enter') {
                return noop();
            }

            return dispatch(sendMessage());
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MessageInput);
