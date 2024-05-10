import React, { Component } from "react";
import '../App.css'


import FundTransferContract from "../contracts/FundTransfer.json";
import getWeb3 from "../getWeb3";


class AddFunds extends Component {

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
        
          var allocateFundButton = document.getElementById("allocate-fund");
          var fundAmount   = document.getElementById("fund-amount"); 
          
          var govtBodyAddress = document.getElementById("address");
          var sanctionAmount   = document.getElementById("sanction-amount"); 
          var projectName   = document.getElementById("project-name"); 

          var sanctionFundButton = document.getElementById("sanction-fund");

          var balance = document.getElementById("balance");

          var transactions = document.getElementById("Transactions");

          var fundTimeStamp = document.getElementById("fund-timestamp");


          var time = new Date();

          time = time.toUTCString();
          
          console.log('hehhrhe');
          const { accounts, contract } = this.state;
      
          console.log('contract',contract);
      
          contract.methods.getTotalFundBalance().call().then(
            (res)=>{
              console.log('bal',res);
              balance.innerHTML=`<h4>${res}</h4>`
            }
          )

          contract.getPastEvents("AddFund",{
            fromBlock:0,
            toBlock:'latest'
          }).then((val)=>{
            console.log('Events',val);
            var size = val.length;
            console.log(size);
      
            for(var i=size-1;i>=0;i--){
              // console.log(val[i].returnValues);
              var time = val[i].returnValues.time;
              var amount = val[i].returnValues.funds;
             
              fundTimeStamp.innerHTML+=
              `<tbody>
                <tr>
                  <td data-column="First Name">${time}</td>
                  <td data-column="Last Name">${amount}</td>
                </tr>
              </tbody>`             
            
      
            }
          })

            allocateFundButton.addEventListener('click',()=>{
                console.log(fundAmount);
                var amount = fundAmount.value;
                console.log(amount);

            contract.methods.addFunds(amount,time).send({
                from:accounts[0]
            }).then(()=>{
                console.log('added funds');

                contract.methods.getTotalFundBalance().call().then(
                  (res)=>{
                    console.log('bal',res);
                    balance.innerHTML=`<h4>${res}</h4>`
                  }
                )

                fundTimeStamp.innerHTML+=
                `<tbody>
                <tr>
                  <td data-column="First Name">${time}</td>
                  <td data-column="Last Name">${amount}</td>
                </tr>
              </tbody>`               

                var fa   = document.getElementById("fund-amount"); 
                fa.value="";


            });
            })

        }

        render(){
          
            if (!this.state.web3) {
                return <div>Loading Web3, accounts, and contract...</div>;
              }
        
            return(
        
                <div className="Admin">

                      
                      <nav>
            <img id="headlogo" src="./fundslogo.png"></img>
            <h2 id="headname">Government Fund Transfer</h2>
            <h2 id="controlname">Allocate Funds</h2>
           <a href="http://localhost:3000/selectRole" id="nav-home">Select Role</a>
          </nav>
          <label id="labeldes">Funds</label>&emsp;&nbsp;&nbsp;
                    <input type='text' placeholder='Enter Fund Amount' id="fund-amount"></input>
                    <br></br>
                    <button id="allocate-fund">Allocate Funds</button>
                    

                    <br></br>
                    <br></br>
                    <b>Total Allocated Funds</b> 
                    <div id="balance"></div>

                   
                    <table id="fund-timestamp">
                    <thead>
                      <tr>
                        <th>Time-Stamp</th>
                        <th>Amount</th>
                        
                      </tr>
                    </thead>
                  </table>
            
                </div>
            );
        
        }
    

}

export default AddFunds;