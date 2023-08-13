// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface IERC20{
    function decimals() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom( address sender, address recipient, uint256 amount) external returns (bool);
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

contract Ownable is Context {
    address private _manager;
    address private _previousOwner;
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        address msgSender = _msgSender();
        _manager = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    function manager() public view returns (address) {
        return _manager;
    }

    modifier onlyManager() {
        require(_manager == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    function transferOwnership(address newOwner) public virtual onlyManager {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _manager;
        _manager = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;
        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        return c;
    }
}

contract crowdFunding is Ownable{
    using SafeMath for uint256;

    uint256 private _minimumContribution;
    uint256 private _numberOfContributors;
    uint256 private _numberOfProposals;
    uint256 private _raisedAmount;
    uint256 private _amountAvailable;
    uint256 private _minimumContributorsToVote;

    IERC20 token;

    struct proposal{
        uint256 id;
        string  title;
        string  description;
        address fundsRecipient;
        uint256 amount;
        uint256 duration;
        address proposalCreator;
        uint256 votes;
        bool    blockStatus;
        bool    fundsReleased;
    }

    mapping(address => uint256)  private _Contribution;
    mapping(uint256 => proposal) private _Proposals;
    mapping(uint => mapping (address => bool)) private _Vote;

    event Contributions(address indexed sender, uint256 amount);

    constructor(uint256 minimumContribution_, address _tokenAddress, uint256 minimumContributorsToVote_) {
        token    = IERC20(_tokenAddress);

        _minimumContribution       = minimumContribution_;
        _minimumContributorsToVote = minimumContributorsToVote_;
    }

    function setMinimumContribution(uint256 _amount) public onlyManager {
        _minimumContribution = _amount;
    }

    function contribute(uint256 _amount) public returns(bool){
        require(_amount >= _minimumContribution, "Crowd Funding: Low contribution");

        token.transferFrom(_msgSender(), address(this), _amount);
        _raisedAmount    = _raisedAmount.add(_amount);
        _amountAvailable = _amountAvailable.add(_amount);

        if(_Contribution[_msgSender()] == 0){
            _numberOfContributors++;
        }
        _Contribution[_msgSender()] = _Contribution[_msgSender()].add(_amount);
        
        emit Contributions(_msgSender(), _amount);
        return true;
    }

    //@dev Amount should be given according the the token decimal
    //@dev Duration should be passed in days from front end
    function createProposal(string memory _title, string memory _description, address _fundsRecipient,
                            uint256 _amount, uint256 _duration) public returns(bool){
        //require(_duration >= (1 days), "Crowd Funding: The duration should be more then 1 day");
        proposal storage newProposal = _Proposals[_numberOfProposals];
        
        newProposal.id              = _numberOfProposals;
        newProposal.title           = _title;
        newProposal.description     = _description;
        newProposal.fundsRecipient  = _fundsRecipient;
        newProposal.amount          = _amount;
        newProposal.duration        = block.timestamp.add(_duration); 
        newProposal.proposalCreator = _msgSender();
        newProposal.votes           = 0;
        newProposal.blockStatus     = false;
        newProposal.fundsReleased   = false;
        _numberOfProposals++;

        return true;
    }

    function vote(uint256 _proposal) public returns(bool) {
        require(_Contribution[_msgSender()] > 0, "Crowd Funding: You can't vote without contributing");
        require(_numberOfContributors >= _minimumContributorsToVote, "Crowd Funding: Minimum contributors par is not reached");
    
        proposal storage thisProposal = _Proposals[_proposal];
        require(_Vote[_proposal][_msgSender()] == false, "Crowd Funding: You have already voted.");
        require(block.timestamp < thisProposal.duration, "Crowd Funding: Voting time has ended.");
        require(msg.sender != thisProposal.proposalCreator, "Crowd Funding: You can't vote because you created this proposal");

        _Vote[_proposal][_msgSender()] = true;
        thisProposal.votes++;

        return true;
    }

    function withdrawal(uint256 _proposal) public returns(bool) {
        proposal storage thisProposal = _Proposals[_proposal];

        require(thisProposal.proposalCreator == _msgSender(),      "Crowd Funding: You are not the creater of this proposal");
        require(thisProposal.blockStatus     == false,             "Crowd Funding: Proposal is blocked by manager");
        require(thisProposal.fundsReleased   == false,             "Crowd Funding: Funds are already released.");
        require(block.timestamp > thisProposal.duration,           "Crowd Funding: Voting is not ended yet");
        require(_amountAvailable >= thisProposal.amount,           "Crowd Funding: We currently don't have the asked amount, try again later");
        require(thisProposal.votes > _numberOfContributors.div(2), "Crowd Funding: Majority of the contributers doesn't support this proposal");
        
        token.transfer(thisProposal.fundsRecipient, thisProposal.amount);
        
        thisProposal.fundsReleased = true;
        _amountAvailable            = _amountAvailable.sub(thisProposal.amount);

        return true;
    }

    //@dev Manger can block any proposal from withdrawing funds
    function blockProposal(uint256 _proposal) public onlyManager {
        proposal storage thisProposal = _Proposals[_proposal];
        require(thisProposal.blockStatus == false, "Crowd Funding: Proposal is already blocked");

        thisProposal.blockStatus = true;
    }

    function unblockProposal(uint256 _proposal) public onlyManager {
        proposal storage thisProposal = _Proposals[_proposal];
        require(thisProposal.blockStatus == true, "Crowd Funding: Proposal is already unblocked");

        thisProposal.blockStatus = false;
    }

    function proposalBlockStatus(uint256 _proposal) public view returns(bool) {
        proposal storage thisProposal = _Proposals[_proposal];
        return thisProposal.blockStatus;
    }

    function minimumContribution() public view returns(uint256) {
        return _minimumContribution;
    }

    function numberOfContributers() public view returns(uint256) {
        return _numberOfContributors;
    }

    function numberOfProposals() public view returns(uint256) {
        return _numberOfProposals;
    }

    function raisedAmount() public view returns(uint256) {
        return _raisedAmount;
    }

    function amountAvailable() public view returns(uint256) {
        return _amountAvailable;
    }

    function contribution(address _account) public view returns(uint256) {
        return _Contribution[_account];
    }

    function proposals(uint256 _proposalNumber) public view returns(proposal memory) {
        return _Proposals[_proposalNumber];
    }

    function checkVote(uint256 _proposalNumber, address _account) public view returns(bool) {
        return _Vote[_proposalNumber][_account];
    }

    function allProposals() public view returns (proposal[] memory){

        proposal[] memory thisProposalArray = new proposal[](_numberOfProposals);
        
        for(uint i = 0; i < _numberOfProposals; i++){
            thisProposalArray[i] = _Proposals[i];
        }

        return thisProposalArray;
    }
}