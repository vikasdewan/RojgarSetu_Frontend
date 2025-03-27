const initialState = {
    notifications: [],
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
      case 'GET_NOTIFICATIONS':
        return {
          ...state,
          notifications: payload,
          loading: false
        };
      case 'MARK_NOTIFICATION_READ':
        return {
          ...state,
          notifications: state.notifications.map(notification => 
            notification._id === payload.id 
              ? { ...notification, isRead: true } 
              : notification
          ),
          loading: false
        };
      case 'NOTIFICATION_ERROR':
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }