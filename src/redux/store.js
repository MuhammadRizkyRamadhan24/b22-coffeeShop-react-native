import {createStore, applyMiddleware} from 'redux';
// import {persistStore} from 'redux-persist';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
