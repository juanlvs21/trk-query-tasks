import { useGetTasksQuery } from "@/api/apiSlice";
import styles from "./CharactersList.module.css";

export const TasksList = () => {
  const { data, isLoading, isError, error } = useGetTasksQuery();

  if (isLoading) {
    return <h2>Cargando Tareas</h2>;
  }

  if (isError) {
    return <pre>{JSON.stringify(error, undefined, 2)}</pre>;
  }

  return (
    <section>
      <ul className={`${styles.taskList}`}>
        {data?.results.map((task) => (
          <li key={task.id} className={`${styles.taskElement}`}>
            {task.name}
          </li>
        ))}
      </ul>
    </section>
  );
};
