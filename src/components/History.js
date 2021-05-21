import Navbar from "../components/Navbar";
import Container from "../styled/Container";
import PageSubtitle from "../styled/PageSubtitle";
import PageTitle from "../styled/PageTitle";
import BottomBar from "./BottomBar";

export default function History() {
  return (
    <>
      <Navbar />
      <Container>
        <PageTitle>Histórico</PageTitle>
        <PageSubtitle>
          Em breve você poderá ver o histórico dos seus hábitos aqui!
        </PageSubtitle>
      </Container>
      <BottomBar />
    </>
  );
}
