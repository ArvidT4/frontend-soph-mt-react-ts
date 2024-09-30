import React from 'react';
import './App.css';
import Register from './user-related/register';
import Login from "./user-related/Login";
import Homepage from "./Homepage/Homepage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
      <Router>
            <Routes>
                <Route path={"/"} element={<Homepage/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/login"} element={<Login/>}/>
            </Routes>
      </Router>
  );
}

export default App;
