import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "@/store/api/apiSlice";
import { TaskForm } from "@/components/TaskForm";
import styles from "./TasksList.module.css";

export const TasksList = () => {
  const { data, isLoading, isError, error } = useGetTasksQuery(undefined, {
    refetchOnFocus: true,
  });
  const [deleteTask, { isLoading: isLoadingDelete }] = useDeleteTaskMutation();
  const [updateTask, { isLoading: isLoadingUpdate }] = useUpdateTaskMutation();

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.log({ error });
      alert("Ha ocurrido un error ");
    }
  };

  if (isLoading) {
    return <h2>Cargando Tareas</h2>;
  }

  if (isError) {
    return <pre>{JSON.stringify(error, undefined, 2)}</pre>;
  }

  return (
    <section>
      <TaskForm />

      <ul className={`${styles.taskList}`}>
        {data?.map((task) => (
          <li key={task.id} className={`${styles.taskElement}`}>
            <article className={`${styles.taskArticle}`}>
              <h3>{task.name}</h3>
              <p>{task.description}</p>

              <footer className={`${styles.taskActions}`}>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  disabled={isLoadingDelete}
                >
                  Eliminar
                </button>

                <div className={`${styles.taskActionsDone}`}>
                  <input
                    type="checkbox"
                    id={`checkbox-${task.id}`}
                    onChange={(e) =>
                      updateTask({ ...task, completed: e.target.checked })
                    }
                    checked={task.completed}
                    disabled={isLoadingUpdate}
                  />
                  <label htmlFor={`checkbox-${task.id}`}>Listo</label>
                </div>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};
