import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export const jobsApiSlice = createApi({
  reducerPath: 'jobsApi',
  baseQuery,
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => '/jobs',
    }),
    postJob: builder.mutation({
      query: (jobData) => ({
        url: '/jobs',
        method: 'POST',
        body: jobData,
      }),
    }),
    applyJob: builder.mutation({
      query: (jobId) => ({
        url: `/jobs/apply/${jobId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  usePostJobMutation,
  useApplyJobMutation,
} = jobsApiSlice;
