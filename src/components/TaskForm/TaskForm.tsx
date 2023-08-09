import { ChangeEvent, FormEvent, useState } from "react";

import styles from "./TaskForm.module.css";
import { TTask } from "@/types/TTask";
import { useCreateTaskMutation } from "@/api/apiSlice";

const formDefaultValues: TTask = {
  id: 0,
  name: "",
  description: "",
};

export const TaskForm = () => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [formValues, setFormValues] = useState<TTask>(formDefaultValues);

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

      const newValue = {
        ...formValues,
        id: new Date().getTime() + Math.floor(Math.random() * 1000000),
      };

      await createTask(newValue);

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

        <button disabled={isLoading}>Agregar</button>
      </section>

      <span>
        {isLoading ? "Creando Tarea" : "Complete los campos para agregar"}
      </span>
    </form>
  );
};
