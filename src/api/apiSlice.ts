import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_URL } from "@/config/env";
import { TTask } from "@/types/TTask";

export const apiSlice = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers /* { getState } */) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = localStorage.getItem("in");

      headers.set("authentication", `Bearer ${token ?? "test-token"}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<TTask[], void>({
      query: () => "/tasks",
    }),
    createTask: builder.mutation({
      query: (newTask: TTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = apiSlice;
