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

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );

    request.then((response) => {
      if (response.data.length === 0) {
        setTasks([null]);
      } else {
        setTasks(response.data);
      }
      console.log(response.data);
    });

    request.catch((error) => console.log(error.response));
  }, [user.token]);

  return (
    <>
      <Navbar />
      <Container>
        <PageTitle>Quarta, 19/05</PageTitle>
        <PageSubtitle> Nenhum hábito concluído ainda </PageSubtitle>
        {tasks.length === 0 ? (
          <Loading />
        ) : tasks[0] !== null ? (
          <TaskList tasks={tasks} />
        ) : (
          ""
        )}
      </Container>
      <BottomBar />
    </>
  );
}
