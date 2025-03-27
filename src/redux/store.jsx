import { configureStore } from '@reduxjs/toolkit';

// Import reducers
import authReducer from './reducers/authReducer.jsx';
import profileReducer from './reducers/profileReducer.jsx';
import jobReducer from './reducers/jobReducer.jsx';
import vehicleReducer from './reducers/vehicleReducer.jsx';
import notificationReducer from './reducers/notificationReducer.jsx';
import recommendationReducer from './reducers/recommendationReducer.jsx';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    job: jobReducer,
    vehicle: vehicleReducer,
    notification: notificationReducer,
    recommendation: recommendationReducer,
  },
});

export default store;
