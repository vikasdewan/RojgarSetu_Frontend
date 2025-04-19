"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { getWorkerProfile, updateWorkerProfile, updateWorkerImage, updateWorkerResume } from "../../redux/actions"
import { Activity, AlertCircle, CheckCircle, Edit, Eye, FileText, Upload, User } from "lucide-react"

const WorkerProfile = () => {
  const dispatch = useDispatch()
  const { workerProfile, loading } = useSelector((state) => state.profile)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentStatus: "unemployed",
    lookingFor: "",
    pastExperience: "",
    expectedSalary: "",
    image: null,
    resume: null,
  })
  const [previewImage, setPreviewImage] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [profileCompletion, setProfileCompletion] = useState(0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("profile")

  // Use sample data for testing - this would be replaced by actual Redux data
  const sampleWorkerProfile = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    currentStatus: "unemployed",
    lookingFor: "Plumbing, Carpentry",
    pastExperience:
      "Worked as a plumber for 5 years. Specialized in residential plumbing installations and repairs. Also have experience with basic carpentry work including furniture assembly and minor home repairs.",
    expectedSalary: "500",
    image: "https://via.placeholder.com/150",
    resume: "https://example.com/sample-resume.pdf",
    profileCompletion: 35,
  }

  // Get profile data from Redux
  useEffect(() => {
    // dispatch(getWorkerProfile())
  }, [dispatch])

  // Set form data from Redux state
  useEffect(() => {
    if (workerProfile) {
      setFormData({
        name: workerProfile.name || "",
        email: workerProfile.email || "",
        phone: workerProfile.phone || "",
        currentStatus: workerProfile.currentStatus || "unemployed",
        lookingFor: workerProfile.lookingFor || "",
        pastExperience: workerProfile.pastExperience || "",
        expectedSalary: workerProfile.expectedSalary || "",
        image: workerProfile.image || null,
        resume: workerProfile.resume || null,
      })
      setProfileCompletion(workerProfile.profileCompletion || 0)

      if (workerProfile.image) {
        setPreviewImage(workerProfile.image)
      }
    }
  }, [workerProfile])

  // For demo purposes, use sample data if no Redux data is available
  useEffect(() => {
    if (!workerProfile) {
      setTimeout(() => {
        setFormData({
          name: sampleWorkerProfile.name,
          email: sampleWorkerProfile.email,
          phone: sampleWorkerProfile.phone,
          currentStatus: sampleWorkerProfile.currentStatus,
          lookingFor: sampleWorkerProfile.lookingFor,
          pastExperience: sampleWorkerProfile.pastExperience,
          expectedSalary: sampleWorkerProfile.expectedSalary,
          image: sampleWorkerProfile.image,
          resume: sampleWorkerProfile.resume,
        })
        setProfileCompletion(sampleWorkerProfile.profileCompletion)
        setPreviewImage(sampleWorkerProfile.image)
      }, 1000)
    }
  }, [workerProfile])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
      // const response = await dispatch(updateWorkerImage(formDataObj))
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

  const handleResumeChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingResume(true)
    try {
      // const response = await dispatch(updateWorkerResume(file))
      setFormData((prevState) => ({
        ...prevState,
        resume: response.payload.resumeUrl,
      }))
      setSuccess("Resume uploaded successfully!")
    } catch (err) {
      setError("Error uploading resume. Please try again.")
    } finally {
      setUploadingResume(false)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      // await dispatch(updateWorkerProfile(formData))
      setSuccess("Profile updated successfully!")
      setIsEditing(false)
      window.scrollTo(0, 0)
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  // Get color and message based on profile completion
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
    return "Excellent! Your profile is complete and will attract more employers."
  }

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl h-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl rounded-2xl">
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-t-2xl">
            <div>
              <h1 className="text-2xl font-bold text-white">Worker Profile</h1>
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
                  activeTab === "documents"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("documents")}
              >
                Documents
              </button>
            </div>
          </div>

          {/* Profile Tab Content */}
          {activeTab === "profile" && (
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
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        formData.currentStatus === "unemployed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {formData.currentStatus === "unemployed" ? "Available for Work" : "Currently Employed"}
                    </span>
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
                    <label htmlFor="currentStatus" className="block text-sm font-medium text-gray-700">
                      Current Status
                    </label>
                    <div className="mt-1">
                      {isEditing ? (
                        <select
                          id="currentStatus"
                          name="currentStatus"
                          value={formData.currentStatus}
                          onChange={onChange}
                          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="unemployed">Unemployed</option>
                          <option value="working">Working</option>
                        </select>
                      ) : (
                        <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200 capitalize">
                          {formData.currentStatus}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="lookingFor" className="block text-sm font-medium text-gray-700">
                      Looking For
                    </label>
                    <div className="mt-1">
                      {isEditing ? (
                        <input
                          type="text"
                          name="lookingFor"
                          id="lookingFor"
                          value={formData.lookingFor}
                          onChange={onChange}
                          placeholder="e.g. Construction, Driving, Plumbing"
                          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">
                          {formData.lookingFor || "Not specified"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="pastExperience" className="block text-sm font-medium text-gray-700">
                      Past Experience
                    </label>
                    <div className="mt-1">
                      {isEditing ? (
                        <textarea
                          id="pastExperience"
                          name="pastExperience"
                          rows={3}
                          value={formData.pastExperience}
                          onChange={onChange}
                          placeholder="Describe your past work experience"
                          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                        ></textarea>
                      ) : (
                        <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200 min-h-[80px]">
                          {formData.pastExperience || "No experience listed"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700">
                      Expected Salary (₹/day)
                    </label>
                    <div className="mt-1">
                      {isEditing ? (
                        <input
                          type="number"
                          name="expectedSalary"
                          id="expectedSalary"
                          value={formData.expectedSalary}
                          onChange={onChange}
                          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="py-2 px-3 bg-gray-50 rounded-md border border-gray-200">
                          ₹{formData.expectedSalary || "Not specified"}
                        </p>
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
                    disabled={saving || uploadingImage || uploadingResume}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Documents Tab Content */}
          {activeTab === "documents" && (
            <div className="px-6 py-5 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Resume</h3>
                <div className="mt-3 flex items-center space-x-3">
                  {formData.resume ? (
                    <div className="flex items-center p-4 border rounded-lg bg-gray-50 w-full">
                      <FileText className="h-8 w-8 text-blue-500 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium">Resume.pdf</p>
                        <p className="text-sm text-gray-500">Uploaded on Jan 15, 2023</p>
                      </div>
                      <a
                        href={formData.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                      >
                        View
                      </a>

                      {isEditing && (
                        <label
                          htmlFor="resume-upload"
                          className="ml-3 cursor-pointer inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Change
                          <input
                            id="resume-upload"
                            name="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeChange}
                            className="sr-only"
                          />
                        </label>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 w-full">
                      {isEditing ? (
                        <>
                          <label
                            htmlFor="resume-upload"
                            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            <span>Upload Resume</span>
                            <input
                              id="resume-upload"
                              name="resume"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleResumeChange}
                              className="sr-only"
                            />
                          </label>
                          {uploadingResume && (
                            <div className="ml-2 animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                          )}
                        </>
                      ) : (
                        <p className="text-gray-500">No resume uploaded yet.</p>
                      )}
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">PDF, DOC, or DOCX up to 5MB</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
                <div className="mt-3">
                  {isEditing ? (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Add Certification
                    </button>
                  ) : (
                    <p className="text-gray-500">No certifications added yet.</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Skills Assessment</h3>
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Plumbing</span>
                    <span className="text-sm text-gray-500">Advanced</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>

                  <div className="flex items-center justify-between mb-2 mt-4">
                    <span className="text-sm font-medium text-gray-700">Carpentry</span>
                    <span className="text-sm text-gray-500">Intermediate</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>

                  {isEditing && (
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Activity className="h-3.5 w-3.5 mr-1" />
                      Update Skills
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkerProfile

