import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import store from './store';

import MessageList from './MessageList';
import MessageInput from './MessageInput';

const appStyles = Object.freeze({
    containerStyles: Object.freeze({
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }),
});

function App() {
    return (
        <Provider store={store}>
            <div style={appStyles.containerStyles}>
                <MessageList />
                <MessageInput />
            </div>
        </Provider>
    );
}

export default hot(App);
