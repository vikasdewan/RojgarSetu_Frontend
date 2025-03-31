import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './redux/actions';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import OTPVerification from './components/Auth/OTPVerification';

// Dashboard Components
import WorkerDashboard from './components/Dashboard/WorkerDashboard';
import ContractorDashboard from './components/Dashboard/ContractorDashboard';
import OwnerDashboard from './components/Dashboard/OwnerDashboard';

// Profile Components
import WorkerProfile from './components/Profile/WorkerProfile';
import ContractorProfile from './components/Profile/ContractorProfile';
import OwnerProfile from './components/Profile/OwnerProfile';

// // Job Components
import JobPostingForm from './components/Job/JobPostingForm';
import JobApplicationForm from './components/Job/JobApplicationForm';

// // Vehicle Components
// import VehicleForm from './components/Vehicle/VehicleForm';

// // Notification Components
// import NotificationList from './components/Notifications/NotificationList';

// // PDF Components
// import PDFViewer from './components/PDFViewer/PDFViewer';

// // Recommendation Components
// import RecommendationList from './components/Recommendations/RecommendationList';

// Pages
import Home from './pages/Home';
import Navbar from './components/home/Navbar';
// import About from './pages/About';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, userType, loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/verify-otp" element={!isAuthenticated ? <OTPVerification /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes */}
        {/* <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              userType === 'worker' ? <WorkerDashboard /> :
              userType === 'contractor' ? <ContractorDashboard /> :
              userType === 'owner' ? <OwnerDashboard /> :
              <Navigate to="/login" />
            ) : <Navigate to="/login" />
          } 
        /> */}
        {/* For Testing Purposes */}
        <Route path='/worker/dashboard' element={<WorkerDashboard />} />
        <Route path='/contractor/dashboard' element={<ContractorDashboard />} />
        <Route path='/owner/dashboard' element={<OwnerDashboard />} />
        <Route path='/worker/profile' element={<WorkerProfile />} />
        <Route path='/contractor/profile' element={<ContractorProfile />} />
        <Route path='/owner/profile' element={<OwnerProfile />} />
        <Route path='/job/create' element={<JobPostingForm />} />
        <Route path='/job/apply/' element={<JobApplicationForm />} />
        {/* Worker Routes */}
        {/* <Route 
          path="/worker/profile" 
          element={isAuthenticated && userType === 'worker' ? <WorkerProfile /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/job/apply/:id" 
          element={isAuthenticated && userType === 'worker' ? <JobApplicationForm /> : <Navigate to="/login" />} 
        /> */}

        {/* Contractor Routes */}
        {/* <Route 
          path="/contractor/profile" 
          element={isAuthenticated && userType === 'contractor' ? <ContractorProfile /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/job/create" 
          element={isAuthenticated && userType === 'contractor' ? <JobPostingForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/job/edit/:id" 
          element={isAuthenticated && userType === 'contractor' ? <JobPostingForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/vehicle/create" 
          element={isAuthenticated && userType === 'contractor' ? <VehicleForm /> : <Navigate to="/login" />} 
        /> */}

        {/* Owner Routes */}
        {/* <Route 
          path="/owner/profile" 
          element={isAuthenticated && userType === 'owner' ? <OwnerProfile /> : <Navigate to="/login" />} 
        /> */}

        {/* Common Routes */}
        {/* <Route 
          path="/notifications" 
          element={isAuthenticated ? <NotificationList /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/pdf/:type/:id" 
          element={isAuthenticated ? <PDFViewer /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/recommendations" 
          element={isAuthenticated ? <RecommendationList /> : <Navigate to="/login" />} 
        /> */}

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;