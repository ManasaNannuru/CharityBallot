import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import contractImg from "../assets/images/contract.png";
import shopper from "../assets/images/shopper.png";
import donation from "../assets/images/donation.png";
import walletImg from "../assets/images/wallet.png";
import { Divider } from "@chakra-ui/react";
import Contributions from "./Contributions";
import AllProjects from "./AllProjects";
import { totalContributions, cardsData } from "../utils";
import { useStateContext } from "../context";
import { useEffect, useState } from "react";

import Layout from "./Layout";

const Home = () => {
  const {
    getAllContributors,
    getTotalNumberOfProposals,
    getTotalRaisedAmount,
    getTotalFundBalance,
    getOwner,
   
 
  } = useStateContext();

  const [totalContributors, setTotalContributors] = useState(false);
  const [totalProposals, setTotalProposals] = useState();
  const [raisedAmount, setRaisedAmount] = useState();
  const [totalCrowdFund, setTotalCrowdFund] = useState();
  const[admin,setAdmin]=useState("")
 


  console.log('admin wallet address is ',admin)
  useEffect(() => {
    const totalContributorsData = async () => {
      const totalContributors = await getAllContributors();
      setTotalContributors(totalContributors);
      console.log(totalContributors);
      return totalContributors;
    };

    const getTotalProposals = async () => {
      const totalProposals = await getTotalNumberOfProposals();
      setTotalProposals(totalProposals);
    };

    const getTotalRaisedFunds = async () => {
      const totalFunds = await getTotalRaisedAmount();
      setRaisedAmount(totalFunds);
    };
    const getAdmin = async () => {
      const owner = await getOwner();
      console.log('owner is',owner)
      setAdmin(owner);
    };

    const getTotalCrowdFund = async () => {
      const totalCrowdFund = await getTotalFundBalance();
      setTotalCrowdFund(totalCrowdFund);
    };

  
    totalContributorsData();
    getTotalProposals();
    getTotalRaisedFunds();
    getTotalCrowdFund();
    getAdmin()
    
  }, []);
  return (
    <>
      <Layout>
        <Stack py={"20"} px={"12"}>
          <Stack
            fontWeight={"semibold"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={"60"}
          >
            <HStack
              background={"#BDFF00"}
              px={"14"}
              py={"4"}
              borderRadius={"20px"}
            >
              <Image src={contractImg} width={"40px"} />
              <Text>Total Proposals:{!totalProposals?0:totalProposals}</Text>
            </HStack>

            <HStack
              background={"#00D1FF"}
              px={"14"}
              py={"4"}
              borderRadius={"20px"}
            >
              <Image src={shopper} width={"40px"} />
              <Text>Total Contributors: {!totalContributors?0:totalContributors}</Text>
            </HStack>
          </Stack>

          <Stack
            fontWeight={"semibold"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={"60"}
            pt={"6"}
          >
            <HStack
              background={"#CC00FF"}
              px={"12"}
              py={"4"}
              borderRadius={"20px"}
            >
              <Image src={donation} width={"40px"} alignSelf={"flex-start"} />
              <Text>Total Contributions: {raisedAmount / 10 ** 18}</Text>
            </HStack>

            <HStack
              background={"#00FFA3"}
              px={"12"}
              py={"4"}
              borderRadius={"20px"}
            >
              <Image src={walletImg} width={"40px"} />

              <Text>Crowd Fund Balance: {totalCrowdFund / 10 ** 18}</Text>
            </HStack>
          </Stack>
          <Divider py={"4"} colorScheme={"#C9C9C9"} variant={"solid"} />
        </Stack>

        <Contributions />

        <AllProjects />
      </Layout>
    </>
  );
};

export default Home;
