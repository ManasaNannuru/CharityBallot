// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function decimals() external view returns (uint256);
    function symbol() external view returns (string memory);
    function name() external view returns (string memory);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);
    function allowance(address _owner, address spender)
        external
        view
        returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
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

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

contract Ownable is Context {
    address private _owner;
    address private _previousOwner;
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    function owner() public view returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

contract ERC20 is Ownable, IERC20{
    using SafeMath for uint256;

    string  private _name;
    string  private _symbol;
    uint256 private _decimals;
    uint256 private _totalSupply;
    address public  DEAD;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    constructor(string memory name_, string memory symbol_, 
                uint256 decimals_, uint256 totalSupply_) {
        _name              = name_;
        _symbol            = symbol_;
        _decimals          = decimals_;
        _totalSupply       = totalSupply_.mul(10 ** _decimals);
        _balances[owner()] = _balances[owner()].add(_totalSupply);
        DEAD               = 0x000000000000000000000000000000000000dEaD;

        emit Transfer(address(0), owner(), _totalSupply);
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function decimals() public view override returns (uint256) {
        return _decimals;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _account) public view override returns (uint256) {
        return _balances[_account];
    }

    function allowance(address _sender, address _spender) public view override returns (uint256) {
        return _allowances[_sender][_spender];
    }

    function transfer(address _recipient, uint256 _amount) public virtual override returns(bool) {
        require(_recipient != address(0), "ERC20: Recipient can't be null address");
        require(_balances[_msgSender()] >= _amount, "ERC20: Insufficient funds");

        _balances[_msgSender()] = _balances[_msgSender()].sub(_amount);
        _balances[_recipient]   = _balances[_recipient].add(_amount);

        emit Transfer(_msgSender(), _recipient, _amount);
        return true;
    }

    function approve(address _spender, uint256 _amount) public override returns(bool) {
        require(_spender != address(0), "ERC20: Recipient can't be null address");

        _allowances[_msgSender()][_spender] = _amount;

        emit Approval(_msgSender(), _spender, _amount);
        return true;
    }

    function transferFrom(address _sender, address _recipient, uint256 _amount) public virtual override returns(bool) {
        require(_sender != address(0), "ERC20: Recipient can't be null address");
        require(_recipient != address(0), "ERC20: Recipient can't be null address");
        require(_allowances[_sender][_msgSender()] >= _amount, "ERC20: Insufficient allowance");
        require(_balances[_sender] >= _amount, "ERC20: Insufficient funds");

        _allowances[_sender][_msgSender()]  = _allowances[_sender][_msgSender()].sub(_amount);

        _balances[_sender] = _balances[_sender].sub(_amount);
        _balances[_recipient]   = _balances[_recipient].add(_amount);

        emit Transfer(_sender, _recipient, _amount);
        return true;
    }

    function burn(uint _amount) public returns(bool) {
        transfer(DEAD, _amount);
        return true;
    }
}