"use client"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
// import { getOwnerProfile, updateOwnerProfile } from "../../redux/actions"
import { AlertCircle, CheckCircle, Edit, Eye, FileText, MapPin, Plus, Upload, User, X } from "lucide-react"

const OwnerProfile = () => {
  const dispatch = useDispatch()
  // const { ownerProfile, loading } = useSelector(state => state.profile);
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
    location: "",
    vehicleTypes: [],
    instrumentTypes: [],
    bankDetails: {
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      bankName: "",
    },
  })
  const [newVehicleType, setNewVehicleType] = useState("")
  const [newInstrumentType, setNewInstrumentType] = useState("")
  const [previewImage, setPreviewImage] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [profileCompletion, setProfileCompletion] = useState(0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Sample data for testing without backend
  const sampleOwnerProfile = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    image: "https://via.placeholder.com/150",
    location: "New York, USA",
    vehicleTypes: ["Truck", "Excavator", "Bulldozer"],
    instrumentTypes: ["Piano", "Guitar", "Violin"],
    bankDetails: {
      accountNumber: "123456789012",
      ifscCode: "ABCD0123456",
      accountHolderName: "John Doe",
      bankName: "Bank of America",
    },
    profileCompletion: 75,
  }

  // Assign sample data to Redux state for testing
  const ownerProfile = sampleOwnerProfile
  // Fetch profile data from Redux
  useEffect(() => {
    // dispatch(getOwnerProfile())
  }, [dispatch])

  // Set form data from Redux state when available
  useEffect(() => {
    if (ownerProfile) {
      setFormData({
        name: ownerProfile.name || "",
        email: ownerProfile.email || "",
        phone: ownerProfile.phone || "",
        image: ownerProfile.image || null,
        location: ownerProfile.location || "",
        vehicleTypes: ownerProfile.vehicleTypes || [],
        instrumentTypes: ownerProfile.instrumentTypes || [],
        bankDetails: ownerProfile.bankDetails || {
          accountNumber: "",
          ifscCode: "",
          accountHolderName: "",
          bankName: "",
        },
      })
      setProfileCompletion(ownerProfile.profileCompletion || 0)
      if (ownerProfile.image) {
        setPreviewImage(ownerProfile.image)
      }
    }
  }, [ownerProfile])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onBankDetailsChange = (e) => {
    setFormData({
      ...formData,
      bankDetails: { ...formData.bankDetails, [e.target.name]: e.target.value },
    })
  }

  const handleImageChange = async (e) => {
     const file = e.target.files[0]
       if (!file) return
   
       const reader = new FileReader()
       reader.onload = () => {
         setPreviewImage(reader.result)
       }
       reader.readAsDataURL(file)
   
       const formDataObj = new FormData()
       formDataObj.append("file", file)
   
       setUploadingImage(true)
       try {
        //  const response = await dispatch(updateOwnerImage(formDataObj))
         setFormData((prevState) => ({
           ...prevState,
           image: response.payload.imageUrl,
         }))
         setSuccess("Image uploaded successfully!")
       } catch (err) {
         setError("Error uploading image. Please try again.")
       } finally {
         setUploadingImage(false)
       }
  }

  const addVehicleType = (e) => {
    e.preventDefault()
    if (!newVehicleType.trim()) return
    setFormData((prev) => ({
      ...prev,
      vehicleTypes: [...prev.vehicleTypes, newVehicleType.trim()],
    }))
    setNewVehicleType("")
  }

  const removeVehicleType = (index) => {
    const updatedTypes = [...formData.vehicleTypes]
    updatedTypes.splice(index, 1)
    setFormData({ ...formData, vehicleTypes: updatedTypes })
  }

  const addInstrumentType = (e) => {
    e.preventDefault()
    if (!newInstrumentType.trim()) return
    setFormData((prev) => ({
      ...prev,
      instrumentTypes: [...prev.instrumentTypes, newInstrumentType.trim()],
    }))
    setNewInstrumentType("")
  }

  const removeInstrumentType = (index) => {
    const updatedTypes = [...formData.instrumentTypes]
    updatedTypes.splice(index, 1)
    setFormData({ ...formData, instrumentTypes: updatedTypes })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      await dispatch(updateOwnerProfile(formData))
      setSuccess("Profile updated successfully!")
      setIsEditing(false)
      window.scrollTo(0, 0)
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  // Helper functions for profile completion color/message
  const getCompletionColor = () => {
    if (profileCompletion < 30) return "bg-red-500"
    if (profileCompletion < 60) return "bg-yellow-500"
    if (profileCompletion < 90) return "bg-blue-500"
    return "bg-green-500"
  }

  const getCompletionMessage = () => {
    if (profileCompletion < 30) return "Your profile needs attention! Complete it to increase visibility."
    if (profileCompletion < 60) return "You're making progress! Keep adding details to your profile."
    if (profileCompletion < 90) return "Your profile is looking good! Just a few more details to complete."
    return "Excellent! Your profile is complete and will attract more clients."
  }

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl rounded-2xl">
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-t-2xl">
            <div>
              <h1 className="text-2xl font-bold text-white">Vehicle/Instrument Owner Profile</h1>
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

          {/* Tabs */}
          <div className="px-6 pt-6 border-b">
            <div className="flex space-x-4">
              <button
                className={`pb-2 px-1 text-sm font-medium ${
                  activeTab === "profile"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                className={`pb-2 px-1 text-sm font-medium ${
                  activeTab === "assets"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("assets")}
              >
                Assets
              </button>
              <button
                className={`pb-2 px-1 text-sm font-medium ${
                  activeTab === "banking"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("banking")}
              >
                Banking
              </button>
            </div>
          </div>

          {/* Owner Profile Form */}
          <form onSubmit={onSubmit}>
            {/* Profile Tab Content */}
            {activeTab === "profile" && (
              <div className="px-6 py-5">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Profile Image */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shadow-md border-4 border-white">
                      {previewImage ? (
                        <img
                          src={previewImage || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-16 w-16 text-gray-300" />
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

                    <div className="mt-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{formData.location || "No location set"}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Member since Jan 2023</p>
                    </div>
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
                            required
                          />
                        ) : (
                          <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">
                            {formData.location || "Not specified"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Assets Tab Content */}
            {activeTab === "assets" && (
              <div className="px-6 py-5">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  {/* Vehicle Types */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Vehicle Types</h3>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id="newVehicleType"
                            value={newVehicleType}
                            onChange={(e) => setNewVehicleType(e.target.value)}
                            placeholder="e.g. Truck, Excavator"
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={addVehicleType}
                            className="px-3 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition text-sm flex items-center"
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {formData.vehicleTypes.length === 0 && (
                            <p className="text-sm text-gray-500 italic">No vehicle types added yet</p>
                          )}

                          {formData.vehicleTypes.map((type, index) => (
                            <div
                              key={index}
                              className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center"
                            >
                              {type}
                              <button
                                type="button"
                                onClick={() => removeVehicleType(index)}
                                className="ml-1.5 text-blue-600 hover:text-blue-800 focus:outline-none"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {formData.vehicleTypes.length === 0 && (
                            <p className="text-sm text-gray-500 italic">No vehicle types added yet</p>
                          )}

                          {formData.vehicleTypes.map((type, index) => (
                            <div
                              key={index}
                              className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium px-2.5 py-1.5 rounded-full"
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Instrument Types */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Instrument Types</h3>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id="newInstrumentType"
                            value={newInstrumentType}
                            onChange={(e) => setNewInstrumentType(e.target.value)}
                            placeholder="e.g. Piano, Guitar"
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={addInstrumentType}
                            className="px-3 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition text-sm flex items-center"
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {formData.instrumentTypes.length === 0 && (
                            <p className="text-sm text-gray-500 italic">No instrument types added yet</p>
                          )}

                          {formData.instrumentTypes.map((type, index) => (
                            <div
                              key={index}
                              className="bg-green-50 border border-green-200 text-green-800 text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center"
                            >
                              {type}
                              <button
                                type="button"
                                onClick={() => removeInstrumentType(index)}
                                className="ml-1.5 text-green-600 hover:text-green-800 focus:outline-none"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {formData.instrumentTypes.length === 0 && (
                            <p className="text-sm text-gray-500 italic">No instrument types added yet</p>
                          )}

                          {formData.instrumentTypes.map((type, index) => (
                            <div
                              key={index}
                              className="bg-green-50 border border-green-200 text-green-800 text-xs font-medium px-2.5 py-1.5 rounded-full"
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Asset Gallery */}
                  <div className="sm:col-span-2 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Asset Gallery</h3>
                      {isEditing && (
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium rounded-md hover:bg-blue-100"
                        >
                          <Upload className="h-3.5 w-3.5 mr-1" /> Add Photos
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      {isEditing && (
                        <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                          <Plus className="h-6 w-6 text-gray-400" />
                          <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Banking Tab Content */}
            {activeTab === "banking" && (
              <div className="px-6 py-5">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Bank Account Details</h3>
                  </div>

                  <p className="text-sm text-gray-500 mb-6">
                    These details are used for payment processing and will be kept secure
                  </p>

                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700">
                        Account Holder Name
                      </label>
                      <div className="mt-1">
                        {isEditing ? (
                          <input
                            type="text"
                            name="accountHolderName"
                            id="accountHolderName"
                            value={formData.bankDetails.accountHolderName}
                            onChange={onBankDetailsChange}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">
                            {formData.bankDetails.accountHolderName || "Not provided"}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                        Bank Name
                      </label>
                      <div className="mt-1">
                        {isEditing ? (
                          <input
                            type="text"
                            name="bankName"
                            id="bankName"
                            value={formData.bankDetails.bankName}
                            onChange={onBankDetailsChange}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">
                            {formData.bankDetails.bankName || "Not provided"}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                        Account Number
                      </label>
                      <div className="mt-1">
                        {isEditing ? (
                          <input
                            type="text"
                            name="accountNumber"
                            id="accountNumber"
                            value={formData.bankDetails.accountNumber}
                            onChange={onBankDetailsChange}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">
                            {formData.bankDetails.accountNumber
                              ? "••••••" + formData.bankDetails.accountNumber.slice(-4)
                              : "Not provided"}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">
                        IFSC Code
                      </label>
                      <div className="mt-1">
                        {isEditing ? (
                          <input
                            type="text"
                            name="ifscCode"
                            id="ifscCode"
                            value={formData.bankDetails.ifscCode}
                            onChange={onBankDetailsChange}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">
                            {formData.bankDetails.ifscCode || "Not provided"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Please ensure your bank details are accurate. Incorrect information may delay payments.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="px-6 py-5 border-t border-gray-200 flex justify-end">
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
  )
}

export default OwnerProfile

