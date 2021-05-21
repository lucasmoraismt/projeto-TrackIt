import { TrashOutline } from "react-ionicons";
import Day from "../styled/Day";
import Task from "../styled/Task";
import TaskTitle from "../styled/TaskTitle";

export default function AllTasksList({ allTasks, setAllTasks }) {
  console.log(allTasks);
  return (
    <>
      {allTasks.map((t) => {
        return (
          <Task key={t.id}>
            <div>
              <TaskTitle>{t.name}</TaskTitle>
              <Day days={t.days.includes(0)}>D</Day>
              <Day days={t.days.includes(1)}>S</Day>
              <Day days={t.days.includes(2)}>T</Day>
              <Day days={t.days.includes(3)}>Q</Day>
              <Day days={t.days.includes(4)}>Q</Day>
              <Day days={t.days.includes(5)}>S</Day>
              <Day days={t.days.includes(6)}>S</Day>
            </div>
            {<TrashOutline />}
          </Task>
        );
      })}
    </>
  );
}
