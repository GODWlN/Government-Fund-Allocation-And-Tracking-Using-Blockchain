var FundTransfer = artifacts.require("./FundTransfer.sol");

module.exports = function(deployer) {
  deployer.deploy(FundTransfer);
};
