import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';

const WorkerDashboard = () => {
  const dispatch = useDispatch();
  const { workerDashboard, loading } = useSelector(state => state.job);
  const { user } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('applied');
  
  // useEffect(() => {
  //   dispatch(getWorkerDashboard());
  // }, [dispatch]);
  
  // if (loading || !workerDashboard) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }
  
  // const { appliedJobs, offerLetterJobs, joiningLetterJobs } = workerDashboard;
  const appliedJobs = 
    [
      {
        _id: '1',
        title: 'Software Developer',
        status: 'considering',
        payscale: 500,
        location: 'New York',
        appliedAt: '2023-03-01T00:00:00Z',
      },
      {
        _id: '2',
        title: 'Data Analyst',
        status: 'underreview',
        payscale: 400,
        location: 'San Francisco',
        appliedAt: '2023-03-05T00:00:00Z',
      },
      {
        _id: '3',
        title: 'Web Designer',
        status: 'rejected',
        payscale: 300,
        location: 'Los Angeles',
        appliedAt: '2023-03-10T00:00:00Z',
      },
    ]
  const offerLetterJobs = [
    {
      _id: '4',
      title: 'Frontend Developer',
      status: 'offerSent',
      payscale: 600,
      location: 'Seattle',
      offerSentAt: '2023-03-15T00:00:00Z',
    },
    {
      _id: '5',
      title: 'Backend Developer',
      status: 'offerAccepted',
      payscale: 700,
      location: 'Austin',
      offerSentAt: '2023-03-20T00:00:00Z',
    },
  ];

  const joiningLetterJobs = [
    {
      _id: '6',
      title: 'Full Stack Developer',
      status: 'joiningLetterSent',
      payscale: 800,
      location: 'Chicago',
      joiningDate: '2023-04-01T00:00:00Z',
    },
    {
      _id: '7',
      title: 'DevOps Engineer',
      status: 'joiningLetterSent',
      payscale: 900,
      location: 'Boston',
      joiningDate: '2023-04-05T00:00:00Z',
    },
  ];

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'considering':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Considering</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Rejected</span>;
      case 'underreview':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Under Review</span>;
      case 'offerSent':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Offer Sent</span>;
      case 'offerAccepted':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Offer Accepted</span>;
      case 'joiningLetterSent':
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Joining Letter Sent</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Worker Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Welcome, {user?.name}</span>
            <Link to="/worker/profile" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View Profile
            </Link>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`${
                  activeTab === 'applied'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('applied')}
              >
                Applied Jobs
                <span className="ml-2 py-0.5 px-2.5 text-xs rounded-full bg-gray-100">
                  {appliedJobs?.length}
                </span>
              </button>
              
              <button
                className={`${
                  activeTab === 'offer'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('offer')}
              >
                Offer Letters
                <span className="ml-2 py-0.5 px-2.5 text-xs rounded-full bg-gray-100">
                  {offerLetterJobs?.length}
                </span>
              </button>
              
              <button
                className={`${
                  activeTab === 'joining'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('joining')}
              >
                Joining Letters
                <span className="ml-2 py-0.5 px-2.5 text-xs rounded-full bg-gray-100">
                  {joiningLetterJobs?.length}
                </span>
              </button>
            </nav>
          </div>
          
          <div className="mt-6">
            {activeTab === 'applied' && (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {appliedJobs?.length > 0 ? (
                    appliedJobs?.map(job => (
                      <li key={job._id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-blue-600 truncate">{job.title}</p>
                              <div className="ml-2">
                                {renderStatusBadge(job.status)}
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                ₹{job.payscale}/day
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {job.location}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                Applied on {new Date(job.appliedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-5 sm:px-6">
                      <div className="text-center text-gray-500">
                        <p>You haven't applied to any jobs yet.</p>
                        <Link to="/jobs" className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Browse Jobs
                        </Link>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}
            
            {activeTab === 'offer' && (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {offerLetterJobs.length > 0 ? (
                    offerLetterJobs.map(job => (
                      <li key={job._id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-blue-600 truncate">{job.title}</p>
                              <div className="ml-2">
                                {renderStatusBadge(job.status)}
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex space-x-2">
                              <Link to={`/pdf/offer/${job._id}`} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                View Offer
                              </Link>
                              <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                Accept
                              </button>
                              <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                Reject
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {job.location}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                </svg>
                                ₹{job.payscale}/day
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-5 sm:px-6">
                      <div className="text-center text-gray-500">
                        <p>You don't have any offer letters yet.</p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}
            
            {activeTab === 'joining' && (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {joiningLetterJobs.length > 0 ? (
                    joiningLetterJobs.map(job => (
                      <li key={job._id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-blue-600 truncate">{job.title}</p>
                              <div className="ml-2">
                                {renderStatusBadge(job.status)}
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <Link to={`/pdf/joining/${job._id}`} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                View Joining Letter
                              </Link>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {job.location}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                Joining Date: {new Date(job.joiningDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-5 sm:px-6">
                      <div className="text-center text-gray-500">
                        <p>You don't have any joining letters yet.</p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkerDashboard;