import TaskForm from "@/components/tasks/taskForm";
import TaskList from "@/components/tasks/taskList";
import { Suspense } from "react";

const TaskPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">Task</h1>
      <Suspense fallback={<div>Loading tasks...</div>}>
        <div className="flex flex-col gap-8">
          <TaskForm />
          <TaskList />
        </div>
      </Suspense>
    </>
  );
};

export default TaskPage;
