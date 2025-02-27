import React from 'react';
import './App.css';
import RegisterCustomer from './user-related/RegisterCustomer';
import Login from "./user-related/Login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PropertyPage from './Property-handling/PropertyPage';
import AddProperty from './Property-handling/AddProperty';
import EditProperty from './Property-handling/EditProperty';
import RegisterEmployee from './user-related/RegisterEmployee';
import AddCraftsman from './Property-handling/AddCraftsman';
import DeleteProperty from './Property-handling/DeleteProperty';
import AddRequest from './Property-handling/Requests/AddRequest';
import DeleteRequest from './Property-handling/Requests/DeleteRequest';
import ArchivePage from './Property-handling/Requests/ArchivePage';
import RequestsPage from './Property-handling/Employee-related/RequestsPage';
import ActivateEmployee from "./user-related/super/ActivateEmployee";
import PathError from "./LinkError/PathError";
import AcceptedRequests from "./Property-handling/Employee-related/AcceptedRequests";

function App() {
  return (
      <div className={"app-wrap"}>
      <Router>
            <Routes>
                <Route path={"/"} element={<Login/>}/>
                <Route path={"/registerCustomer"} element={<RegisterCustomer/>}/>
                <Route path={"/registerEmployee"} element={<RegisterEmployee/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/Properties"} element={<PropertyPage/>}></Route>
                <Route path={"*"} element={<PathError/>}></Route>
                <Route path={"/addProperty"} element={<AddProperty></AddProperty>}/>
                <Route path={"/editProperty/:propAddress"} element={<EditProperty/>}></Route>
                <Route path={("/Properties/:propId/addCraftsman")} element={<AddCraftsman/>}></Route>
                <Route path={("/Properties/:propAddress/deleteProperty")} element={<DeleteProperty/>}></Route>
                <Route path={"/Properties/:propAddress/AddRequest"} element={<AddRequest/>}/>
                <Route path={"/Properties/:propAddress/:reqId/DeleteRequest"} element={<DeleteRequest/>}/>
                <Route path={"/Properties/:propAddress/:reqId/ArchiveRequest"} element={<ArchivePage/>}/>
                <Route path={"/:email/:propAddress/Requests"} element={<RequestsPage/>}/>
                <Route path={"/adminActivateEmp"}  element={<ActivateEmployee/>}/>
                <Route path={"/AcceptedRequests"}  element={<AcceptedRequests/>}/>
            </Routes>
      </Router>
      </div>
  );
}

export default App;
