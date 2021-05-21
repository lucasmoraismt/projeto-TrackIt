import styled, { css } from "styled-components";

const PageSubtitle = styled.p`
  margin-bottom: 25px;
  font-size: 18px;
  line-height: 22px;
  color: #bababa;

  ${(props) =>
    props.progress &&
    css`
      color: "#8FC549";
    `}
`;

export default PageSubtitle;
