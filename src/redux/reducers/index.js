import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import authReducer from './authReducer';
import commonReducer from './commonReducer';
// import AccountReducer from '../../ui/screens/Account/reducer';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [''],
};

const rootReducer = combineReducers({
  authReducer,
  commonReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
