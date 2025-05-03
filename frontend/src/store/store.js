import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
// import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authReducer from './../reducers/AuthReducer';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
