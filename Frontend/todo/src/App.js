import "./App.css";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Todo from "./components/Todo.jsx";
import Login from "./components/Login.jsx";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Todo} />
        <Route exact path="/signin" component={Login} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
