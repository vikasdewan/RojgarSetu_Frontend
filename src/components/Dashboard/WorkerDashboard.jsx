import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWorkerApplications, getRecommendedJobs } from '../../redux/actions';
import ApplicationCard from '../Job/ApplicationCard';
import JobCard from '../Job/JobCard';

const WorkerDashboard = () => {
  const dispatch = useDispatch();
  const { applications, loading: appLoading } = useSelector(state => state.applications);
  const { recommendedJobs, loading: recLoading } = useSelector(state => state.recommendations);
  const { user } = useSelector(state => state.auth);
  
  const [activeTab, setActiveTab] = useState('applied');

  useEffect(() => {
    dispatch(getWorkerApplications());
    dispatch(getRecommendedJobs());
  }, [dispatch]);

  // Filter applications by status
  const appliedApplications = applications.filter(app => 
    ['considering', 'rejected', 'underreview'].includes(app.status)
  );
  
  const offerLetterApplications = applications.filter(app => 
    ['offerSent', 'offerAccepted'].includes(app.status)
  );
  
  const joiningLetterApplications = applications.filter(app => 
    app.status === 'joiningLetterSent'
  );

  const renderApplications = () => {
    let appsToRender = [];
    
    switch(activeTab) {
      case 'applied':
        appsToRender = appliedApplications;
        break;
      case 'offers':
        appsToRender = offerLetterApplications;
        break;
      case 'joining':
        appsToRender = joiningLetterApplications;
        break;
      default:
        appsToRender = appliedApplications;
    }
    
    if (appLoading) {
      return <div className="text-center py-10">Loading applications...</div>;
    }
    
    if (appsToRender.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500">No applications found in this category.</p>
          {activeTab === 'applied' && (
            <Link to="/worker/jobs" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
              Browse available jobs
            </Link>
          )}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 gap-4">
        {appsToRender.map(application => (
          <ApplicationCard key={application._id} application={application} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Worker Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        
        {user?.profileCompletion < 90 && (
          <div className="mt-4 md:mt-0 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Your profile is only {user.profileCompletion}% complete. 
                  <Link to="/worker/profile" className="font-medium underline text-yellow-700 hover:text-yellow-600">
                    Complete your profile
                  </Link> to apply for jobs.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('applied')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'applied'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Applied Jobs
                  {appliedApplications.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                      {appliedApplications.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('offers')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'offers'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Offer Letters
                  {offerLetterApplications.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                      {offerLetterApplications.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('joining')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'joining'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Joining Letters
                  {joiningLetterApplications.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                      {joiningLetterApplications.length}
                    </span>
                  )}
                </button>
              </nav>
            </div>
            <div className="p-4">
              {renderApplications()}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recommended Jobs
              </h3>
            </div>
            <div className="p-4">
              {recLoading ? (
                <div className="text-center py-10">Loading recommendations...</div>
              ) : recommendedJobs.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No recommended jobs found.</p>
                  <p className="text-gray-500 text-sm mt-2">Complete your profile to get better recommendations.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendedJobs.slice(0, 3).map(job => (
                    <JobCard key={job._id} job={job} compact={true} />
                  ))}
                  <div className="text-center pt-2">
                    <Link to="/worker/jobs" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View all jobs
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
            <div className="px-4 py-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Profile Completion
              </h3>
            </div>
            <div className="p-4">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium text-gray-700">{user?.profileCompletion || 0}% Complete</span>
                {user?.profileCompletion >= 90 ? (
                  <span className="text-xs text-green-600 font-medium">✓ Eligible to apply</span>
                ) : (
                  <span className="text-xs text-yellow-600 font-medium">Need {90 - (user?.profileCompletion || 0)}% more</span>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${user?.profileCompletion >= 90 ? 'bg-green-600' : 'bg-blue-600'}`}
                  style={{ width: `${user?.profileCompletion || 0}%` }}
                ></div>
              </div>
              
              {user?.profileCompletion < 90 && (
                <div className="mt-4">
                  <Link 
                    to="/worker/profile" 
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Complete Profile
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;