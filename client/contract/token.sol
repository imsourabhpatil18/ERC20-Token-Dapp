// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;  

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract SourabhToken is ERC20,Ownable {


  address[]private tokenHolders;
  uint nextProposalId=1;
  uint voteTime;
  uint quorum;

  struct proposal{
    uint id;
    string description;
    uint votes;
    uint end;
    bool isExecuted;
  
  }

  mapping(uint => proposal)public proposals;  //mapping to store proposals
  mapping (address=>mapping (uint=>bool))public isVoted;  
  mapping(address=>uint)public numOfTokens;  //mapping to store numOfTokens holders own;

  
   

constructor(uint _voteTime,uint _quorum) ERC20("Sourabh","SP") Ownable(msg.sender){
    _mint(msg.sender, 1000000000000000000000 );
    tokenHolders.push(msg.sender); //add the owner as token holder in tokenHolderss array
    voteTime= _voteTime;
    quorum = _quorum;

  }

  mapping (address=> bool)public authorised;    //mapping to store authorised addresses

// modifier to set require check  the authorised address who can call the function
  modifier onlyAuthorised(){
    require(msg.sender==owner() || isAuthorised(msg.sender),"you are not authorised ");
    _;
  }

  //function to add authorised any address to list of authorised address
  function addAuthorised(address _address)external onlyOwner{
    authorised[_address]=true;
  }

  //function to remove address from authorised addresses 
  function removeAuthorised(address _address)external onlyOwner{
    authorised[_address]=false;
  }

//function to check the address is authorised 
function isAuthorised(address _address)public view returns(bool){
  return authorised[_address];
}


//function to mint new token and assign to that address
 function mintToken(address _to,uint amount)public onlyAuthorised{
  _mint(_to, amount );
 }

 //function to burn token from specific address
 function burnToken(address _to, uint amount)public onlyAuthorised{
  _burn(_to, amount);
 }


//propoal created by the owner
function createProposal( string memory _description ) external onlyOwner{
    proposals[nextProposalId]=proposal(nextProposalId,_description,0,block.timestamp+voteTime,false);
    nextProposalId++;
}

//function to vote for the proposal created by owner
function voteProposal(uint _proposalId)external onlyAuthorised{ 
    require(isVoted[msg.sender][_proposalId]==false,"you have aleready voted");
    require(proposals[_proposalId].end>block.timestamp,"voting ended");
    isVoted[msg.sender][_proposalId]=true;
    proposals[_proposalId].votes+=numOfTokens[msg.sender];

}

//function to execute proposal
function executeProposal(uint _proposalId) public onlyOwner{
  require(proposals[_proposalId].isExecuted==false,"this proposal is already executed");
  require(((proposals[_proposalId].votes*100)/totalSupply())>=quorum,"majority not support");
  proposals[_proposalId].isExecuted=true;

}




}