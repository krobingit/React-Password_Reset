import './App.css';
import { Switch,Redirect, Route } from 'react-router-dom';
import { Login } from './Pages/login';
import { Register } from './Pages/register'
import {ForgotPassword} from './Pages/forgotPassword'
function App() {
  return (
    <div className="App">
   <Switch>
         <Route exact path="/register">
          <Register />
        </Route>
         <Route exact path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/">
                <Login />
          <Redirect to="/login"/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
/*


        <Route path="/resetPassword/:id/:token">
          <ResetPassword />
        </Route>*/