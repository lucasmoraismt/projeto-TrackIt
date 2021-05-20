import styled from "styled-components";
import loading from "../assets/loading.gif";

export default function Loading() {
  return (
    <Load>
      <img src={loading} alt="Loading" />
    </Load>
  );
}

const Load = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100px;
    width: 100px;
  }
`;
