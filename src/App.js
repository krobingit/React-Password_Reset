import './App.css';
import { Switch,Redirect, Route } from 'react-router-dom';
import { Login } from './Pages/login';

function App() {
  return (
    <div className="App">
   <Switch>
        <Route path="/">
          <Redirect to="/login"/>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
/*
 <Route path="/register">
          <Register />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/resetPassword/:id/:token">
          <ResetPassword />
        </Route>*/