import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login/Login";
import { useState } from "react";

import "../css/reset.css";
import "../css/styles.css";

export default function App() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [token, setToken] = useState("");

  return (
    <BrowserRouter>
      <Switch>
        <Route to="/" exact>
          <Login token={token} setToken={setToken} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
