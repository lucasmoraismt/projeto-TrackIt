import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Navbar from "../components/Navbar";
import UserContext from "../contexts/UserContext";
import Container from "../styled/Container";
import PageTitle from "../styled/PageTitle";
import AllTasksList from "./AllTasksList";
import BottomBar from "./BottomBar";
import CreateTask from "./CreateTask";
import TasksContext from "../contexts/TasksContext";

export default function Habits() {
  const { user } = useContext(UserContext);
  const [isCreating, setIsCreating] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", days: [] });
  const { setRatio, todayTasks, setTodayTasks } = useContext(TasksContext);

  useEffect(() => {
    let tasksNumber = todayTasks.length;
    let tasksDone = todayTasks.reduce(
      (acc, t) => (t.done ? (acc += 1) : acc),
      0
    );
    if (tasksNumber > 0) {
      setRatio(Math.round((100 * tasksDone) / tasksNumber));
    } else if (tasksNumber === 0) {
      setRatio(0);
    }
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );

    request.then((response) => {
      setAllTasks(response.data);
    });

    request.catch((error) => console.log(error.response));
  }, [user.token, setAllTasks]);

  function create() {
    if (isCreating) {
      return;
    } else {
      setIsCreating(true);
    }
  }

  return (
    <>
      <Navbar />
      <Container>
        <Nav>
          <PageTitle>Meus hábitos</PageTitle>
          <Add onClick={create}>+</Add>
        </Nav>
        {isCreating ? (
          <CreateTask
            newTask={newTask}
            setNewTask={setNewTask}
            setIsCreating={setIsCreating}
            allTasks={allTasks}
            setAllTasks={setAllTasks}
          />
        ) : (
          ""
        )}
        {allTasks.length === 0 ? (
          <Message>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </Message>
        ) : (
          <AllTasksList
            allTasks={allTasks}
            setAllTasks={setAllTasks}
            todayTasks={todayTasks}
            setTodayTasks={setTodayTasks}
          />
        )}
      </Container>
      <BottomBar />
    </>
  );
}

const Add = styled.button`
  width: 40px;
  height: 35px;
  background: #52b6ff;
  border-radius: 5px;
  border: none;
  font-size: 27px;
  line-height: 34px;
  color: #ffffff;
`;

const Message = styled.p`
  font-size: 18px;
  line-height: 22px;
  color: #666666;
`;

const Nav = styled.nav`
  width: 320px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
