import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast'; // Import react-hot-toast
import Layout from '../Layout/Layout'; // Import your Layout component

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'worker' // Default user type
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { name, email, phone, password, confirmPassword, userType } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { userId } = await dispatch(register({ name, email, phone, password }, userType));
      toast.success('Registration successful!');
      navigate('/verify-otp', { state: { userId } });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
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
        {/* Heading & Sign-In Link */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-black mb-1">Create Your Account</h2>
          <p className="text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
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

        {/* Registration Form */}
        <form onSubmit={onSubmit} className="w-full">
          {/* Full Name */}
          <div className="md:flex mb-6">
            <div className="md:w-1/3 text-left">
              <label
                htmlFor="name"
                className="block text-black font-bold mb-1 md:mb-0"
              >
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                required
                value={name}
                onChange={onChange}
                className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

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

          {/* Phone */}
          <div className="md:flex mb-6">
            <div className="md:w-1/3 text-left">
              <label
                htmlFor="phone"
                className="block text-black font-bold mb-1 md:mb-0"
              >
                Phone
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your phone number"
                required
                value={phone}
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

          {/* Confirm Password */}
          <div className="md:flex mb-6">
            <div className="md:w-1/3 text-left">
              <label
                htmlFor="confirmPassword"
                className="block text-black font-bold mb-1 md:mb-0"
              >
                Confirm
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                required
                value={confirmPassword}
                onChange={onChange}
                className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* User Type */}
          <div className="md:flex mb-6">
            <div className="md:w-1/3 text-left">
              <label className="block text-black font-bold mb-1 md:mb-0">
                Register as
              </label>
            </div>
            <div className="md:w-2/3 flex items-center gap-4">
              {['worker', 'contractor', 'owner'].map((type) => (
                <label
                  key={type}
                  className="flex items-center text-gray-700 font-medium cursor-pointer"
                >
                  <input
                    type="radio"
                    name="userType"
                    value={type}
                    checked={userType === type}
                    onChange={onChange}
                    className="form-radio h-5 w-5 text-blue-600 mr-2 focus:outline-none focus:ring-0 focus:border-blue-600"
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:flex">
            <div className="md:w-1/3" />
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
                    Registering...
                  </span>
                ) : (
                  'Register'
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

export default Register;
