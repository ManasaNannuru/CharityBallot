import {
  Box,
  Heading,
  Stack,
  HStack,
  Text,
  Center,
  Button,
} from "@chakra-ui/react";

import Progress from "./Progress";
import { useStateContext } from "../context";

import { useLocation } from "react-router";
import ReactReadMoreReadLess from "react-read-more-read-less";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { adminWalletAddress, connectedWalletAddress } from "../utils";
import { useEffect, useState } from "react";
import LoadingComponent from "./LoadingComponent";

const ProjectCard = (props) => {
  const { voteProposal, getOwner, address, removeProposal,block,unBlock,withdrawFund } = useStateContext();
  const location = useLocation();

  const [loadingScreen,setLoadingScreen]=useState(false)

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed message
      return <span className="countDown">Expired!</span>;
    } else {
      // Render the remaining time with labels
      return (
        <span className="countDown">
          {days} days {hours} h {minutes} m {seconds} s
        </span>
      );
    }
  };

  const vote = async (e) => {
    setLoadingScreen(true)
    const data = await voteProposal(props?.id);
    setLoadingScreen(false)
    console.log(props?.id);
    return data;
  };
  const [adminWallet, setAdminWallet] = useState();
  console.log("admin wallet is from card", adminWallet);
  useEffect(() => {
    const getAdmin = async () => {
      const owner = await getOwner();
      console.log("owner is", owner);
      setAdminWallet(owner);
    };

    getAdmin();
  }, [getOwner]);

  const deleteProject = async () => {
    const data = await removeProposal(props?.id);
    console.log(props?.id);
    return data;
  };

  const restrictProposal=async()=>{
    setLoadingScreen(true)
    const data = await block(props?.id);
    setLoadingScreen(false)
    props.setOpenActive(true)
    props.setBlockActive(false)
    props.setCloseActive(false)
    props.setAllProposals(props.openProjects)
    console.log(props?.id);
    return data;
  }



  const unRestrictProposal=async()=>{
    setLoadingScreen(true)
    const data = await unBlock(props?.id);
    setLoadingScreen(false)
    props.setOpenActive(true)
    props.setBlockActive(false)
    props.setCloseActive(false)
    props.setAllProposals(props.openProjects)
    console.log(props?.id);
    return data;
  }

  const withdraw=async()=>{
    setLoadingScreen(true)
    const data = await withdrawFund(props?.id);
    setLoadingScreen(false)
    console.log(props?.id);
    return data;
  }
  return (
    <>
    {loadingScreen?<LoadingComponent/>:null}
      <Center
        as="section"
        className="projectCardContainer"
        borderRadius={"35px"}
        boxShadow={"dark-lg"}
        
      >
        <Box maxW="420px" p="6" className="projectBox"  >
          <Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Heading size={"lg"}>{props?.title}</Heading>

              <Stack>
                <Text>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"} whiteSpace={'nowrap'}>
                    Amount:<span style={{fontWeight:'normal'}}>{props?.amount / 10 ** 18} {props.symbol}</span>{" "}
                  </Text>
                  <span></span>
                </Text>
                <Countdown
                  date={new Date(props?.duration * 1000)}
                  renderer={renderer}
                />
              </Stack>
            </Stack>
            <Text fontWeight={"bold"}>
              Created by: <Link>{props?.proposalCreator}</Link>
            </Text>
          </Stack>

          <Text>
            <ReactReadMoreReadLess
              readMoreClassName="readMoreClassName"
              charLimit={250}
              readMoreText="Read More ▼"
              readLessText="Read Less ▲"
            >
              {props?.description}
            </ReactReadMoreReadLess>
          </Text>
          <Progress votes={props?.votes} done={props?.votePercent} />
          <Center my="6">
            <HStack spacing={"6"}>
              <Button
                isDisabled={props.disabled}
                onClick={vote}
                background={"#E7793C"}
                width={"125px"}
                display={
                  props?.isOpen === true &&
                  location.pathname !== "/my-proposals"
                    ? "inherit"
                    : "none"
                }
              >
                Vote
              </Button>
              <Button
                display={
                  props?.isBlocked === true
                    ? "none"
                    : address === adminWallet
                    ? "inherit"
                    : "none"
                }
                background={"#F02E2E"}
                width={"125px"}
                onClick={restrictProposal}
              >
                Block
              </Button>
              <Button
                display={
                  address === adminWallet && props?.isBlocked === true
                    ? "inherit"
                    : "none"
                }
                background={"#00FF00"}
                width={"125px"}
                onClick={unRestrictProposal}
              >
                UnBlock
              </Button>

              {/* <Button
                onClick={deleteProject}
                display={
                  location?.pathname === "/my-proposals" &&
                  props.isClosed === false &&
                  props?.isBlocked === false
                    ? "inherit"
                    : "none"
                }
                background={"#F02E2E"}
                width={"125px"}
              >
                Delete
              </Button> */}
              <Button
                display={
                  location?.pathname === "/my-proposals" &&
                  props?.isClosed === true
                    ? "inherit"
                    : "none"
                }
                background={"#00FF00"}
                width={"125px"}
                onClick={withdraw}
                isDisabled={props?.fundReleased===true||props?.votePercent<50.01?true:false}
              >
                Withdraw
              </Button>
            </HStack>
          </Center>
        </Box>
      </Center>
    </>
  );
};

export default ProjectCard;
