import { useTaskActions } from "@/hooks/useTaskActions";
import type { Task } from "@/schemas/taskSchema";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
}

const ItemTask = ({ task }: Props) => {
  const { deleteTask, toggleTaskCompletation } = useTaskActions();

  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.log(error);
        toast.error("Error al borrar la tarea");
      }
    });
  };

  const handleUpdate = async () => {
    startTransition(async () => {
      try {
        await toggleTaskCompletation(task.id);
      } catch (error) {
        console.log(error);
        toast.error("Error al actualizar la tarea");
      }
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle
            className={cn(
              "text-lg font-semibold",
              task.completed ? "line-through text-gray-500" : "",
            )}
          >
            {task.title}
          </CardTitle>
          <CardAction className="space-x-3">
            <Button
              variant={"outline"}
              onClick={handleUpdate}
              disabled={isPending}
            >
              Actualizar
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleDelete}
              disabled={isPending}
            >
              Borrar
            </Button>
          </CardAction>
          {task.description && <CardContent>{task.description}</CardContent>}
        </CardHeader>
      </Card>
    </>
  );
};

export default ItemTask;
