import styled, { css } from "styled-components";

const Button = styled.button`
  width: 300px;
  height: 45px;
  background: #52b6ff;
  border-radius: 5px;
  border: none;
  margin-bottom: 25px;
  font-size: 21px;
  line-height: 26px;
  text-align: center;
  color: #fff;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.7;
      pointerevents: "none";
    `};
`;

export default Button;
