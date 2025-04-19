import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api/v1',
  prepareHeaders: (headers) => {
    const token = Cookies.get('x-auth-token');
    if (token) headers.set('x-auth-token', token);
    return headers;
  },
});

export default baseQuery;
