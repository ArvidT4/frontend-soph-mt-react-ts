import React from 'react';
import './App.css';
import RegisterCustomer from './user-related/RegisterCustomer';
import Login from "./user-related/Login";
import Homepage from "./Homepage/Homepage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PropertyPage from './Property-handling/PropertyPage';
import AddProperty from './Property-handling/AddProperty';

function App() {
  return (
      <div className={"app-wrap"}>
      <Router>
            <Routes>
                <Route path={"/"} element={<Homepage/>}/>
                <Route path={"/registerCustomer"} element={<RegisterCustomer/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/Properties"} element={<PropertyPage/>}></Route>
                <Route path={"*"} element={<Homepage/>}></Route>
                <Route path={"/addProperty"} element={<AddProperty></AddProperty>}/>
            </Routes>
      </Router>
      </div>
  );
}

export default App;
