import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";

import "../css/reset.css";
import "../css/styles.css";
import UserContext from "../contexts/UserContext";
import Login from "./Login";
import SignUp from "./SignUp";
import Today from "./Today";
import Habits from "./Habits";
import History from "./History";
import TasksContext from "../contexts/TasksContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [ratio, setRatio] = useState(0);
  const [todayTasks, setTodayTasks] = useState([]);

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
          <TasksContext.Provider
            value={{ ratio, setRatio, todayTasks, setTodayTasks }}
          >
            <Route path="/today" exact>
              <Today />
            </Route>
            <Route path="/habits" exact>
              <Habits />
            </Route>
            <Route path="/history" exact>
              <History />
            </Route>
          </TasksContext.Provider>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
