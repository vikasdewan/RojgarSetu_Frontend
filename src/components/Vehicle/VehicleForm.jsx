// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createVehicleForm } from '../../redux/actions';
// import axios from 'axios';

// const VehicleForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEditMode = !!id;
  
//   const [formData, setFormData] = useState({
//     title: '',
//     type: 'vehicle', // 'vehicle' or 'instrument'
//     vehicleType: '',
//     instrumentType: '',
//     brand: '',
//     model: '',
//     description: '',
//     requirements: '',
//     location: '',
//     payscale: '',
//     workingHours: '',
//     workingDays: '',
//     startDate: '',
//     endDate: '',
//     images: []
//   });
  
//   const [loading, setLoading] = useState(isEditMode);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [uploadingImages, setUploadingImages] = useState(false);
//   const [previewImages, setPreviewImages] = useState([]);
  
//   useEffect(() => {
//     if (isEditMode) {
//       const fetchVehicleFormDetails = async () => {
//         try {
//           const res = await axios.get(`/api/vehicle/${id}`);
//           const vehicleForm = res.data;
          
//           setFormData({
//             title: vehicleForm.title || '',
//             type: vehicleForm.type || 'vehicle',
//             vehicleType: vehicleForm.vehicleType || '',
//             instrumentType: vehicleForm.instrumentType || '',
//             brand: vehicleForm.brand || '',
//             model: vehicleForm.model || '',
//             description: vehicleForm.description || '',
//             requirements: vehicleForm.requirements || '',
//             location: vehicleForm.location || '',
//             payscale: vehicleForm.payscale || '',
//             workingHours: vehicleForm.workingHours || '',
//             workingDays: vehicleForm.workingDays || '',
//             startDate: vehicleForm.startDate ? new Date(vehicleForm.startDate).toISOString().split('T')[0] : '',
//             endDate: vehicleForm.endDate ? new Date(vehicleForm.endDate).toISOString().split('T')[0] : '',
//             images: vehicleForm.images || []
//           });
          
//           setPreviewImages(vehicleForm.images || []);
//         } catch (err) {
//           setError('Error fetching vehicle form details. Please try again.');
//         } finally {
//           setLoading(false);
//         }
//       };
      
//       fetchVehicleFormDetails();
//     }
//   }, [id, isEditMode]);
  
//   const onChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
  
//   const handleImagesChange = async e => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;
    
//     setUploadingImages(true);
    
//     try {
//       const uploadPromises = files.map(async file => {
//         const reader = new FileReader();
        
//         // Create a promise for the FileReader
//         const readerPromise = new Promise(resolve => {
//           reader.onload = e => resolve(e.target.result);
//         });
        
//         reader.readAsDataURL(file);
        
//         // Wait for the FileReader to complete
//         const preview = await readerPromise;
        
//         // Add to preview images
//         setPreviewImages(prev => [...prev, preview]);
        
//         // Upload to Cloudinary
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', 'rojgar_setu');
        
//         const res = await fetch('https://api.cloudinary.com/v1_1/your-cloud-name/image/upload', {
//           method: 'POST',
//           body: formData
//         });
        
//         const data = await res.json();
//         return data.secure_url;
//       });
      
//       const uploadedUrls = await Promise.all(uploadPromises);
      
//       setFormData(prevState => ({
//         ...prevState,
//         images: [...prevState.images, ...uploadedUrls]
//       }));
//     } catch (err) {
//       setError('Error uploading images. Please try again.');
//     } finally {
//       setUploadingImages(false);
//     }
//   };
  
//   const removeImage = index => {
//     const updatedImages = [...formData.images];
//     updatedImages.splice(index, 1);
    
//     const updatedPreviews = [...previewImages];
//     updatedPreviews.splice(index, 1);
    
//     setFormData({
//       ...formData,
//       images: updatedImages
//     });
    
//     setPreviewImages(updatedPreviews);
//   };
  
//   const onSubmit = async e => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError('');
    
//     try {
//       if (isEditMode) {
//         await axios.put(`/api/vehicle/${id}`, formData);
//       } else {
//         await dispatch(createVehicleForm(formData));
//       }
      
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response.data.message || 'Error creating vehicle form. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
//         <div className="bg-white overflow-hidden shadow rounded-lg">
//           <div className="px-4 py-5 sm:px-6">
//             <h1 className="text-lg font-medium text-gray-900">
//               {isEditMode ? 'Edit Vehicle/Instrument Form' : 'Create New Vehicle/Instrument Form'}
//             </h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Fill in the details to {isEditMode ? 'update your' : 'create a new'} vehicle/instrument form
//             </p>
//           </div>
          
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 rounded relative" role="alert">
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}
          
//           <form onSubmit={onSubmit} className="px-4 py-5 sm:p-6">
//             <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
//               <div className="sm:col-span-6">
//                 <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//                   Title
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     type="text"
//                     name="title"
//                     id="title"
//                     value={formData.title}
//                     onChange={onChange}
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="sm:col-span-3">
//                 <label htmlFor="type" className="block text-sm font-medium text-gray-700">
//                   Type
//                 </label>
//                 <div className="mt-1">
//                   <select
//                     id="type"
//                     name="type"
//                     value={formData.type}
//                     onChange={onChange}
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     required
//                   >
//                     <option value="vehicle">Vehicle</option>
//                     <option value="instrument">Instrument</option>
//                   </select>
//                 </div>
//               </div>
              
//               {formData.type === 'vehicle' ? (
//                 <div className="sm:col-span-3">
//                   <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
//                     Vehicle Type
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       name="vehicleType"
//                       id="vehicleType"
//                       value={formData.vehicleType}
//                       onChange={onChange}
//                       placeholder="e.g. Truck, Excavator, Tractor"
//                       className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                       required
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="sm:col-span-3">
//                   <label htmlFor="instrumentType" className="block text-sm font-medium text-gray-700">
//                     Instrument Type
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       name="instrumentType"
//                       id="instrumentType"
//                       value={formData.instrumentType}
//                       onChange={onChange}
//                       placeholder="e.g. Concrete Mixer, Generator, Drill"
//                       className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                       required
//                     />
//                   </div>
//                 </div>
//               )}
              
//               <div className="sm:col-span-3">
//                 <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
//                   Brand
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     type="text"
//                     name="brand"
//                     id="brand"
//                     value={formData.brand}
//                     onChange={onChange}
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//               </div>
              
//               <div className="sm:col-span-3">
//                 <label htmlFor="model" className="block text-sm font-medium text-gray-700">
//                   Model
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     type="text"
//                     name="model"
//                     id="model"
//                     value={formData.model}
//                     onChange={onChange}
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//               </div>
              
//               <div className="sm:col-span-6">
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <div className="mt-1">
//                   <textarea
//                     id="description"
//                     name="description"
//                     rows={4}
//                     value={formData.description}
//                     onChange={onChange}
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="sm:col-span-6">
//                 <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
//                   Requirements
//                 </label>
//                 <div className="mt-1">
//                   <textarea
//                     id="requirements"
//                     name="requirements"
//                     rows={3}
//                     value={formData.requirements}
//                     onChange={onChange}
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//               </div>
              
//               <div className="sm:col-span-3">
//                 <label htmlFor="location" className="block text-sm font-medium text-gray-700">
//                   Location
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     type="text"
//                     name="location"
//                     id="location"
//                     value={formData.location}
//                     onChange={onChange}
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="sm:col-span-3">
//                 <label htmlFor="payscale" className="block text-sm font-medium text-gray-700">
//                   Pay Scale (₹/day)
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     type="number"
//                     name="payscale"
//                     id="payscale"
//                     value={formData.payscale}
//                     onChange={onChange}
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="sm:col-span-3">
//                 <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700">
//                   Working Hours
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     type="text"
//                     name="workingHours"
//                     id="workingHours"
//                     value={formData.workingHours}
//                     onChange={onChange}
//                     placeholder="e.g. 9 AM - 5 PM"
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="sm:col-span-3">
//                 <label htmlFor="workingDays" className="block text-sm font-medium text-gray-700">
//                   Working Days
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     type="text"
//                     name="workingDays"
//                     id="workingDays"
//                     value={formData.workingDays}
//                     onChange={onChange}
//                     placeholder="e.g. Monday - Friday"
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="sm:col-span-3">
//                 <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
//                   Start Date
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     type="date"
//                     name="startDate"
//                     id="startDate"
//                     value={formData.startDate}
//                     onChange={onChange}
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="sm:col-span-3">
//                 <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
//                   End Date
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     type="date"
//                     name="endDate"
//                     id="endDate"
//                     value={formData.endDate}
//                     onChange={onChange}
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//               </div>
              
//               <div className="sm:col-span-6">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Images
//                 </label>