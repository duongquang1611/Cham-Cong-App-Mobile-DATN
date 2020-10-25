import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {middleware} from '../navigations';
import {persistStore} from 'redux-persist';

const myStore = createStore(
  rootReducer,
  // compose(applyMiddleware(thunk, middleware)),
  applyMiddleware(thunk),
);

const persistor = persistStore(myStore);

export {persistor, myStore};
