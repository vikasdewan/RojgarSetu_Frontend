const initialState = {
    vehicleForms: [],
    vehicleForm: null,
    applications: [],
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
      case 'GET_VEHICLE_FORMS':
        return {
          ...state,
          vehicleForms: payload,
          loading: false
        };
      case 'CREATE_VEHICLE_FORM':
        return {
          ...state,
          vehicleForms: [payload, ...state.vehicleForms],
          loading: false
        };
      case 'APPLY_FOR_VEHICLE':
        return {
          ...state,
          applications: [payload, ...state.applications],
          loading: false
        };
      case 'VEHICLE_ERROR':
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }