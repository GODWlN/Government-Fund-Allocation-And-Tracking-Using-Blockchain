pragma solidity >=0.4.21 <=0.8.4;

contract FundTransfer{
    
    uint public totalFunds=0;


    
    struct GovermentBody{
        address accoutNumber;
        uint accountBalance;
        string govermentBodyName;
        string govermentBodyRole;
    }
    
    event AddFund(
        
        uint funds,
        string govtBody,
        string time 
    
    );
    
    
    event TransferFund(
        
        uint funds,
        address senderGovtBody,
        address receiverGovtBody,
        string senderGovtBodyName,
        string receiverGovtBodyName,
        string projectName,
        string timestamp
        
    );

    mapping(address => GovermentBody) govermentBodyMapping;

    mapping(string => address) govtBodyNameMapping;

    
    event AddedGovtBody(
        string govtBodyName,
        address accNumber,
        string govtBodyRole
    );

    event YourBalance(
        uint balance
    );
    

    function addGovernmentBody(address accNumber,string memory govtBodyName,string memory govtBodyRole) public {
        govermentBodyMapping[accNumber].accoutNumber =accNumber;
        govermentBodyMapping[accNumber].govermentBodyName = govtBodyName;
        govermentBodyMapping[accNumber].accountBalance=0;
        govermentBodyMapping[accNumber].govermentBodyRole = govtBodyRole; 

        govtBodyNameMapping[govtBodyName] = accNumber;

      
        emit AddedGovtBody(govtBodyName,accNumber,govtBodyRole);

    }
    
    
    function addFunds(uint funds,string memory time) public {

        require((keccak256(abi.encodePacked(govermentBodyMapping[msg.sender].govermentBodyRole)) 
        == keccak256(abi.encodePacked("Central"))));

        totalFunds+=funds;
        
        govermentBodyMapping[msg.sender].accountBalance+=funds;

        emit AddFund(funds,"Central Government",time);
    }
    
    function transferFunds(uint funds,string memory projectName,string memory govtBodyName,string memory timestamp) public {
        
        require(
        
        (keccak256(abi.encodePacked(govermentBodyMapping[msg.sender].govermentBodyRole)) 
        == keccak256(abi.encodePacked("Central"))) ||

        (keccak256(abi.encodePacked(govermentBodyMapping[msg.sender].govermentBodyRole)) 
        == keccak256(abi.encodePacked("State"))));

        address fundRecevier = govtBodyNameMapping[govtBodyName];

        require((keccak256(abi.encodePacked(msg.sender))) != (keccak256(abi.encodePacked(govtBodyNameMapping[govtBodyName]))));
             
        govermentBodyMapping[fundRecevier].accountBalance+=funds;

        govermentBodyMapping[msg.sender].accountBalance-=funds;
        
        emit TransferFund(funds,msg.sender,fundRecevier,govermentBodyMapping[msg.sender].govermentBodyName,govermentBodyMapping[fundRecevier].govermentBodyName,projectName,timestamp);

        emit YourBalance(govermentBodyMapping[msg.sender].accountBalance);

    }
    
    function getFundBalance(address fok) public payable returns (uint) {
        uint mbal = govermentBodyMapping[fok].accountBalance;
        return mbal;
    }

    // Displays remaining balance from the total sanctioned funds

    function  getTotalFundBalance() public view returns (uint){

        return totalFunds;
    }
    
}


