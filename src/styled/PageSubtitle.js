import styled from "styled-components";

const PageSubtitle = styled.p`
  margin-bottom: 25px;
  font-size: 18px;
  line-height: 22px;
  color: ${(props) => (props.progress ? "#8FC549" : "#bababa")};
`;

export default PageSubtitle;
