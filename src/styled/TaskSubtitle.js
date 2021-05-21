import styled from "styled-components";

const TaskSubtitle = styled.p`
  font-size: 13px;
  line-height: 16px;
  color: "#666";

  span {
    color: ${(props) => (props.checked ? "#8fc549" : "#666")};
  }
`;

export default TaskSubtitle;
