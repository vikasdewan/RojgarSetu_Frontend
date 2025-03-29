import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContractorProfile, updateContractorProfile, updateContractorImage } from '../../redux/actions';
import { Activity, AlertCircle, CheckCircle, Edit, Eye, Upload, User } from 'lucide-react';

const ContractorProfile = () => {
  const dispatch = useDispatch();
  const { contractorProfile, loading } = useSelector(state => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    image: null,
    location: '',
    role: '',
    workProfile: '',
    organizationName: '',
    completedProjects: []
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Sample data for testing
  const sampleContractorProfile = {
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "9876543210",
    image: "https://via.placeholder.com/150",
    location: "New York, NY",
    role: "General Contractor",
    workProfile: "Residential and Commercial Construction",
    organizationName: "Smith Construction Co.",
    completedProjects: [
      { projectName: "Office Building", location: "Downtown", duration: "6 months" },
      { projectName: "Residential Complex", location: "Uptown", duration: "1 year" }
    ],
    profileCompletion: 75,
  };

  // Fetch contractor profile data
  useEffect(() => {
    dispatch(getContractorProfile());
  }, [dispatch]);

  // Set form data from Redux state
  useEffect(() => {
    if (contractorProfile) {
      setFormData({
        name: contractorProfile.name || '',
        email: contractorProfile.email || '',
        phone: contractorProfile.phone || '',
        image: contractorProfile.image || null,
        location: contractorProfile.location || '',
        role: contractorProfile.role || '',
        workProfile: contractorProfile.workProfile || '',
        organizationName: contractorProfile.organizationName || '',
        completedProjects: contractorProfile.completedProjects || []
      });
      setProfileCompletion(contractorProfile.profileCompletion || 0);
      if (contractorProfile.image) {
        setPreviewImage(contractorProfile.image);
      }
    } else {
      // Use sample data if no profile is available
      setTimeout(() => {
        setFormData(sampleContractorProfile);
        setProfileCompletion(sampleContractorProfile.profileCompletion);
        setPreviewImage(sampleContractorProfile.image);
      }, 1000);
    }
  }, [contractorProfile]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    setUploadingImage(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append('file', file);
      const response = await dispatch(updateContractorImage(formDataObj));
      setFormData(prevState => ({
        ...prevState,
        image: response.payload.imageUrl,
      }));
      setSuccess("Image uploaded successfully!");
    } catch (err) {
      setError("Error uploading image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await dispatch(updateContractorProfile(formData));
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getCompletionColor = () => {
    if (profileCompletion < 30) return "bg-red-500";
    if (profileCompletion < 60) return "bg-yellow-500";
    if (profileCompletion < 90) return "bg-blue-500";
    return "bg-green-500";
  };

  const getCompletionMessage = () => {
    if (profileCompletion < 30) return "Your profile needs attention! Complete it to increase visibility.";
    if (profileCompletion < 60) return "You're making progress! Keep adding details to your profile.";
    if (profileCompletion < 90) return "Your profile is looking good! Just a few more details to complete.";
    return "Excellent! Your profile is complete and will attract more clients.";
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl h-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl rounded-2xl">
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-t-2xl">
            <div>
              <h1 className="text-2xl font-bold text-white">Contractor Profile</h1>
              <p className="mt-1 text-sm text-blue-100">{getCompletionMessage()}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-32 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${getCompletionColor()}`}
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-white">{profileCompletion}%</span>
              </div>
              <button
                className="inline-flex items-center px-3 py-1.5 bg-white text-xs font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <Eye className="h-3.5 w-3.5 mr-1" /> View Mode
                  </>
                ) : (
                  <>
                    <Edit className="h-3.5 w-3.5 mr-1" /> Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mx-6 mt-6" role="alert">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mx-6 mt-6" role="alert">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>{success}</span>
              </div>
            </div>
          )}

          {/* Profile Form */}
          <form onSubmit={onSubmit} className="px-6 py-5">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shadow-md border-4 border-white">
                  {previewImage ? (
                    <img
                      src={previewImage || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User  className="h-16 w-16 text-gray-300" />
                  )}

                  {uploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <label
                    htmlFor="image-upload"
                    className="mt-3 cursor-pointer inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    <Upload className="h-3.5 w-3.5 mr-1" />
                    <span>{formData.image ? "Change Photo" : "Upload Photo"}</span>
                    <input
                      id="image-upload"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                )}
              </div>

              {/* Personal Information */}
              <div className="flex-1 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    ) : (
                      <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">{formData.name}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={onChange}
                      className="w-full p-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    ) : (
                      <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">{formData.phone}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <div className="mt-1">
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">{formData.location}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <div className="mt-1">
                    {isEditing ? (
                      <input
                        type="text"
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">{formData.role}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="workProfile" className="block text-sm font-medium text-gray-700">
                    Work Profile
                  </label>
                  <div className="mt-1">
                    {isEditing ? (
                      <textarea
                        id="workProfile"
                        name="workProfile"
                        rows={3}
                        value={formData.workProfile}
                        onChange={onChange}
                        placeholder="Describe your work profile"
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                      ></textarea>
                    ) : (
                      <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200 min-h-[80px]">
                        {formData.workProfile || "No work profile listed"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
                    Organization Name
                  </label>
                  <div className="mt-1">
                    {isEditing ? (
                      <input
                        type="text"
                        name="organizationName"
                        id="organizationName"
                        value={formData.organizationName}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">{formData.organizationName}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mr-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContractorProfile;