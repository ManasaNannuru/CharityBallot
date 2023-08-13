import {
  Button,
  Input,
  Stack,
  Text,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import bigInt from "big-integer";
import { useStateContext } from "../context";
import BigNumber from "bignumber.js";
import ErrorToast from "./ErrorToast";
import LoadingComponent from "./LoadingComponent";

const Contributions = () => {
  const {
    getMinValueOfContribution,
    getAllowance,
    address,
    contractAddress,
    approveValue,
    contributeValue,
    getAllContributors,
    getTotalNumberOfProposals,
    getTotalRaisedAmount,
    getTotalFundBalance,
    contributionCount,
  } = useStateContext();
  const [minValOfContribution, setMinValOfContribution] = useState();
  const [allowance, setAllowance] = useState(0);
  const [approveBtnDisable, setApproveBtnDisable] = useState(true);
  const [contributionValue, setContributionValue] = useState();
  const [isActive, setIsActive] = useState(false);
  const [loader, setLoader] = useState(false);
  console.log("allowance is", allowance);
  console.log("btn disable is", approveBtnDisable);

  const toast = useToast();

  useEffect(() => {
    const getMinContributionCount = async () => {
      const data = await getMinValueOfContribution();
      setMinValOfContribution(data / 10 ** 18);
      return data;
    };

    const getAllowanceValue = async () => {
      console.log("wallet address is", address);
      const data = await getAllowance(address, contractAddress);
      console.log("contract address is", contractAddress);
      console.log("data is", data);
      data === 0 ? setAllowance(data) : setAllowance(data / 10 ** 18);
      return data;
    };

    const getContributionCount = async () => {
      const contributionData = await contributionCount(address);
      console.log("new cot data", contributionData);
      setContributionValue(contributionData / 10 ** 18);
    };
    getMinContributionCount();
    getAllowanceValue();
    getContributionCount();
  }, [address]);
  let token = 2;
  const maxval = 2 ** 256 - 1;
  const maxvalString =
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

  const [inputValue, setInputValue] = useState("");
  console.log("input value is ", inputValue);
  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log("allowance is less", allowance < inputValue);
    allowance <= inputValue
      ? setApproveBtnDisable(false)
      : setApproveBtnDisable(true);
  };

 

  const approve = async (crowdFundContractAddress, maxValue) => {
    setLoader(true);
    const data = await approveValue(crowdFundContractAddress, maxValue);
    setLoader(false);
    console.log("approve data is ", data);
    const dataAllowance = await getAllowance(address, contractAddress);

    console.log("contract address is", contractAddress);
    console.log("wallet address is", address);
    console.log("data is", data);
    dataAllowance === 0
      ? setAllowance(dataAllowance)
      : setAllowance(dataAllowance / 10 ** 18);

    return data;
  };
console.log('zain the new wallet is ',address)
  const contribute = async (val) => {
    console.log("val:", val);

    if (val < 0 || val === "" || val < minValOfContribution) {
      ErrorToast(toast, "Please Enter a value");
    } else {
      setLoader(true);
      const data = await contributeValue(new BigNumber(val * 10 ** 18));
      setLoader(false);
      await getAllContributors();
      await getTotalRaisedAmount();
      await getTotalFundBalance();
      window.location.reload();

      return data;
    }
  };

  const handleFocus = () => {
    setIsActive(true);
  };
  const handleBlur = () => {
    setIsActive(false);
  };

  const shouldDisplayLine =
    isActive && Number(inputValue) < minValOfContribution;
  return (
    <Stack px={"12"} fontWeight={"semibold"} alignItems={"center"}>
      {loader ? <LoadingComponent /> : null}
      <Text>Your Contribution: {contributionValue}</Text>
      <Input
        variant={"filled"}
        type={"number"}
        placeholder={`More than ${minValOfContribution} tokens`}
        width={"26%"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {shouldDisplayLine && (
        <Text color={"red"}>
          Minimum value of contribution is {minValOfContribution}
        </Text>
      )}{" "}
      <Stack direction={"row"} justifyContent={"center"} width={"full"}>
        <Button
          background={"#00C2FF"}
          isDisabled={allowance >= inputValue || !address ? true : false}
          width={"13%"}
          onClick={() => {
            approve(contractAddress, maxvalString);
          }}
        >
          Approve
        </Button>
        <Button
          background={"#E7793C"}
          width={"13%"}
          onClick={() => {
            contribute(inputValue);
          }}
          isDisabled={allowance >= inputValue ? false : true}
        >
          Contribute
        </Button>
      </Stack>
      <Divider py={"4"} colorScheme={"#C9C9C9"} variant={"solid"} />
    </Stack>
  );
};

export default Contributions;
