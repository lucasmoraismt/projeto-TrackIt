import styled, { css } from "styled-components";

const Day = styled.button`
  width: 30px;
  height: 30px;
  background: ${(props) => (props.days ? "#cfcfcf" : "#fff")};
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  margin-left: 5px;
  font-size: 20px;
  line-height: 25px;
  color: ${(props) => (props.days ? "#fff" : "#cfcfcf")};

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.7;
      pointerevents: "none";
    `};
`;

export default Day;
