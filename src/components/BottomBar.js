import { useContext, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TasksContext from "../contexts/TasksContext";

export default function BottomBar() {
  const { ratio, setRatio, todayTasks } = useContext(TasksContext);

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

  return (
    <Bottom>
      <Link to="/habits">
        <PageLink>Hábitos</PageLink>
      </Link>
      <div>
        <Link to="/today">
          <CircularProgressbar
            value={ratio}
            text={`Hoje`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#52B6FF",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent",
            })}
          />
        </Link>
      </div>
      <Link to="/history">
        <PageLink>Histórico</PageLink>
      </Link>
    </Bottom>
  );
}

const Bottom = styled.div`
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  z-index: 2;

  div {
    height: 90px;
    width: 90px;
    position: fixed;
    bottom: 10px;
    left: calc(50vw - 45px);
  }
`;

const PageLink = styled.p`
  font-size: 18px;
  line-height: 22px;
  color: #52b6ff;
`;
