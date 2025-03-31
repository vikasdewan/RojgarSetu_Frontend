import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createJobPosting } from '../../redux/actions'; // Adjust the path as needed
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Layout from '../Layout/Layout';

const JobPostingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    payscale: '',
    requiredSkill: '',
    experienceRequired: '',
    noOfWorkers: '',
    duration: '',
    location: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { title, payscale, requiredSkill, experienceRequired, noOfWorkers, duration, location, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Dispatch the create job posting action
      await dispatch(createJobPosting(formData));
      toast.success('Job post created successfully!');
      navigate('/contractor/dashboard'); // Redirect after successful submission
    } catch (err) {
      const msg = err.response?.data?.message || 'Job posting creation failed. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <motion.section
        className="min-h-screen flex items-center justify-center bg-[#E9F1FA] py-12 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-lg md:max-w-4xl bg-white p-8 my-4 rounded-lg shadow-lg">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-black mb-1">Create Job Posting</h2>
            <p className="text-sm text-gray-600">
              Fill out the details below to post a new job.
            </p>
          </div>

          {error && (
            <motion.div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={onSubmit} className="w-full">
            {/* Job Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-black font-bold mb-2">
                Job Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter job title"
                required
                value={title}
                onChange={onChange}
                className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Payscale & Required Skill */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="payscale" className="block text-black font-bold mb-2">
                  Payscale
                </label>
                <input
                  id="payscale"
                  name="payscale"
                  type="number"
                  placeholder="Payscale"
                  required
                  value={payscale}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label htmlFor="requiredSkill" className="block text-black font-bold mb-2">
                  Required Skill
                </label>
                <input
                  id="requiredSkill"
                  name="requiredSkill"
                  type="text"
                  placeholder="Skill required"
                  required
                  value={requiredSkill}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Experience & Number of Workers */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="experienceRequired" className="block text-black font-bold mb-2">
                  Experience (years)
                </label>
                <input
                  id="experienceRequired"
                  name="experienceRequired"
                  type="number"
                  placeholder="Experience"
                  required
                  value={experienceRequired}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label htmlFor="noOfWorkers" className="block text-black font-bold mb-2">
                  No. of Workers
                </label>
                <input
                  id="noOfWorkers"
                  name="noOfWorkers"
                  type="number"
                  placeholder="Number of workers"
                  required
                  value={noOfWorkers}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Duration & Location */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-black font-bold mb-2">
                  Duration (days)
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  placeholder="Duration"
                  required
                  value={duration}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-black font-bold mb-2">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Location"
                  required
                  value={location}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-black font-bold mb-2">
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe the job responsibilities and requirements"
                required
                rows="4"
                value={description}
                onChange={onChange}
                className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-600"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <Link
                to="/contractor/dashboard"
                className="text-lg mt-2 text-blue-600 hover:text-red-600 mr-4"
              >
                Cancel
              </Link>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-blue-600 text-blue-600 px-5 py-2 rounded font-bold hover:bg-blue-600 hover:text-white transition"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Posting...
                  </span>
                ) : (
                  'Post Job'
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.section>
    </Layout>
  );
};

export default JobPostingForm;
