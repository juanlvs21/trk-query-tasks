import { ChangeEvent, FormEvent, useState } from "react";

import { useCreateTaskMutation } from "@/store/api/apiSlice";
import { TTaskForm } from "@/types/TTask";
import styles from "./TaskForm.module.css";

const formDefaultValues: TTaskForm = {
  name: "",
  description: "",
};

export const TaskForm = () => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [formValues, setFormValues] = useState<TTaskForm>(formDefaultValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      await createTask(formValues);

      setFormValues(formDefaultValues);
    } catch (error) {
      console.log({ error });
      alert("Ha ocurrido un error ");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.taskForm}`}>
      <h2>Nueva Tarea</h2>

      <section className={`${styles.taskInputs}`}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formValues?.name}
          onChange={handleChange}
          disabled={isLoading}
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formValues?.description}
          onChange={handleChange}
          disabled={isLoading}
        ></textarea>

        <button disabled={isLoading}>Guardar</button>
      </section>

      <span>
        {isLoading ? "Creando Tarea" : "Complete los campos para guardar"}
      </span>
    </form>
  );
};
