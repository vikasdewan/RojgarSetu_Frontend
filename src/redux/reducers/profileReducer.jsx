const initialState = {
    workerProfile: null,
    contractorProfile: null,
    ownerProfile: null,
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
      case 'GET_WORKER_PROFILE':
        return {
          ...state,
          workerProfile: payload,
          loading: false
        };
      case 'GET_CONTRACTOR_PROFILE':
        return {
          ...state,
          contractorProfile: payload,
          loading: false
        };
      case 'GET_OWNER_PROFILE':
        return {
          ...state,
          ownerProfile: payload,
          loading: false
        };
      case 'UPDATE_WORKER_PROFILE':
        return {
          ...state,
          workerProfile: payload,
          loading: false
        };
      case 'PROFILE_ERROR':
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }