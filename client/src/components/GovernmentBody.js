import React, { Component } from "react";
import '../App.css'


import FundTransferContract from "../contracts/FundTransfer.json";
import getWeb3 from "../getWeb3";

import Swal from 'sweetalert2/dist/sweetalert2.js'



class GovernmentBody extends Component {

        state = { storageValue: 0, web3: null, accounts: null, contract: null };
      
        componentDidMount = async () => {
          try {

            Swal.fire({
              // icon: 'success',
              title: `Make sure that you have logged in with the same MetaMask Account 😃`,
              showConfirmButton: true,
              // timer: 2000,
            })

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

          var yourBalance = document.getElementById("balance-2");


          var transactions = document.getElementById("Transactions");

          var bal;

          var date = new Date();
          date  = date.toUTCString();

          console.log('yo man',date);

          console.log('hehhrhe');
          const { accounts, contract } = this.state;
      
          console.log('contract',contract);
      
          contract.methods.getTotalFundBalance().call().then(
            (res)=>{
              bal = res;
              console.log('bal',res);
              balance.innerHTML=`<h4>${res}</h4>`
            }
          )

          contract.methods.getFundBalance(accounts[0]).call().then(
            (kp)=>{

            console.log('mera bal',kp);
            yourBalance.innerHTML=`<h4>${kp}</h4>`

            }
          )

          contract.getPastEvents("AddedGovtBody",{
            fromBlock:0,
            toBlock:"latest"
          }).then((val)=>{
            console.log('bodies',val);
            var l = val.length;

            for(var p =0;p<l;p++){
              console.log('eeedar',val[p].returnValues[0]);
              govtBodyAddressSelect.innerHTML+=`<option value=${p}>${val[p].returnValues[0]}</option>`
            }

          })



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
              var receiverGovtBodyName = val[i].returnValues.receiverGovtBodyName;
              var senderGovtBodyName = val[i].returnValues.senderGovtBodyName;


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

              // transactions.innerHTML+=

              // `<table border='1px' style="margin-left:15em">
              // <tr><td>${projectName}&nbsp&nbsp</td>
              // <td>${fundingAmount}&nbsp&nbsp</td>
              // <td>${receiverGovtBodyName}&nbsp&nbsp</td>
              // </tr>
              // </table>`
              
              console.log("Project Name -->",projectName);
              console.log("Funding Amount-->",fundingAmount);
              console.log("Receiver Govt Body-->",receiverGovtBodyName);
              console.log('-------------------------------------------');
      
            }
          })


          govtBodyAddressSelect.addEventListener('change',()=>{
            console.log('calledled');
            govtBodyName=govtBodyAddressSelect.options[govtBodyAddressSelect.selectedIndex].text;
            console.log(govtBodyName);
          })


            sanctionFundButton.addEventListener('click',()=>{
                sanctionAmount = sanctionAmount.value;
                console.log(sanctionAmount);

                projectName = projectName.value;
                console.log(projectName);

                // govtBodyAddress = govtBodyAddress.value;
                // console.log(govtBodyAddress);

                // govtBodyName=govtBodyAddressSelect.options[govtBodyAddressSelect.selectedIndex].text;

                console.log('baleeeeeeeeeeeeeee',bal);

                contract.methods.transferFunds(sanctionAmount,projectName,govtBodyName,date).send(
                    {
                        from:accounts[0]
                    }
                    ).then(()=>{
                        console.log('Sanctioned funds');
                        contract.methods.getTotalFundBalance().call().then(
                          (res)=>{
                            console.log('bal',res);
                            balance.innerHTML=`<h4>${res}</h4>`
    
                          }
                        )


                        contract.methods.getFundBalance(accounts[0]).call().then(
                          (kp)=>{
              
                          console.log('mera bal',kp);
                          yourBalance.innerHTML=`<h4>${kp}</h4>`
              
                          }
                        )


                        Swal.fire({
                          icon: 'success',
                          title: `Successfully sanctioned ${sanctionAmount} to ${govtBodyName}`,
                          showConfirmButton: false,
                          timer: 2000,
                        })

                        var sa   = document.getElementById("sanction-amount"); 
                        var pn  = document.getElementById("project-name"); 
                        console.log('meee',sa);
                        console.log('eeelgle',pn);

                        sa.value=" ";
                        pn.value =" ";

                        contract.getPastEvents("TransferFund").then((val)=>{
                          console.log('Events',val);
                          var size = val.length;
                          console.log(size);
                    
                          for(var i=size-1;i>=0;i--)
                          {
                            // console.log(val[i].returnValues);
                            var timestamp = val[i].returnValues.timestamp;
                            var projectName = val[i].returnValues.projectName;
                            var fundingAmount = val[i].returnValues.funds;
                            
                            var receiverGovtBodyName = val[i].returnValues.receiverGovtBodyName;
                            var senderGovtBodyName = val[i].returnValues.senderGovtBodyName;

              
                            transactions.innerHTML += 
                            `<tbody>
                                <tr>
                                  <td data-column="First Name">${timestamp}</td>
                                  <td data-column="Last Name">${projectName}</td>
                                  <td data-column="Twitter">${senderGovtBodyName}</td>
                                  <td data-column="Twitter">${receiverGovtBodyName}</td>
                                  <td data-column="Job Title">${fundingAmount}</td>
                                </tr>
                              </tbody>`               
                            
                            // transactions.innerHTML+=`<td>${projectName}</td>`
    
                            console.log("Project Name -->",projectName);
                            console.log("Funding Amount-->",fundingAmount);
                            console.log("Receiver Govt Body-->",receiverGovtBodyName);
                            console.log('-------------------------------------------');

                          }
    
                        })

                    })
            })

            

        }
      

        render(){


            if (!this.state.web3) {
                return <div>Loading Web3, accounts, and contract...</div>;
              }
        
            return(
        
                <div>
                    
                    <nav>
            <img id="headlogo" src="./fundslogo.png"></img>
            <h2 id="headname">Government Fund Transfer</h2>
            <h2 id="controlnamegov">In Government Body</h2>
           <a href="http://localhost:3000/selectRole" id="nav-home">Select Role</a>
          </nav>
                      
                     

                    <h4>Sanction Funds</h4>
                    <label id="labeldes">Receiver </label>&emsp;&emsp;&emsp;&emsp;
                    <select id="address">
                    <option>Choose the Receiver</option>
                    </select>

                    <br></br>
                    <label id="labeldes">Project Name</label>&emsp;&nbsp;&nbsp;
                    <input type='text' placeholder='Enter project to which it should get sanctioned' id="project-name"></input><br></br>

                    <label id="labeldes">Amount</label>&emsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;
                    <input type='text' placeholder='Enter Sanction Amount' id="sanction-amount"></input><br></br>

                    <button id="sanction-fund">Sanction Funds</button> 
                     
                    
                    <br></br>

                   <div id="remaining-balances">
                      <b>Total Allocated Funds</b>
                      <div id="balance"></div>
                   </div>

                   <div id="remaining-balance-with-you">
                    <b>Remaining Balance in Your Account</b>
                    <div id="balance-2"></div>
                    </div>

                    

                    <table id="Transactions">
                    <thead>
                      <tr>
                        <th>Time-Stamp</th>
                        <th>Sanctioned Projects</th>
                        <th>Sanctioned Government</th>
                        <th>Receiver Government</th>
                        <th>Amount Sanctioned</th>
                      </tr>
                    </thead>
    
                  </table>

                </div>
            );
        
        }
    

}

export default GovernmentBody;