import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { HomePage } from "./Components/homePage";
import { TodosList } from "./Components/todoList";
import { Provider } from 'react-redux';
import { store } from "./store";
import 'bootstrap/dist/css/bootstrap.min.css'
import { CreateNewTodo } from "./Components/createTodo";
import { ShowSingleTodo } from './Components/showSingleTodo';
import { Login } from './Components/loginCards';

const App = () => {
  return (
    <div>
      <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/newTodo" component={CreateNewTodo} />
          <Route path="/singleTodo/:todoId" component={ShowSingleTodo} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
