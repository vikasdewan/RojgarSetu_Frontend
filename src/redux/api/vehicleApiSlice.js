import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export const vehicleApiSlice = createApi({
  reducerPath: 'vehicleApi',
  baseQuery,
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: () => '/vehicle',
    }),
    registerVehicle: builder.mutation({
      query: (vehicleData) => ({
        url: '/vehicle',
        method: 'POST',
        body: vehicleData,
      }),
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useRegisterVehicleMutation,
} = vehicleApiSlice;
