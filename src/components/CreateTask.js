import axios from "axios";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import Loader from "react-loader-spinner";
import styled, { css } from "styled-components";
import TasksContext from "../contexts/TasksContext";
import UserContext from "../contexts/UserContext";
import Day from "../styled/Day";
import Input from "../styled/Input";

export default function CreateTask({
  newTask,
  setNewTask,
  setIsCreating,
  allTasks,
  setAllTasks,
}) {
  const { user } = useContext(UserContext);
  const { todayTasks, setTodayTasks } = useContext(TasksContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [name, setName] = useState("");
  const dayNumber = dayjs().format("d");

  let taskObject = {
    name,
    days: newTask.days,
  };
  let newDays = [];

  function toggle(id) {
    if (!newTask.days.includes(id)) {
      newDays.push(id);
      taskObject = {
        name: name,
        days: [...newTask.days, id],
      };
      setNewTask(taskObject);
    } else {
      newDays = newTask.days.filter((d) => d !== id);
      taskObject = {
        name: name,
        days: newDays,
      };
      setNewTask(taskObject);
    }
  }

  function addTask() {
    if (newTask.name.length === 0 || taskObject.days.length === 0) {
      if (taskObject.name.length === 0) {
        alert("Insira um título para o hábito");
      }
      if (taskObject.days.length === 0) {
        alert("Selecione pelo menos um dia");
      }
      return;
    }
    setIsDisabled(true);

    const body = newTask;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const request = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      body,
      config
    );

    request.then((response) => {
      setAllTasks([...allTasks, response.data]);
      if (newDays.includes(dayNumber)) {
        const newTodayTask = {
          id: response.data.id,
          name: response.data.name,
          days: response.data.days,
          currentSequence: 0,
          highestSequence: 0,
        };
        setTodayTasks([...todayTasks, newTodayTask]);
      }
      setName("");
      setNewTask({ name: "", days: [] });
      setIsDisabled(false);
      setIsCreating(false);
    });
    request.catch((error) => {
      alert("Erro ao criar hábito");
      setIsDisabled(false);
    });
  }

  function close() {
    if (isDisabled) {
      return;
    } else {
      setIsCreating(false);
    }
  }

  return (
    <CreateDiv>
      <Input
        type="text"
        placeholder="nome do hábito"
        disabled={isDisabled}
        value={newTask.name}
        onChange={(e) => {
          setName(e.target.value);
          setNewTask({
            name: e.target.value,
            days: newTask.days,
          });
        }}
      />
      <div>
        <Day
          isDisabled={isDisabled}
          days={newTask.days.includes(0)}
          onClick={() => toggle(0)}
          disabled={isDisabled}
        >
          D
        </Day>
        <Day
          isDisabled={isDisabled}
          days={newTask.days.includes(1)}
          onClick={() => toggle(1)}
          disabled={isDisabled}
        >
          S
        </Day>
        <Day
          isDisabled={isDisabled}
          days={newTask.days.includes(2)}
          onClick={() => toggle(2)}
          disabled={isDisabled}
        >
          T
        </Day>
        <Day
          isDisabled={isDisabled}
          days={newTask.days.includes(3)}
          onClick={() => toggle(3)}
          disabled={isDisabled}
        >
          Q
        </Day>
        <Day
          isDisabled={isDisabled}
          days={newTask.days.includes(4)}
          onClick={() => toggle(4)}
          disabled={isDisabled}
        >
          Q
        </Day>
        <Day
          isDisabled={isDisabled}
          days={newTask.days.includes(5)}
          onClick={() => toggle(5)}
          disabled={isDisabled}
        >
          S
        </Day>
        <Day
          isDisabled={isDisabled}
          days={newTask.days.includes(6)}
          onClick={() => toggle(6)}
          disabled={isDisabled}
        >
          S
        </Day>
      </div>
      <footer>
        <Cancel isDisabled={isDisabled} onClick={close}>
          Cancelar
        </Cancel>
        <Save isDisabled={isDisabled} onClick={addTask}>
          {isDisabled ? (
            <Loader type="ThreeDots" color="#FFF" height={35} width={40} />
          ) : (
            "Salvar"
          )}
        </Save>
      </footer>
    </CreateDiv>
  );
}

const CreateDiv = styled.div`
  width: 340px;
  height: 180px;
  background: #fff;
  border-radius: 5px;
  padding: 18px;
  margin-bottom: 30px;

  footer {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const Cancel = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: #52b6ff;

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.7;
      pointerevents: "none";
    `};
`;

const Save = styled.button`
  width: 84px;
  height: 35px;
  background: #52b6ff;
  border-radius: 5px;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  border: none;
  margin-left: 22px;

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.7;
      pointerevents: "none";
    `};
`;
