import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_URL } from "@/config/env";
import { TCharacter } from "@/types/TCharacter";
import { TResponseList } from "@/types/TApi";

export const apiSlice = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<TResponseList<TCharacter>, void>({
      query: () => "/tasks",
    }),
  }),
});

export const { useGetTasksQuery } = apiSlice;
