import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { Link } from 'react-router-dom';
import '../App.css'



function SelectRole(){

    return(
        <Router>
            <div className="SelectRole">

            

             <nav>
            <img id="headlogo" src="./fundslogo.png"></img>
            <h2 id="headname">Government Fund Transfer</h2>
            <h2 id="controlname">Select Role</h2>
           <a href="http://localhost:3000/" id="nav-home">Home</a>
          </nav>
          
        
          <section id="contents">

              
          {/* <Link to="/addFunds" target="_blank"> 
                    <h2 >Add Funds</h2>
                </Link>
            

                <Link to='/sanctionFund' target="_blank"> 
                    <h2 >Sanction Funds to States or Districts</h2>
                </Link> */}
        <div id="box1pos">
            <div id="box">
            <Link to="/addFunds" target="_blank"> 
                    <h2 >Add Funds</h2>
                </Link>
            </div>
        </div>
        
        <div id="box2pos">
            <div id="box">
            <Link to='/sanctionFund' target="_blank"> 
                    <h2 >Sanction Funds to States/Districts</h2>
                </Link>
            </div>
        </div>
          
              </section>
            </div>
 
        </Router>
       

    );
}

export default SelectRole;