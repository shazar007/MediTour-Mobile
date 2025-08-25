import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './reducers/userReducer';
import shiftStackReducer from './reducers/shiftStackReducer';
import modalReducer from './reducers/modalReducer';
import onBoardingReducer from './reducers/onBoardingReducer';
import randomReducer from './reducers/randomReducer';
import vendorAuthReducer from './reducers/vendorAuthReducer';
import b2bReducer from './reducers/b2bReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'main', 'onBoarding', 'shiftStack', 'b2b'],
};

const reducers = combineReducers({
  user: userReducer,
  shiftStack: shiftStackReducer,
  modal: modalReducer,
  onBoarding: onBoardingReducer,
  random: randomReducer,
  vendorAuth: vendorAuthReducer,
  b2b: b2bReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
