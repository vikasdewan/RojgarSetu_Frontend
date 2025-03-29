import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast'; // Import react-hot-toast
import Layout from '../Layout/Layout';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await dispatch(login(email, password));
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
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
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        {/* Heading & Register Link */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-black mb-1">Sign in to your account</h2>
          <p className="text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        {/* Error Alert */}
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

        {/* Login Form */}
        <form onSubmit={onSubmit} className="w-full">
          {/* Email */}
          <div className="md:flex mb-6">
            <div className="md:w-1/3 text-left">
              <label
                htmlFor="email"
                className="block text-black font-bold mb-1 md:mb-0"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={onChange}
                className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Password */}
          <div className="md:flex mb-6">
            <div className="md:w-1/3 text-left">
              <label
                htmlFor="password"
                className="block text-black font-bold mb-1 md:mb-0"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
                value={password}
                onChange={onChange}
                className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:flex">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-blue-600 text-blue-600 px-5 py-2 rounded w-full hover:bg-blue-600 hover:text-white transition shadow font-bold"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
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
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </motion.section>
    </Layout>
  );
};

export default Login;
