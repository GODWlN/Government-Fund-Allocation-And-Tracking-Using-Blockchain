import React, { Component } from "react";
import FundTransferContract from "./contracts/FundTransfer.json";
import getWeb3 from "./getWeb3";
import Admin from "./Admin";

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';



import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

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
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    console.log(contract);

    // contract.methods.addGovernmentBody('0x7dDd0Ee803108D572ada147c912e1ca365686f87',"Karnataka State Govt").send({
    //   from:accounts[0]
    // }).then(()=>{
    //   console.log('added');
    // });

    //  contract.methods.addGovernmentBody('0x0CF463055B65EFb97269726Eb3125581Bd2B8979',"Maharastra State Govt").send({
    //   from:accounts[0]
    // }).then(()=>{
    //   console.log('added');
    // });



    // contract.methods.addFunds(10000).send({
    //   from:accounts[0]
    // }).then(()=>{
    //   console.log('added funds');
    // });


    // contract.methods.transferFunds(100,'Sanction for Health','0x0CF463055B65EFb97269726Eb3125581Bd2B8979').send(
    //   {
    //     from:accounts[0]
    //   }
    // ).then(()=>{
    //   console.log('Transfered funds');
    // })


    contract.getPastEvents("TransferFund",{
      fromBlock:0,
      toBlock:'latest'
    }).then((val)=>{
      console.log('Events',val);
      var size = val.length;
      console.log(size);

      for(var i=0;i<size;i++){
        // console.log(val[i].returnValues);

        var projectName = val[i].returnValues.projectName;
        var fundingAmount = val[i].returnValues.funds;
        var receiverGovtBodyName = val[i].returnValues.receiverGovtBodyName;

        console.log("Project Name -->",projectName);
        console.log("Funding Amount-->",fundingAmount);
        console.log("Receiver Govt Body-->",receiverGovtBodyName);
        console.log('-------------------------------------------');



      }
    })


    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });

    var fundingAmount = document.getElementById("funds");
    var projectName = document.getElementById("project-name");
    var receiverAddress = document.getElementById("funds");




  };

  // transferFund = (fundingAmount,projectName,receiverAddress)=>{

  //   const { accounts, contract } = this.state;

  //   console.log(contract);


  //    // contract.methods.transferFunds(5000,'Sanction for usage of BLockchain in Health-Care','0x7dDd0Ee803108D572ada147c912e1ca365686f87').send(
  //   //   {
  //   //     from:accounts[0]
  //   //   }
  //   // ).then(()=>{
  //   //   console.log('Transfered funds');
  //   // })
  // };




  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">

      
        <h1>Welcome</h1>

        <h4>Login As</h4>

        <h3>Admin</h3>

        <h3>Government Body</h3>
       
       
        

        <div>The stored value is: {this.state.storageValue}</div>

      </div>
    );
  }
}

export default App;
