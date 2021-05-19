import styled, { css } from "styled-components";

const SwitchLink = styled.a`
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  text-decoration-line: underline;
  color: #52b6ff;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      pointerevents: "none";
    `};
`;

export default SwitchLink;
