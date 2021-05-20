import styled, { css } from "styled-components";

const TaskSubtitle = styled.p`
  font-size: 13px;
  line-height: 16px;
  color: #666;

  span {
    ${(props) =>
      props.clicked &&
      css`
        color: #8fc549;
      `};
  }
`;

export default TaskSubtitle;
