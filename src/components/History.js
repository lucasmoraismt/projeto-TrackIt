import "../../node_modules/react-calendar/dist/Calendar.css";
import Navbar from "../components/Navbar";
import Container from "../styled/Container";
import PageTitle from "../styled/PageTitle";
import BottomBar from "./BottomBar";
import PageSubtitle from "../styled/PageSubtitle";

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
