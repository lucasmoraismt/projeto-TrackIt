import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route to="/" exact>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
