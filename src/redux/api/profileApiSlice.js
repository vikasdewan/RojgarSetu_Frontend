import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export const profileApiSlice = createApi({
  reducerPath: 'profileApi',
  baseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/profile',
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/profile',
        method: 'PUT',
        body: data,
      }),
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: '/profile/upload-image',
        method: 'POST',
        body: formData,
      }),
    }),
    uploadResume: builder.mutation({
      query: (formData) => ({
        url: '/profile/upload-resume',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadImageMutation,
  useUploadResumeMutation,
} = profileApiSlice;
