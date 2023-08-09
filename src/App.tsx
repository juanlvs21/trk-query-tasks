import { TasksList } from "@/components/TasksList";
import styles from "./App.module.css";

export const App = () => {
  return (
    <main>
      <h1 className={`${styles.appTitle}`}>Lista de Tareas - RTK Query</h1>

      <TasksList />
    </main>
  );
};
