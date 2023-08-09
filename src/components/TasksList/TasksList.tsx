import { useGetTasksQuery } from "@/api/apiSlice";
import { TaskForm } from "@/components/TaskForm";
import styles from "./TasksList.module.css";

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
      <TaskForm />

      <ul className={`${styles.taskList}`}>
        {data?.map((task) => (
          <li key={task.id} className={`${styles.taskElement}`}>
            <article className={`${styles.taskArticle}`}>
              <h3>{task.name}</h3>
              <p>{task.description}</p>

              <footer className={`${styles.taskActions}`}>
                <button>Eliminar</button>

                <div className={`${styles.taskActionsDone}`}>
                  <input type="checkbox" id={`checkbox-${task.id}`} />
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
