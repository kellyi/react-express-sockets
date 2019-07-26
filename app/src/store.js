import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import isObject from 'lodash/isObject';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import rootReducer from './reducers';

const socket = io('http://localhost:9700');
const socketIOMiddleware = createSocketIoMiddleware(socket, 'client');

const isDevelopment = process.env.NODE_ENV === 'development';

/* eslint-disable no-underscore-dangle */
const devtoolsExtensionCompose =
    isDevelopment &&
    isObject(window) &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
/* eslint-enable no-underscore-dangle */

const middleware = isDevelopment
    ? [
          socketIOMiddleware,
          thunkMiddleware,
          createLogger({ diff: true, collapsed: true }),
      ]
    : [socketIOMiddleware, thunkMiddleware];

const composeEnhancers = devtoolsExtensionCompose || compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancer);
export default store;
