import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MessageIcon from '@material-ui/icons/Message';
import moment from 'moment';

const messageListStyles = Object.freeze({
    listStyles: Object.freeze({
        height: 'calc(100% - 70px)',
        width: '100%',
        overflow: 'scroll',
    }),
    subheaderStyles: Object.freeze({
        backgroundColor: 'white',
    }),
});

function MessageList({ messages }) {
    return (
        <List
            subheader={
                <ListSubheader style={messageListStyles.subheaderStyles}>
                    Messages
                </ListSubheader>
            }
            style={messageListStyles.listStyles}
        >
            {messages.map(m => (
                <ListItem key={m.timestamp + m.user + m.message}>
                    <ListItemIcon>
                        <MessageIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={m.message}
                        secondary={`from ${m.user} at ${moment(
                            m.timestamp,
                        ).toISOString()}`}
                    />
                </ListItem>
            ))}
        </List>
    );
}

function mapStateToProps({ socketIO: { messages } }) {
    return {
        messages,
    };
}

export default connect(mapStateToProps)(MessageList);
