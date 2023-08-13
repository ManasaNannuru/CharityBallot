import { useContext, createContext } from "react";
import Web3 from "web3";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useNavigate } from "react-router";
// import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";
import SuccessToast from "../components/SuccessToast";
import ErrorToast from "../components/ErrorToast";


// Creating a new context
const StateContext = createContext();


// To use the context, we need a provider that is a function which
// allow us to use the context functionalities in other parts of our app
export const StateContextProvider = ({ children }) => {
  const web3 = new Web3(window.ethereum);
  const nav=useNavigate()
  const contractABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Contributions",
      type: "event",
    },
    {
      inputs: [],
      name: "allProposals",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "title",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "address",
              name: "fundsRecipient",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "duration",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "proposalCreator",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "votes",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "blockStatus",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "fundsReleased",
              type: "bool",
            },
          ],
          internalType: "struct crowdFunding.proposal[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "amountAvailable",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposal",
          type: "uint256",
        },
      ],
      name: "blockProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposalNumber",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
      ],
      name: "checkVote",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "contribute",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
      ],
      name: "contribution",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_title",
          type: "string",
        },
        {
          internalType: "string",
          name: "_description",
          type: "string",
        },
        {
          internalType: "address",
          name: "_fundsRecipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_duration",
          type: "uint256",
        },
      ],
      name: "createProposal",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposal",
          type: "uint256",
        },
      ],
      name: "deleteProposal",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "manager",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "minimumContribution",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "numberOfContributers",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "numberOfProposals",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposal",
          type: "uint256",
        },
      ],
      name: "proposalBlockStatus",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposalNumber",
          type: "uint256",
        },
      ],
      name: "proposals",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "title",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "address",
              name: "fundsRecipient",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "duration",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "proposalCreator",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "votes",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "blockStatus",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "fundsReleased",
              type: "bool",
            },
          ],
          internalType: "struct crowdFunding.proposal",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "raisedAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "setMinimumContribution",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposal",
          type: "uint256",
        },
      ],
      name: "unblockProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposal",
          type: "uint256",
        },
      ],
      name: "vote",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposal",
          type: "uint256",
        },
      ],
      name: "withdrawal",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const tokenContractAbi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "DEAD",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_sender",
          type: "address",
        },
        {
          internalType: "address",
          name: "_spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_sender",
          type: "address",
        },
        {
          internalType: "address",
          name: "_recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // contract address

  // const contractAddress = "0x54307C68Dabff6A917e5d6B4267aa55FDAF268B7";
  // const tokenContractAddress = "0x51b23b13b7D6A92cDB839ae6ed1b5Cb69Bc319f6";
  const contractAddress = "0x0472056226F979102E95FbB9dc37c543638A9553";
  const tokenContractAddress = "0x27cF2f6072c49E4F01f940B3ca1907094A81e482";
  // "0x6ea338D6288651dd559247D5AEab93A413f50871";
  // 0x38fBEdA6DD49922DD379139b17b7F8e658168daE";
  const chainId=97

  // Accessing the contract
  // Pass the contract address to useContract hook

  // const {contract}=useContract('0xa2568839fCeE4A9dD05A69C811888cf021DC20B3')
  const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
  const tokenContractInstance = new web3.eth.Contract(
    tokenContractAbi,
    tokenContractAddress
  );
 const toast=useToast()
  console.log(contractInstance)

  // console.log(contractInstance)//

  // In thirdweb, we can call the write functions as follow.
  // Write functions are those in which we pass some data to contract
  // Dummy variable names are also guiding you more

  // Get address of Wallet

  const address = useAddress();

  // Connect the metamask Wallet

  const connectWithMetamask = useMetamask();



  const publishProposal = async (
    title,
    description,
    recipientAddress,
    amount,
    duration
  ) => {
    const contractInstance = new web3.eth.Contract(
      contractABI,
      contractAddress
    );

    try {
      const result = await contractInstance.methods
        .createProposal(title, description, recipientAddress, amount, duration)
        .send({ from: address });
        nav('/')
        SuccessToast(toast,'Proposal Created Successfully')

      return result;
    } catch (err) {
      ErrorToast(toast,'Something Went Wrong!')
      console.log(err);
    }
  };

  const getAllContributors = async () => {
    try {
      const result = await contractInstance.methods
        .numberOfContributers()
        .call();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const checkStatus = (duration) => {
    let durationInMilisecond = duration * 1000;
    let currentTime = new Date().getTime();
    if (currentTime > durationInMilisecond) {
      return true;
    } else {
      return false;
    }
  };

  const getAllProposals = async () => {
    const contractInstance = new web3.eth.Contract(
      contractABI,
      contractAddress
    );
    try {
      const result = await contractInstance.methods.allProposals().call();
      console.log(
        "🚀 ~ file: index.js:536 ~ getAllProposals ~ result:",
        result
      );
      let arr = [];
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          let data = {
            id: result[i][0],
            title: result[i][1],
            description: result[i][2],
            fundRecipient: result[i][3],
            amount: result[i][4],
            duration: result[i][5],
            proposalCreator: result[i][6],
            votes: result[i][7],
            blockStatus: result[i][8],
            fundReleased: result[i][9],
            expired: checkStatus(Number(result[i][5])),
          };
          arr.push(data);
        }
        return arr;
      }
    } catch (error) {
      console.log("🚀 ~ file: index.js:557 ~ getAllProposals ~ error:", error);
      return [];
    }
  };

  const getTotalRaisedAmount = async () => {
    try {
      const result = await contractInstance.methods.raisedAmount().call();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const getTotalNumberOfProposals = async () => {
    try {
      const result = await contractInstance.methods.numberOfProposals().call();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const getTotalFundBalance = async () => {
    try {
      const result = await contractInstance.methods.amountAvailable().call();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllowance = async (walletAddress, contractAddress) => {
    console.log(
      "🚀 ~ file: index.js:924 ~ getAllowance ~ contractAddress:",
      contractAddress
    );
    console.log(
      "🚀 ~ file: index.js:924 ~ getAllowance ~ walletAddress:",
      walletAddress
    );
    try {
      console.log("first");
      const result = await tokenContractInstance.methods
        .allowance(walletAddress, contractAddress)
        .call();
      console.log("mus", result);
      return result;
    } catch (error) {
      console.log("🚀 ~ file: index.js:934 ~ getAllowance ~ error:", error);
      console.log(error);
    }
  };

  const getMinValueOfContribution = async () => {
    try {
      const result = await contractInstance.methods
        .minimumContribution()
        .call();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const approveValue = async (contractAddress, maxVal) => {
    try {
      console.log("first");
      const result = await tokenContractInstance.methods
        .approve(contractAddress, maxVal)
        .send({ from: address });
        nav('/')

        SuccessToast(toast,'Approved!')

      console.log("approveValue", result);
      return result;
    } catch (error) {
      ErrorToast(toast,'Something Went Wrong')

      console.log("🚀 ~ file: index.js:934 ~ getAllowance ~ error:", error);
      console.log(error);
    }
  };




  const contributeValue = async (val) => {
    try {
      const balance = await tokenContractInstance.methods
        .balanceOf(address)
        .call();
      console.log(
        "🚀 ~ file: index.js:976 ~ contributeValue ~ balance:",
        balance
      );
      if (Number(balance) < val) {
        alert('Insufficient Fund')
        throw new Error('Insufficient Fund')
      } else {
        console.log("first");
        const result = await contractInstance.methods
          .contribute(val)
          .send({ from: address });
          nav('/')
          SuccessToast(toast,'You have Contributed Successfully')

        console.log("approveValue", result);
        return result;
      }
    } catch (error) {
      ErrorToast(toast,'Something Went Wrong')
      console.log("🚀 ~ file: index.js:934 ~ getAllowance ~ error:", error);
      console.log(error);
    }
  };


  const voteProposal = async (id) => {
    try {
      console.log("id",id)
      const voteData = await contractInstance.methods
        .vote(id)
        .send({
          from:address
        });
        nav('/')
        SuccessToast(toast,'You have Voted Successfully')

    console.log(voteData)
     
    } catch (error) {
      ErrorToast(toast,'Something Went Wrong')

      console.log("🚀 ~ file: index.js:934 ~ getAllowance ~ error:", error);
      console.log(error);
    }
  };

  const getVoteStatus = async () => {
    try {
      const result = await contractInstance.methods.checkVote().call();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getOwner=async ()=>{
    try {
      const result = await contractInstance.methods.manager().call();
      console.log('hig',result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  const removeProposal=async (id)=>{
    try {
      const result = await contractInstance.methods.deleteProposal(id).send({from:address});
      nav('/my-proposals')
      SuccessToast(toast,'Proposal Created Successfully')

      console.log('hig',result);
      return result;
    } catch (error) {
      ErrorToast(toast,'Something Went Wrong')

      console.log(error);
    }
  }


  const block=async (id)=>{
    try {
      const result = await contractInstance.methods.blockProposal(id).send({from:address});
      nav('/')
      SuccessToast(toast,'Proposal Blocked Successfully')
      console.log('hig',result);
      return result;
    } catch (error) {
      ErrorToast(toast,'Something Went Wrong')
      console.log(error);
    }
  }


  const unBlock=async (id)=>{
    try {
      const result = await contractInstance.methods.unblockProposal(id).send({from:address});
      nav('/')
      SuccessToast(toast,'Proposal Unblocked Successfully')
      console.log('hig',result);
      return result;
    } catch (error) {
      ErrorToast(toast,'Something Went Wrong')

      console.log(error);
    }
  }

  const withdrawFund=async (id)=>{
    try {
      const result = await contractInstance.methods.withdrawal(id).send({from:address});
      nav('/')
      SuccessToast(toast,'Funds Withdrawn Successfully')

      console.log('hig',result);
      return result;
    } catch (error) {
      ErrorToast(toast,'Something Went Wrong')

      console.log(error);
    }
  }

  const contributionCount=async(wallet)=>{
    try {
      const result = await contractInstance.methods
        .contribution(wallet)
        .call();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  const getSymbol=async ()=>{
    try {
      const result = await tokenContractInstance.methods.symbol().call();
      console.log('hig',result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <StateContext.Provider
      value={{
        address,
        contractInstance,
       
        publishProposal,
        getAllProposals,
        getAllContributors,
        getTotalNumberOfProposals,
        getTotalRaisedAmount,
        getTotalFundBalance,
        getMinValueOfContribution,
        getAllowance,
        contractAddress,
        approveValue,
        contributeValue,
        voteProposal,
        removeProposal,
        getOwner,
        block,
        unBlock,
        withdrawFund,
        getVoteStatus,
        contributionCount,
        getSymbol,
      
        connectWithMetamask
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
