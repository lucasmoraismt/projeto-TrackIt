import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";

import "../css/reset.css";
import "../css/styles.css";
import UserContext from "../contexts/UserContext";
import Login from "./Login";
import SignUp from "./SignUp";
import Today from "./Today";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
        </Switch>
        <Switch>
          <Route path="/today" exact>
            <Today />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
