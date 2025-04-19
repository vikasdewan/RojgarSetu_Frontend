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
      const { user, token } = action.payload;
      state.user = typeof user === 'string' ? JSON.parse(user) : user;
      state.userType = user.userType;
      state.token = token;
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
