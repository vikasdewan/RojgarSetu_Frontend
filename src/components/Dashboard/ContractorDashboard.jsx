import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getContractorJobPostings, getContractorVehicleForms } from '../../redux/actions';
import JobPostingsList from '../Job/JobPostingsList';
import VehicleFormsList from '../Vehicle/VehicleFormsList';

const ContractorDashboard = () => {
  const dispatch = useDispatch();
  const { jobPostings, loading: jobsLoading } = useSelector(state => state.jobs);
  const { vehicleForms, loading: formsLoading } = useSelector(state => state.vehicles);
  const { user } = useSelector(state => state.auth);
  
  const [activeView, setActiveView] = useState('jobs');

  useEffect(() => {
    dispatch(getContractorJobPostings());
    dispatch(getContractorVehicleForms());
  }, [dispatch]);

  // Calculate statistics
  const totalApplications = jobPostings.reduce((total, job) => total + job.applications.length, 0);
  const offersSent = jobPostings.reduce((total, job) => 
    total + job.applications.filter(app => 
      ['offerSent', 'offerAccepted', 'joiningLetterSent'].includes(app.status)
    ).length, 0
  );
  const acceptedOffers = jobPostings.reduce((total, job) => 
    total + job.applications.filter(app => 
      ['offerAccepted', 'joiningLetterSent'].includes(app.status)
    ).length, 0
  );
  const pendingReview = jobPostings.reduce((total, job) => 
    total + job.applications.filter(app => app.status === 'underreview').length, 0
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
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
                  <Link to="/contractor/profile" className="font-medium underline text-yellow-700 hover:text-yellow-600">
                    Complete your profile
                  </Link> to post jobs and vehicle forms.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Applications</p>
              <p className="text-2xl font-semibold text-gray-900">{totalApplications}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Offers Sent</p>
              <p className="text-2xl font-semibold text-gray-900">{offersSent}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Accepted Offers</p>
              <p className="text-2xl font-semibold text-gray-900">{acceptedOffers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold text-gray-900">{pendingReview}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveView('jobs')}
            className={`flex-1 py-4 px-6 text-center font-medium text-sm ${
              activeView === 'jobs'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Job Postings
          </button>
          <button
            onClick={() => setActiveView('vehicles')}
            className={`flex-1 py-4 px-6 text-center font-medium text-sm ${
              activeView === 'vehicles'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Vehicle/Instrument Forms
          </button>
        </div>
        
        <div className="p-4">
          {activeView === 'jobs' ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Your Job Postings</h2>
                <Link
                  to="/contractor/job-postings/create"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Post New Job
                </Link>
              </div>
              
              {jobsLoading ? (
                <div className="text-center py-10">Loading job postings...</div>
              ) : jobPostings.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">You haven't posted any jobs yet.</p>
                  <Link 
                    to="/contractor/job-postings/create"
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                  >
                    Create your first job posting
                  </Link>
                </div>
              ) : (
                <JobPostingsList jobPostings={jobPostings} />
              )}
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Your Vehicle/Instrument Forms</h2>
                <Link
                  to="/contractor/vehicle-forms/create"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Post New Form
                </Link>
              </div>
              
              {formsLoading ? (
                <div className="text-center py-10">Loading vehicle forms...</div>
              ) : vehicleForms.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">You haven't posted any vehicle/instrument forms yet.</p>
                  <Link 
                    to="/contractor/vehicle-forms/create"
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                  >
                    Create your first vehicle form
                  </Link>
                </div>
              ) : (
                <VehicleFormsList vehicleForms={vehicleForms} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractorDashboard;