import { useEffect, useContext, useState } from "react";
import axios from "axios";

import Navbar from "./Navbar";
import Container from "../styled/Container";
import PageTitle from "../styled/PageTitle";
import PageSubtitle from "../styled/PageSubtitle";
import BottomBar from "./BottomBar";
import UserContext from "../contexts/UserContext";
import Loading from "./Loading";
import TaskList from "./TaskList";

export default function Today() {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(UserContext);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );

    request.then((response) => {
      setTasks(response.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <PageTitle>Quarta, 19/05</PageTitle>
        <PageSubtitle> Nenhum hábito concluído ainda </PageSubtitle>
        {tasks.length === 0 ? <Loading /> : <TaskList tasks={tasks} />}
      </Container>
      <BottomBar />
    </>
  );
}
