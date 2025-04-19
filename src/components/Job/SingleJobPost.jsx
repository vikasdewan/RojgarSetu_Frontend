import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
// Assume these actions are defined in your redux actions file
import { updateJobPosting, deleteJobPosting } from '../../redux/actions';
import Layout from '../Layout/Layout';

const SingleJobPost = () => {
  const { id } = useParams(); // Job post id
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  // Local state for form fields (pre-filled with job details)
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

  // Fetch job details on mount
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/api/job/${id}`);
        setJob(res.data);
        // Pre-fill form with existing job details
        setFormData({
          title: res.data.title || '',
          payscale: res.data.payscale || '',
          requiredSkill: res.data.requiredSkill || '',
          experienceRequired: res.data.experienceRequired || '',
          noOfWorkers: res.data.noOfWorkers || '',
          duration: res.data.duration || '',
          location: res.data.location || '',
          description: res.data.description || ''
        });
      } catch (err) {
        setError('Error fetching job details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update submission
  const onUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await dispatch(updateJobPosting(id, formData));
      toast.success('Job post updated successfully!');
      // Optionally refresh job details or navigate back to dashboard
      navigate('/contractor/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Update failed. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const onDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job post?')) return;
    setSubmitting(true);
    try {
      await dispatch(deleteJobPosting(id));
      toast.success('Job post deleted successfully!');
      navigate('/contractor/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Deletion failed. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow rounded-lg p-6">
            <div className="text-center text-red-600">
              <p>Job post not found or unauthorized.</p>
              <Link to="/contractor/dashboard" className="text-blue-600 hover:text-blue-500 mt-4 inline-block">
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <motion.section
        className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-extrabold text-black">Edit Job Post</h2>
            <button
              onClick={onDelete}
              disabled={submitting}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
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

          <form onSubmit={onUpdate} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-black font-bold mb-2">
                Job Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={onChange}
                className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="payscale" className="block text-black font-bold mb-2">
                  Payscale (₹/day)
                </label>
                <input
                  id="payscale"
                  name="payscale"
                  type="number"
                  required
                  value={formData.payscale}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-600"
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
                  required
                  value={formData.requiredSkill}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="experienceRequired" className="block text-black font-bold mb-2">
                  Experience Required (years)
                </label>
                <input
                  id="experienceRequired"
                  name="experienceRequired"
                  type="number"
                  required
                  value={formData.experienceRequired}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-600"
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
                  required
                  value={formData.noOfWorkers}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-black font-bold mb-2">
                  Duration (days)
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  required
                  value={formData.duration}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-600"
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
                  required
                  value={formData.location}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-black font-bold mb-2">
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={onChange}
                className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-600"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 border border-blue-600 text-blue-600 rounded font-bold hover:bg-blue-600 hover:text-white transition disabled:opacity-50"
              >
                {submitting ? 'Updating...' : 'Update Job Post'}
              </button>
            </div>
          </form>
        </div>
      </motion.section>
    </Layout>
  );
};

export default SingleJobPost;
