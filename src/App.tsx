import React from 'react';
import './App.css';
import RegisterCustomer from './user-related/RegisterCustomer';
import Login from "./user-related/Login";
import Homepage from "./Homepage/Homepage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PropertyPage from './Property-handling/PropertyPage';
import AddProperty from './Property-handling/AddProperty';
import EditProperty from './Property-handling/EditProperty';
import RegisterEmployee from './user-related/RegisterEmployee';
import AddCraftsman from './Property-handling/AddCraftsman';
import DeleteProperty from './Property-handling/DeleteProperty';
import AddRequest from './Property-handling/Requests/AddRequest';

function App() {
  return (
      <div className={"app-wrap"}>
      <Router>
            <Routes>
                <Route path={"/"} element={<Homepage/>}/>
                <Route path={"/registerCustomer"} element={<RegisterCustomer/>}/>
                <Route path={"/registerEmployee"} element={<RegisterEmployee/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/Properties"} element={<PropertyPage/>}></Route>
                <Route path={"*"} element={<Homepage/>}></Route>
                <Route path={"/addProperty"} element={<AddProperty></AddProperty>}/>
                <Route path={"/editProperty/:propAddress"} element={<EditProperty/>}></Route>
                <Route path={("/Properties/:propId/addCraftsman")} element={<AddCraftsman/>}></Route>
                <Route path={("/Properties/:propAddress/deleteProperty")} element={<DeleteProperty/>}></Route>
                <Route path={"/Properties/:propAddress/AddRequest"} element={<AddRequest/>}/>
            </Routes>
      </Router>
      </div>
  );
}

export default App;
