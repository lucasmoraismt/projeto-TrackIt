import Task from "../styled/Task";
import TaskTitle from "../styled/TaskTitle";

export default function AllTasksList({ allTasks, setAllTasks }) {
  return (
    <>
      {allTasks.map((t) => {
        return (
          <Task key={t.id}>
            <TaskTitle>{t.name}</TaskTitle>
          </Task>
        );
      })}
    </>
  );
}
