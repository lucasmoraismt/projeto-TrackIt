import styled, { css } from "styled-components";

const Input = styled.input`
  width: 300px;
  height: 45px;
  padding: 10px;
  margin-bottom: 6px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  font-size: 20px;
  line-height: 25px;
  color: #666666;

  ::placeholder {
    font-size: 20px;
    line-height: 25px;
    color: #dbdbdb;
  }

  ${(props) =>
    props.disabled &&
    css`
      background: #f2f2f2;
      opacity: 0.7;
      pointerevents: "none";
    `};
`;

export default Input;
