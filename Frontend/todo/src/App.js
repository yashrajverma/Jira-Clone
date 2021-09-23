import "./App.css";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Todo from "./components/Todo.jsx";
import Login from "./components/Login.jsx";
import AuthContextProvider from "./reducer/Reducer";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Switch>
          <Route exact path="/" component={Todo} />
          <Route exact path="/signin" component={Login} />
          <Redirect to="/" />
        </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
