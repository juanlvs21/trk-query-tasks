import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_URL } from "@/config/env";
import { TTask, TTaskForm } from "@/types/TTask";

export const apiSlice = createApi({
  reducerPath: "tasks",
  tagTypes: ["TASKS_LIST"],
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
      transformResponse: (response: TTask[]) =>
        response.sort((a, b) => b.id - a.id),
      providesTags: ["TASKS_LIST"],
    }),
    createTask: builder.mutation<TTaskForm, TTaskForm>({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["TASKS_LIST"],
    }),
    updateTask: builder.mutation<TTaskForm, TTaskForm>({
      query: (task: TTask) => ({
        url: `/tasks/${task.id}`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: ["TASKS_LIST"],
    }),
    deleteTask: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TASKS_LIST"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;
