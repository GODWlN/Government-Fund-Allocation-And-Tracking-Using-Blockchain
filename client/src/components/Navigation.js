import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { Link } from 'react-router-dom';


import React, { Component } from "react";


import FundTransferContract from "../contracts/FundTransfer.json";
import getWeb3 from "../getWeb3";

// import App from "../App.css"

class Navigation extends Component {

    state = { storageValue: 0, web3: null, accounts: null, contract: null };
  
    componentDidMount = async () => {
      try {
        console.log('uoooooo');

       
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        console.log('innnnnn');
        console.log('gegege',web3);
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FundTransferContract.networks[networkId];
        const instance = new web3.eth.Contract(
            FundTransferContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
  
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ web3, accounts, contract: instance }, this.runExample);

      } catch (error) {
        // Catch any errors for any of the above operations.
        // alert(
        //   `Failed to load web3, accounts, or contract. Check console for details.`,
        // );
        console.error(error);
      }
    };

    runExample = async () => {
        
        var govtBodyName;
        var allocateFundButton = document.getElementById("allocate-fund");
        var fundAmount   = document.getElementById("fund-amount"); 
        
        var govtBodyAddressSelect = document.getElementById("address");
        var sanctionAmount   = document.getElementById("sanction-amount"); 
        var projectName   = document.getElementById("project-name"); 

        var sanctionFundButton = document.getElementById("sanction-fund");

        var balance = document.getElementById("balance");

        var transactions = document.getElementById("Transactions");

        var bal;

        console.log('hehhrhe');
        const { accounts, contract } = this.state;
    
        console.log('contract',contract);
    
       
        contract.getPastEvents("TransferFund",{
          fromBlock:0,
          toBlock:'latest'
        }).then((val)=>{
          console.log('Events',val);
          var size = val.length;
          console.log(size);
    
          for(var i=size-1;i>=0;i--){
            // console.log(val[i].returnValues);
            var timestamp = val[i].returnValues.timestamp;
            var projectName = val[i].returnValues.projectName;
            var fundingAmount = val[i].returnValues.funds;
            var senderGovtBodyName = val[i].returnValues.senderGovtBodyName;
            var receiverGovtBodyName = val[i].returnValues.receiverGovtBodyName;

            // transactions.innerHTML+=`${projectName}&nbsp${fundingAmount}&nbsp${receiverGovtBodyName}<br>`

            transactions.innerHTML+=
            `<tbody>
            <tr>
              <td data-column="First Name">${timestamp}</td>
              <td data-column="Last Name">${projectName}</td>
              <td data-column="Twitter">${senderGovtBodyName}</td>
              <td data-column="Twitter">${receiverGovtBodyName}</td>
              <td data-column="Job Title">${fundingAmount}</td>
            </tr>
           
          </tbody>`


             console.log("Project Name -->",projectName);
            console.log("Funding Amount-->",fundingAmount);
            console.log("Receiver Govt Body-->",receiverGovtBodyName);
            console.log('-------------------------------------------');
    
          }
        })


      }


    render(){  

        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
          }
    else{
        return(
    
    <Router>
        <Switch>
            <div id="home-page-items">

            <nav>
            <img id="headlogo" src="./fundslogo.png"></img>
            <h2 id="headname">GOVBLOCKCHAIN</h2>
            <h2 id="controlname">Home Page</h2>
           
            <Link to="/admin" target="_blank" id="Links"> 
                    <p id="nav-adm">Login as Admin </p>
                </Link>

                <Link to="/selectRole" target="_blank" id="Links"> 
                    <p id="nav-gov">Login as Government Body</p>
                </Link>
          </nav>
                

               

                {/* <Link to="/admin" target="_blank" id="Links"> 
                    <h6 id="nav-home">Login as Admin </h6>
                </Link> */}

                {/* <Link to="/selectRole" target="_blank" id="Links"> 
                    <h2>Login as a Government Body</h2>
                </Link> */}
               
                <p></p><br></br>
                <p></p><br></br>
<section id="contents">

The working of governments involves huge number of transactions towards various
 operations that need to be carried out throughout the nation. This includes new 
 projects, repair and maintenance works, awarding contracts, paying of government 
 employees, farmer schemes and so on. Usually when a project is allocated funds, 
 there is no knowledge as to how these funds are being used and a large part of
  it is never show in records due to corruption. To solve 
this problem, a system has been proposed using Blockchain to provide the transparency. 
</section>
<p></p><br></br>
                 
<section id="contents">
<table id="Transactions">

                <thead>
                  <tr>
                    <th>Time-Stamp</th>
                    <th>Sanctioned Projects</th>
                    <th>Sanctioned Government</th>
                    <th>Receiver Government</th>
                    <th>Amount Sanctioned in Rupees</th>
                  </tr>
                </thead>

              </table>

</section>
                
            </div>
        </Switch>
    </Router>
        )
    }
    }

}

export default Navigation;