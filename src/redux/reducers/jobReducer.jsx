const initialState = {
    jobs: [],
    job: null,
    applications: [],
    workerDashboard: null,
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
      case 'GET_JOB_POSTINGS':
        return {
          ...state,
          jobs: payload,
          loading: false
        };
      case 'CREATE_JOB_POSTING':
        return {
          ...state,
          jobs: [payload, ...state.jobs],
          loading: false
        };
      case 'APPLY_FOR_JOB':
        return {
          ...state,
          applications: [payload, ...state.applications],
          loading: false
        };
      case 'GET_WORKER_DASHBOARD':
        return {
          ...state,
          workerDashboard: payload,
          loading: false
        };
      case 'JOB_ERROR':
      case 'DASHBOARD_ERROR':
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }