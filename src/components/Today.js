import { useEffect, useContext } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import Navbar from "./Navbar";
import Container from "../styled/Container";
import PageTitle from "../styled/PageTitle";
import BottomBar from "./BottomBar";
import UserContext from "../contexts/UserContext";
import Loading from "./Loading";
import TaskList from "./TaskList";
import PageSubtitle from "../styled/PageSubtitle";
import TasksContext from "../contexts/TasksContext";

export default function Today() {
  const { user } = useContext(UserContext);
  const { todayTasks, setTodayTasks } = useContext(TasksContext);

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
      setTodayTasks(response.data);
    });

    request.catch((error) => console.log(error.response));
  }, [user.token, setTodayTasks]);

  const currentDate = dayjs().locale("pt-br").format("dddd, DD/MM");

  return (
    <>
      <Navbar />
      <Container>
        <PageTitle>{currentDate}</PageTitle>
        {todayTasks.length === 0 ? (
          <Loading />
        ) : todayTasks[0] !== null ? (
          <TaskList />
        ) : (
          <PageSubtitle>Nenhum hábito concluído ainda</PageSubtitle>
        )}
      </Container>
      <BottomBar />
    </>
  );
}
