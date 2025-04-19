import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export const notificationApiSlice = createApi({
  reducerPath: 'notificationApi',
  baseQuery,
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => '/notifications',
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} = notificationApiSlice;
