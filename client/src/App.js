import "./App.css";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Todo from "./components/Todo.jsx";
import Login from "./components/Login.jsx";
import { reducer, initialState } from "./reducer/Reducer";
import { useContext, createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();
function Routing() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "USER", payload: user });
      history.push("/");
    } else {
      history.push("/signin");
    }
  }, []);
  return (
    <>
      <Switch>
        <Route exact path="/" component={Todo} />
        <Route exact path="/signin" component={Login} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        <Routing />
      </UserContext.Provider>
    </div>
  );
}

export default App;
