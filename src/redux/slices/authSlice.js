// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    userType: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.userType = action.payload.userType;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.userType = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
