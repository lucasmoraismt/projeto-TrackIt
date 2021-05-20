import Task from "../styled/Task";
import TaskTitle from "../styled/TaskTitle";
import TaskSubtitle from "../styled/TaskSubtitle";
import { Checkbox } from "react-ionicons";

export default function TaskList({ tasks }) {
  function toggle(task) {}

  return (
    <>
      {tasks.map((t) => {
        return (
          <Task key={t.id}>
            <div>
              <TaskTitle>{t.name}</TaskTitle>
              <TaskSubtitle checked={t.done}>
                Sequência atual: <span>{t.currentSequence} dias</span>
              </TaskSubtitle>
              <TaskSubtitle
                checked={
                  t.done && t.currentSequence === t.highestSequence
                    ? true
                    : false
                }
              >
                Seu recorde: <span>{t.highestSequence} dias</span>
              </TaskSubtitle>
            </div>
            <Checkbox
              onClick={() => toggle(t)}
              color={t.done ? "#8FC549" : "#EBEBEB"}
              height="70px"
              width="70px"
            />
          </Task>
        );
      })}
    </>
  );
}
