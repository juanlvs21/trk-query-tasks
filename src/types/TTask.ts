export type TTask = {
  id: number;
  name: string;
  description: string;
  completed?: boolean;
};

export type TTaskForm = Omit<TTask, "id">;
