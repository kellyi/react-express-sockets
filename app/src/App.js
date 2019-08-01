import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import store from './store';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import NameInput from './NameInput';

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

function Content({ nameIsSet }) {
    if (!nameIsSet) {
        return <NameInput />;
    }

    return (
        <>
            <MessageList />
            <MessageInput />
        </>
    );
}

const ContentComponent = connect(({ socketIO: { nameIsSet } }) => ({
    nameIsSet,
}))(Content);

function App() {
    return (
        <Provider store={store}>
            <div style={appStyles.containerStyles}>
                <ContentComponent />
            </div>
        </Provider>
    );
}

export default hot(App);
