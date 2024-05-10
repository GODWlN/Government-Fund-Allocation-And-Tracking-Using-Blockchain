import React, { Component } from "react";

import Admin from "./Admin";

import GovernmentBody from "./components/GovernmentBody";

import Navigation from "./components/Navigation";

import SelectRole from "./components/SelectRole";

import { BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom';

import App from "./App";


import FundTransferContract from "./contracts/FundTransfer.json";
import getWeb3 from "./getWeb3";
import AddFunds from "./components/AddFunds";

import Login from "./components/CentralLogin";
import CentralLogin from "./components/CentralLogin";

import StateLogin from "./components/StateLogin";





function HomePage(){
   
    return(

        <div className="HomePage">


        <Router>

            <Switch>

                <Route exact path='/'  component={Navigation} />
                <Route exact path='/admin'  component={Admin} />
                <Route exact path='/selectRole'  component={SelectRole}></Route>
                <Route exact path='/addFunds'  component={AddFunds}></Route>
                <Route exact path='/sanctionFund'  component={GovernmentBody}></Route>
                <Route exact path='/CentralLoginPage'  component={CentralLogin}></Route>
                <Route exact path='/StateLoginPage'  component={StateLogin}></Route>

            </Switch>
            
        </Router>


        <ul id="Transactions">
    
        </ul>

        </div>
 
       
    );
}

export default HomePage;