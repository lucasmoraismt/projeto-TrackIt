import Task from "../styled/Task";
import TaskTitle from "../styled/TaskTitle";
import TaskSubtitle from "../styled/TaskSubtitle";
import { Checkbox } from "react-ionicons";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import PageSubtitle from "../styled/PageSubtitle";
import TasksContext from "../contexts/TasksContext";

export default function TaskList({ todayTasks, setTodayTasks }) {
  const { user } = useContext(UserContext);
  const { ratio, setRatio } = useContext(TasksContext);
  let tasksNumber = todayTasks.length;
  let tasksDone = todayTasks.reduce((acc, t) => (t.done ? (acc += 1) : acc), 0);

  useEffect(() => setRatio(Math.round((100 * tasksDone) / tasksNumber)));
  let isTaskLoading = false;

  function toggle(task) {
    if (isTaskLoading) {
      return;
    }
    isTaskLoading = true;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const data = task;
    if (task.done) {
      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${task.id}/uncheck`,
        data,
        config
      );

      request.then(() => {
        todayTasks.forEach((t) => {
          if (t.id === task.id) {
            t.done = false;
            t.currentSequence -= 1;
          }
        });
        setTodayTasks([...todayTasks]);
        isTaskLoading = false;
      });
      request.catch(() => {
        alert("Erro ao atualizar tarefa");
        isTaskLoading = false;
      });
    } else {
      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${task.id}/check`,
        data,
        config
      );

      request.then(() => {
        todayTasks.forEach((t) => {
          if (t.id === task.id) {
            t.done = true;
            if (t.currentSequence === t.highestSequence) {
              t.highestSequence += 1;
            }
            t.currentSequence += 1;
          }
        });
        setTodayTasks([...todayTasks]);
        isTaskLoading = false;
      });
      request.catch(() => {
        alert("Erro ao atualizar tarefa");
        isTaskLoading = false;
      });
    }
  }

  return (
    <>
      <PageSubtitle progress={tasksDone > 0}>
        {tasksDone === 0
          ? "Nenhum hábito concluído ainda"
          : `${ratio}% dos hábitos concluídos`}
      </PageSubtitle>
      {todayTasks.map((t) => {
        return (
          <Task onClick={() => toggle(t)} key={t.id}>
            <div>
              <TaskTitle>{t.name}</TaskTitle>
              <TaskSubtitle checked={t.done}>
                Sequência atual:{" "}
                <span>
                  {t.currentSequence} {t.currentSequence === 1 ? "dia" : "dias"}
                </span>
              </TaskSubtitle>
              <TaskSubtitle
                checked={t.done && t.currentSequence === t.highestSequence}
              >
                Seu recorde:{" "}
                <span>
                  {t.highestSequence} {t.highestSequence === 1 ? "dia" : "dias"}
                </span>
              </TaskSubtitle>
            </div>
            <Checkbox
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
