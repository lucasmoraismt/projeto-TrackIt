import styled from "styled-components";

const Container = styled.div`
  padding: 25px 18px 30px;
  margin: 70px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .redDay {
    background-color: #e85666;
  }
  .greenDay {
    background-color: #8cc654;
  }
  .normal {
    background-color: #fff;
  }
`;

export default Container;
