const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    userType: null
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
      case 'AUTH_START':
        return {
          ...state,
          loading: true
        };
      case 'USER_LOADED':
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload.user,
          userType: payload.userType
        };
      case 'REGISTER_SUCCESS':
      case 'LOGIN_SUCCESS':
        localStorage.setItem('token', payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case 'OTP_VERIFIED':
        return {
          ...state,
          user: {
            ...state.user,
            otpVerified: true
          }
        };
      case 'REGISTER_FAIL':
      case 'AUTH_FAIL':
      case 'LOGIN_FAIL':
      case 'LOGOUT':
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          userType: null
        };
      default:
        return state;
    }
  }