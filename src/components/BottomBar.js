import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import styled from "styled-components";

export default function BottomBar() {
  return (
    <Bottom>
      <PageLink>Hábitos</PageLink>
      <div>
        <CircularProgressbarWithChildren
          value={0}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: "#3e98c7",
            textColor: "#fff",
            pathColor: "#fff",
            trailColor: "transparent",
          })}
        >
          <PageLink>Hoje</PageLink>
        </CircularProgressbarWithChildren>
      </div>
      <PageLink>Histórico</PageLink>
    </Bottom>
  );
}

const Bottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  div {
    height: 90px;
    width: 90px;
  }
`;

const PageLink = styled.p`
  font-size: 18px;
  line-height: 22px;
  color: #52b6ff;
`;
