import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import authReducer from './authReducer';
import commonReducer from './commonReducer';
import dayWorkReducer from './dayWorkReducer';
import companyReducer from './companyReducer';
import searchReducer from './searchReducer';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['searchReducer', 'commonReducer'],
  // blacklist: ['isLoading', 'textSearchUser', 'textSearchCompany'],
};

const searchConfig = {
  key: 'searchReducer',
  storage: AsyncStorage,
  blacklist: ['textSearchUser', 'textSearchCompany'],
};
const commonConfig = {
  key: 'searchReducer',
  storage: AsyncStorage,
  blacklist: ['isLoading'],
};

const rootReducer = combineReducers({
  authReducer,
  commonReducer: persistReducer(commonConfig, commonReducer),
  dayWorkReducer,
  companyReducer,
  searchReducer: persistReducer(searchConfig, searchReducer),
});

export default persistReducer(rootPersistConfig, rootReducer);
