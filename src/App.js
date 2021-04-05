import React from 'react';

import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListCompany from './components/ListCompany';
import CreateCompany from './components/CreateCompany';
import ViewCompany from './components/ViewCompany';

function App() {
  return (
    <div>
        <Router>
              
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListCompany}></Route>
                          <Route path = "/companies" component = {ListCompany}></Route>
                          <Route path = "/add-company/:id" component = {CreateCompany}></Route>
                          <Route path = "/view-company/:id" component = {ViewCompany}></Route>
                          {/* <Route path = "/update-company/:id" component = {UpdateCompanyComponent}></Route> */}
                    </Switch>
                 </div>              
        </Router>
    </div>
    
  );
}

export default App;