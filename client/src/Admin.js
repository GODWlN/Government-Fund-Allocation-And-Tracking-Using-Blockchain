import React, { Component } from "react";

import FundTransferContract from "./contracts/FundTransfer.json";
import getWeb3 from "./getWeb3";

// import Swal from 'sweetalert2/dist/sweetalert2.js'

import Swal from 'sweetalert2/dist/sweetalert2.js'


class Admin extends Component {

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

          var govtJSON;

          console.log('hehhrhe');

          console.log(govtJSON);

          const { accounts, contract } = this.state;
      
          console.log('contract',contract);

          var gBR = document.getElementById("govt-body-role");


          var govtBodyRole = document.getElementById("govt-body-role");
          var govtBodyName = document.getElementById("govt-body-name");
          var govtBodyAddress   = document.getElementById("address");

          var addGovtButton = document.getElementById("add-govt-body");



        

          gBR.addEventListener('change',()=>{
            govtBodyRole=gBR.options[gBR.selectedIndex].value;
            console.log('uberrr',govtBodyRole);
          })
          
          addGovtButton.addEventListener('click',()=>{
          
          govtBodyName = govtBodyName.value;
          govtBodyAddress = govtBodyAddress.value;
          


          govtJSON = {
            govtBodyName : govtBodyAddress
          }

          console.log('objj',govtJSON);
        
          
          contract.methods.addGovernmentBody(govtBodyAddress,govtBodyName,govtBodyRole).send({
            from:accounts[0]
          }).then(()=>{
            console.log('added new Govt');

            Swal.fire({
              icon: 'success',
              title: `${govtBodyName} has been added Successfully`,
              showConfirmButton: false,
              timer: 2000,
            })

            var govtBN = document.getElementById("govt-body-name");
            var govtBA  = document.getElementById("address");
  
            govtBN.value=" ";
            govtBA.value =" ";

          });

         


          })

         
  
           

      
        };
      
       

render(){


    if (!this.state.web3) {
        return <div>Loading Web3, accounts, and contract...</div>;
      }

    return(

        <div className="Admin">
 

          <nav>
            <img id="headlogo" src="./fundslogo.png"></img>
            <h2 id="headname">Government Fund Transfer</h2>
            <h2 id="controlname">Admin Control</h2>
            <a href="http://localhost:3000/" id="nav-home">Home</a>
          </nav>
          

            <h1>In Admin</h1>

            <h3>Add a new Government Body</h3>
            <label id="labeldes">Government Body</label>&emsp;&nbsp;&nbsp;
            <input type='text' placeholder='Enter Government Body Name' id="govt-body-name"></input><br></br>

            <br></br>
            <label id="labeldes">Government Role</label>&emsp;&nbsp;&nbsp;
            <select id="govt-body-role">
              <option>Choose the Role of Government</option>
              <option value="Central">Central Government</option>
              <option value="State">State Government</option>
              <option value="State">District Government</option>
              <option value="State">Taluk Government</option>
              <option value="NA">Panchayat</option>
            </select>

            <br></br>
            <label id="labeldes">Public Address</label>&emsp;&emsp;&emsp;
            <input type='text' placeholder='Enter thier Public Addres' id="address"></input><br></br>


            <button id="add-govt-body">Add New User</button>

                   
        </div>
    );

}
}

  
export default Admin;