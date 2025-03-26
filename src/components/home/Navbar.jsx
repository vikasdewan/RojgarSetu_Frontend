import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotificationBell from '../Notifications/NotificationBell.jsx';

const Navbar = () => {
  const { userType, user } = useSelector(state => state.auth);
  const location = useLocation();
  
  const getNavLinks = () => {
    switch(userType) {
      case 'worker':
        return (
          <>
            <Link to="/worker/profile" className={`mx-3 ${location.pathname.includes('/worker/profile') ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>Profile</Link>
            <Link to="/worker/portfolio" className={`mx-3 ${location.pathname.includes('/worker/portfolio') ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>Portfolio</Link>
            <Link to="/worker/jobs" className={`mx-3 ${location.pathname.includes('/worker/jobs') ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>Jobs</Link>
            <Link to="/worker/messages" className={`mx-3 ${location.pathname.includes('/worker/messages') ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>Messages</Link>
          </>
        );
      case 'contractor':
        return (
          <>
            <Link to="/contractor/dashboard" className={`mx-3 ${location.pathname.includes('/contractor/dashboard') ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>Dashboard</Link>
            <Link to="/contractor/job-postings" className={`mx-3 ${location.pathname.includes('/contractor/job-postings') ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>Job Postings</Link>
            <Link to="/contractor/messages" className={`mx-3 ${location.pathname.includes('/contractor/messages') ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>Messages</Link>
            <Link to="/contractor/settings" className={`mx-3 ${location.pathname.includes('/contractor/settings') ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>Settings</Link>
          </>
        );
      case 'owner':
        return (
          <>
            <Link to="/owner/dashboard" className={`mx-3 ${location.pathname.includes('/owner/dashboard') ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>Dashboard</Link>
            <Link to="/owner/vehicles" className={`mx-3 ${location.pathname.includes('/owner/vehicles') ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>Vehicles</Link>
            <Link to="/owner/applications" className={`mx-3 ${location.pathname.includes('/owner/applications') ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>Applications</Link>
            <Link to="/owner/settings" className={`mx-3 ${location.pathname.includes('/owner/settings') ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>Settings</Link>
          </>
        );
      default:
        return (
          <>
            <Link to="/" className={`mx-3 ${location.pathname === '/' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>Home</Link>
            <Link to="/about" className={`mx-3 ${location.pathname === '/about' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>About</Link>
          </>
        );
    }
  };

  const getPortalName = () => {
    switch(userType) {
      case 'worker':
        return 'WorkerPortal';
      case 'contractor':
        return 'Employer Portal';
      case 'owner':
        return 'Vehicle Owner Portal';
      default:
        return 'Rojgar Setu';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full top-0 left-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" className="h-8 w-8 rounded-full mr-2" alt="Profile" />
            <span className="text-xl font-semibold text-blue-600">{getPortalName()}</span>
          </Link>
          {user && (
            <div className="hidden md:flex ml-10">
              {getNavLinks()}
            </div>
          )}
        </div>
        
        {user && (
          <div className="flex items-center">
            <NotificationBell />
            <div className="flex items-center ml-4">
              <img 
                src={user.image || "/avatar.png"} 
                className="h-8 w-8 rounded-full border border-gray-300" 
                alt="Profile" 
              />
              <div className="ml-2 hidden md:block">
                <p className="text-sm font-medium">{user.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;