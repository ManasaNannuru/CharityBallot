import { Heading, Stack, Input, InputGroup, Button,useToast } from "@chakra-ui/react";
import LoadingComponent from "./LoadingComponent";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import bigInt from "big-integer";
import { useStateContext } from "../context";
import { useNavigate } from "react-router";

const CreateProposal = () => {
  const { publishProposal } = useStateContext();
  const [proposalTitle, setProposalTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [days, setDays] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const[loadingState,setLoadingState]=useState(false);
  
  const nav = useNavigate();
  const toast=useToast()

  const daysInSeconds = days * 24 * 60 * 60;

  useEffect(() => {
    if (
      proposalTitle !== "" &&
      description !== "" &&
      recipientAddress !== "" &&
      requiredAmount > 0 &&
      days > 0
    ) {
      setBtnDisable(false);

      // await contractType.createProposal(proposalTitle,description,recipientAddress,convertToWei(requiredAmount),daysInSeconds)
    } else {
      setBtnDisable(true);
    }
  }, [proposalTitle, description, recipientAddress, requiredAmount, days]);

  const convertToWei = (val) => {
    const amountInWei = bigInt(val * 10 ** 18);

    return amountInWei.toString();
  };

  const createProposal = async (e) => {
    e.preventDefault();
    setLoadingState(true)
    const data = await publishProposal(
      proposalTitle,
      description,
      recipientAddress,
      convertToWei(requiredAmount),
      daysInSeconds
    );
    
    setLoadingState(false)

    console.log(data);
  };
  return (
    <Layout>
      <Stack py={"20"} alignItems={"center"}>
       
      {loadingState?  <LoadingComponent/>:null}
        <Heading size={"md"} textAlign={"center"}>
          Create Proposals
          <InputGroup my={"4"}>
            <Input
              onChange={(e) => setProposalTitle(e.target.value)}
              type="text"
              placeholder="Proposal Title"
              width={{ base: "300px", md: "600px", lg: "900px" }}
              borderColor={"#000000"}
            />
          </InputGroup>
          <InputGroup my={"4"}>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
              borderColor={"#000000"}
            />
          </InputGroup>
          <InputGroup my={"4"}>
            <Input
              onChange={(e) => setRecipientAddress(e.target.value)}
              type="text"
              placeholder="Recipient Address"
              borderColor={"#000000"}
            />
          </InputGroup>
          <InputGroup my={"4"}>
            <Input
              onChange={(e) => setRequiredAmount(e.target.value)}
              type="number"
              placeholder="Required Amount"
              borderColor={"#000000"}
            />
          </InputGroup>
          <InputGroup my={"4"}>
            <Input
              placeholder="Enter Days"
              size="md"
              type="number"
              borderColor={"#000000"}
              onChange={(e) => setDays(e.target.value)}
            />
          </InputGroup>
          <Button
            isDisabled={btnDisable ? true : false}
            onClick={createProposal}
            fontWeight={"bold"}
            borderRadius={"lg"}
            color={"#000000"}
            background={"#E7793C"}
            width={"220px"}
          >
            Create
          </Button>
        </Heading>
      </Stack>
    </Layout>
  );
};

export default CreateProposal;
