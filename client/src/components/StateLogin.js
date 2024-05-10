import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { Link } from 'react-router-dom';


function StateLogin(){

    return(
        <Router>
            <div className="Login">

            <nav>
                <a href="http://localhost:3000/" id="nav-home">Home</a>
            </nav>
          

                <h1>State Government Login </h1>

                <input type='text' placeholder='Enter your Password' id="password"></input><br></br>

                <Link to="/sanctionFund" target="_blank">
                    <button id="login">Login</button> 
                </Link>
                    

            </div>
 
        </Router>
       

    );
}

export default StateLogin;