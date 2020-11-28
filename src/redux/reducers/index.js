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
  blacklist: ['isLoading', 'textSearchUser', 'textSearchCompany'],
};

const rootReducer = combineReducers({
  authReducer,
  commonReducer,
  dayWorkReducer,
  companyReducer,
  searchReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
