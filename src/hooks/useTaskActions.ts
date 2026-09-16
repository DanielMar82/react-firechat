import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

import {
  collection,
  query,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import type { Task } from "@/schemas/taskSchema";

export const useTaskActions = () => {
  const { data: user } = useUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const db = useFirestore();

  const taskCollectionRef = collection(db, "tasks");

  const tasksQuery = query(taskCollectionRef, where("userId", "==", user!.uid));

  const { status, data: tasks } = useFirestoreCollectionData(tasksQuery, {
    idField: "id",
    suspense: true,
  });

  const createTask = async (data: { title: string; description?: string }) => {
    const newTask: Task = {
      ...data,
      completed: false,
      userId: user!.uid,
    };

    return await addDoc(taskCollectionRef, newTask);
  };

  const deleteTask = async (taskId: string) => {
    const taskDoc = doc(db, "tasks", taskId);
    return await deleteDoc(taskDoc);
  };

  const toggleTaskCompletation = async (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      throw new Error("Tarea no encontrada");
    }

    const taskDoc = doc(db, "tasks", taskId);

    return await updateDoc(taskDoc, { completed: !task.completed });
  };

  return {
    tasks: tasks as Task[],
    isLoading: status === "loading",

    createTask,
    deleteTask,
    toggleTaskCompletation,
  };
};
