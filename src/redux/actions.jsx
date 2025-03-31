// action.jsx
import axios from 'axios';

// Update API URL to match /api/v1
const API_URL = 'http://localhost:5000/api/v1';

// Set auth token
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// Check if user is authenticated
export const checkAuth = () => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      dispatch({ type: 'AUTH_FAIL' });
      return;
    }
    
    setAuthToken(token);
    
    const res = await axios.get(`${API_URL}/auth/user`);
    
    dispatch({
      type: 'USER_LOADED',
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: 'AUTH_FAIL' });
  }
};

// Register User
export const register = (formData, userType) => async dispatch => {
  try {
    dispatch({ type: 'AUTH_START' });
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const body = JSON.stringify({ ...formData, userType });
    
    const res = await axios.post(`${API_URL}/auth/register`, body, config);
    
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data
    });
    
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: 'REGISTER_FAIL'
    });
    
    throw err;
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'AUTH_START' });
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const body = JSON.stringify({ email, password });
    
    const res = await axios.post(`${API_URL}/auth/login`, body, config);
    
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });
    
    setAuthToken(res.data.token);
    
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: 'LOGIN_FAIL'
    });
    
    throw err;
  }
};

// Verify OTP
export const verifyOTP = (userId, otp) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const body = JSON.stringify({ userId, otp });
    
    const res = await axios.post(`${API_URL}/auth/verify-otp`, body, config);
    
    dispatch({
      type: 'OTP_VERIFIED',
      payload: res.data
    });
    
    return res.data;
  } catch (err) {
    dispatch({
      type: 'OTP_VERIFICATION_FAIL'
    });
    
    throw err;
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: 'LOGOUT' });
};

// Get Worker Profile
export const getWorkerProfile = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/worker/profile`);
    
    dispatch({
      type: 'GET_WORKER_PROFILE',
      payload: res.data
    });
    
    return res.data;
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Get Contractor Profile
export const getContractorProfile = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/contractor/profile`);
    
    dispatch({
      type: 'GET_CONTRACTOR_PROFILE',
      payload: res.data
    });
    
    return res.data;
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Get Owner Profile
export const getOwnerProfile = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/owner/profile`);
    
    dispatch({
      type: 'GET_OWNER_PROFILE',
      payload: res.data
    });
    
    return res.data;
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Update Worker Profile
export const updateWorkerProfile = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const res = await axios.put(`${API_URL}/worker/profile`, formData, config);
    
    dispatch({
      type: 'UPDATE_WORKER_PROFILE',
      payload: res.data
    });
    
    dispatch(setAlert('Profile Updated', 'success'));
    
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Update Worker Image
export const updateWorkerImage = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    
    const res = await axios.put(`${API_URL}/worker/profile/image`, formData, config);
    
    dispatch({
      type: 'UPDATE_WORKER_IMAGE',
      payload: res.data
    });
    
    dispatch(setAlert('Worker Image Updated', 'success'));
    
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Update Worker Resume
export const updateWorkerResume = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    
    const res = await axios.put(`${API_URL}/worker/profile/resume`, formData, config);
    
    dispatch({
      type: 'UPDATE_WORKER_RESUME',
      payload: res.data
    });
    
    dispatch(setAlert('Worker Resume Updated', 'success'));
    
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Update Contractor Image
export const updateContractorImage = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    
    const res = await axios.put(`${API_URL}/contractor/profile/image`, formData, config);
    
    dispatch({
      type: 'UPDATE_CONTRACTOR_IMAGE',
      payload: res.data
    });
    
    dispatch(setAlert('Contractor Image Updated', 'success'));
    
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Update Owner Image
export const updateOwnerImage = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    
    const res = await axios.put(`${API_URL}/owner/profile/image`, formData, config);
    
    dispatch({
      type: 'UPDATE_OWNER_IMAGE',
      payload: res.data
    });
    
    dispatch(setAlert('Owner Image Updated', 'success'));
    
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};
// Update contractor Profile
export const updateContractorProfile = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const res = await axios.put(`${API_URL}/contractor/profile`, formData, config);
    
    dispatch({
      type: 'UPDATE_CONTRACTOR_PROFILE',
      payload: res.data
    });
    
    dispatch(setAlert('Profile Updated', 'success'));
    
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};
// Update Owner Profile
export const updateOwnerProfile = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const res = await axios.put(`${API_URL}/owner/profile`, formData, config);
    
    dispatch({
      type: 'UPDATE_OWNER_PROFILE',
      payload: res.data
    });
    
    dispatch(setAlert('Profile Updated', 'success'));
    
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Get Job Postings
export const getJobPostings = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/job`);
    
    dispatch({
      type: 'GET_JOB_POSTINGS',
      payload: res.data
    });
    
    return res.data;
  } catch (err) {
    dispatch({
      type: 'JOB_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Create Job Posting
export const createJobPosting = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const res = await axios.post(`${API_URL}/job/create`, formData, config);
    
    dispatch({
      type: 'CREATE_JOB_POSTING',
      payload: res.data
    });
    
    dispatch(setAlert('Job Posted', 'success'));
    
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: 'JOB_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Apply for Job
export const applyForJob = (jobId, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const res = await axios.post(`${API_URL}/job/apply`, { jobId, ...formData }, config);
    
    dispatch({
      type: 'APPLY_FOR_JOB',
      payload: res.data
    });
    
    dispatch(setAlert('Application Submitted', 'success'));
    
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: 'JOB_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Get Worker Dashboard
export const getWorkerDashboard = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/worker/dashboard`);
    
    dispatch({
      type: 'GET_WORKER_DASHBOARD',
      payload: res.data
    });
    
    return res.data;
  } catch (err) {
    dispatch({
      type: 'DASHBOARD_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Get Contractor Dashboard
export const getContractorDashboard = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/contractor/dashboard`);
    
    dispatch({
      type: 'GET_CONTRACTOR_DASHBOARD',
      payload: res.data
    });
    
    return res.data;
  } catch (err) {
    dispatch({
      type: 'DASHBOARD_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Create Vehicle Form
export const createVehicleForm = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const res = await axios.post(`${API_URL}/vehicle/create`, formData, config);
    
    dispatch({
      type: 'CREATE_VEHICLE_FORM',
      payload: res.data
    });
    
    dispatch(setAlert('Vehicle Form Created', 'success'));
    
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: 'VEHICLE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Apply for Vehicle
export const applyForVehicle = (vehicleFormId, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const res = await axios.post(`${API_URL}/vehicle/apply`, { vehicleFormId, ...formData }, config);
    
    dispatch({
      type: 'APPLY_FOR_VEHICLE',
      payload: res.data
    });
    
    dispatch(setAlert('Vehicle Application Submitted', 'success'));
    
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: 'VEHICLE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Get Notifications
export const getNotifications = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/notifications`);
    
    dispatch({
      type: 'GET_NOTIFICATIONS',
      payload: res.data
    });
    
    return res.data;
  } catch (err) {
    dispatch({
      type: 'NOTIFICATION_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Mark Notification as Read
export const markNotificationAsRead = (notificationId) => async dispatch => {
  try {
    const res = await axios.put(`${API_URL}/notifications/${notificationId}/read`);
    
    dispatch({
      type: 'MARK_NOTIFICATION_READ',
      payload: { id: notificationId }
    });
    
    return res.data;
  } catch (err) {
    dispatch({
      type: 'NOTIFICATION_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Get Recommendations
export const getRecommendations = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/recommendations`);
    
    dispatch({
      type: 'GET_RECOMMENDATIONS',
      payload: res.data
    });
    
    return res.data;
  } catch (err) {
    dispatch({
      type: 'RECOMMENDATION_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Generate PDF
export const generatePDF = (templateType, data) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const body = JSON.stringify({ templateType, data });
    
    const res = await axios.post(`${API_URL}/generate/pdf`, body, config);
    
    dispatch({
      type: 'GENERATE_PDF',
      payload: res.data
    });
    
    return res.data;
  } catch (err) {
    dispatch({
      type: 'PDF_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
    throw err;
  }
};

// Set Alert
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = Math.random().toString(36).substr(2, 9);
  
  dispatch({
    type: 'SET_ALERT',
    payload: { msg, alertType, id }
  });
  
  setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), timeout);
};