import axios from "axios";
import { useContext } from "react";
import { TrashOutline } from "react-ionicons";
import UserContext from "../contexts/UserContext";
import Day from "../styled/Day";
import Task from "../styled/Task";
import TaskTitle from "../styled/TaskTitle";

export default function AllTasksList({
  allTasks,
  setAllTasks,
  todayTasks,
  setTodayTasks,
}) {
  const { user } = useContext(UserContext);

  function deleteTask(task) {
    if (window.confirm("Deseja deletar o hábito?")) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const request = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${task.id}`,
        config
      );
      request.then(() => {
        setAllTasks(allTasks.filter((t) => t.id !== task.id));
        if (todayTasks.length > 0 && todayTasks[0].id === task.id) {
          const newTodayTasks = todayTasks.filter((t) => t.id !== task.id);
          setTodayTasks(newTodayTasks);
        }
      });
      request.catch(() => alert("Erro ao excluir hábito"));
    } else {
      return;
    }
  }

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
            {<TrashOutline onClick={() => deleteTask(t)} />}
          </Task>
        );
      })}
    </>
  );
}
