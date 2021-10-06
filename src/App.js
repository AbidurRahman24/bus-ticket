import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Home/Navbar/Navbar";
import Login from "./components/LogIn/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Map from "./components/Map/Map";
import './App.css'

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div className='homemain'>
      <div className='container'>
       <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/home'>
            <Home/>
          </Route>
          <PrivateRoute path='/map'>
            <Map/>
          </PrivateRoute>
          <Route path='/login'>
            <Login/>
          </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
    </div>
    </div>
  );
}

export default App;
