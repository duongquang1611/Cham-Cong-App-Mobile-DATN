import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import authReducer from './authReducer';
import commonReducer from './commonReducer';
import dayWorkReducer from './dayWorkReducer';
import companyReducer from './companyReducer';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [''],
};

const rootReducer = combineReducers({
  authReducer,
  commonReducer,
  dayWorkReducer,
  companyReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
