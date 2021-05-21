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

export default function Habits() {
  const { user } = useContext(UserContext);
  const [isCreating, setIsCreating] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", days: [] });

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
      console.log(response.data);
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
        <nav>
          <PageTitle>Meus hábitos</PageTitle>
          <Add onClick={create}>+</Add>
        </nav>
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
          <AllTasksList allTasks={allTasks} setAllTasks={setAllTasks} />
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
