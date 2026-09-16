import { useTaskActions } from "@/hooks/useTaskActions";
import ItemTask from "./itemTask";

const TaskList = () => {
  const { tasks } = useTaskActions();

  return (
    <>
      <div>
        <h2>Lista de tareas</h2>
        <div className="space-y-4 mt-4">
          {tasks.map((task) => (
            <ItemTask key={task.id} task={task} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskList;
