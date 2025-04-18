// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';
import authReducer from './slices/authSlice';
import { authApiSlice } from './api/authApiSlice';
import { profileApiSlice } from './api/profileApiSlice';
import { jobsApiSlice } from './api/jobsApiSlice';
import { vehicleApiSlice } from './api/vehicleApiSlice';
import { notificationApiSlice } from './api/notificationApiSlice';
import { recommendationApiSlice } from './api/recommendationApiSlice';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'userType', 'token'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [profileApiSlice.reducerPath]: profileApiSlice.reducer,
    [jobsApiSlice.reducerPath]: jobsApiSlice.reducer,
    [vehicleApiSlice.reducerPath]: vehicleApiSlice.reducer,
    [notificationApiSlice.reducerPath]: notificationApiSlice.reducer,
    [recommendationApiSlice.reducerPath]: recommendationApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApiSlice.middleware,
      profileApiSlice.middleware,
      jobsApiSlice.middleware,
      vehicleApiSlice.middleware,
      notificationApiSlice.middleware,
      recommendationApiSlice.middleware
    ),
  });
  
  export const persistor = persistStore(store);
  