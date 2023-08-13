import { Heading, Stack, Grid, Button,Spinner } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { cardsData, connectedWalletAddress, totalContibutors } from "../utils";
import { useState, useEffect } from "react";
import { useStateContext } from "../context";
import Layout from "./Layout";

const MyProposals = () => {
  const { getAllProposals, getAllContributors, address } = useStateContext();
  const [refProjects, setRefProjects] = useState([]);
  const openProjects = refProjects?.filter(
    (projects) => projects.expired === false && projects.blockStatus === false
  );

  const [myAllProposals, setMyAllProposals] = useState(openProjects);

  const [visibleProjects, setVisibleProjects] = useState(3);

  const [allProjects, setAllProjects] = useState();
  const [openActive, setOpenActive] = useState(true);
  const [closeActive, setCloseActive] = useState(false);
  const [blockActive, setBlockActive] = useState(false);
  const [totalContributors, setTotalContributors] = useState();
  const [isLoading,setIsLoading]=useState(true)

  const blockedProjects = refProjects?.filter(
    (projects) => projects.blockStatus === true
  );

  console.log("ref pro are", refProjects);

  console.log("open ", openProjects);
  const closedProjects = refProjects?.filter(
    (projects) => projects.expired === true&&projects.blockStatus===false
  );
  console.log("closed ", closedProjects);
  console.log("all", refProjects);
  useEffect(() => {
    const totalContributorsData = async () => {
      const totalContributors = await getAllContributors();
      setTotalContributors(totalContributors);
      console.log(totalContributors);
      return totalContributors;
    };
    totalContributorsData();
  }, []);
  useEffect(() => {
    const getAllProjects = async () => {
      const allProjects = await getAllProposals();
      setIsLoading(false)
      setRefProjects(
        allProjects.filter((projects) => projects.proposalCreator === address)
      );
      console.log(allProjects);
      setMyAllProposals(
        allProjects?.filter(
          (projects) =>
            projects.expired === false &&
            projects.blockStatus === false &&
            projects.proposalCreator === address
        )
      );
    };
    getAllProjects();
  }, [address, getAllProposals]);

  const handleLoadMore = () => {
    setVisibleProjects(visibleProjects + 3);
  };
  return (
    <>
      <Layout>
        <Stack alignItems={"center"} py={"18"}>
          <Heading size={"md"} py={"4"}>
            My Proposals
          </Heading>
        </Stack>
        <Stack alignItems={"center"}>
          <div class="box1">
            <div>
              <label
                class="col open"
                style={{ background: openActive ? "#00C2FF" : "inherit" }}
                onClick={() => {
                  setMyAllProposals(openProjects);
                  setVisibleProjects(3)
                  setOpenActive(true);
                  setCloseActive(false);
                  setBlockActive(false);
                }}
              >
                Open
              </label>
              <span
                class="col closed "
                style={{ background: closeActive ? "#00C2FF" : "inherit" }}
                onClick={() => {
                  setVisibleProjects(3)
                  setMyAllProposals(closedProjects);
                  setOpenActive(false);
                  setCloseActive(true);
                  setBlockActive(false);
                }}
              >
                <label for="r1 closed">Closed</label>
              </span>
              <span
                class="col blocked "
                style={{ background: blockActive ? "#00C2FF" : "inherit" }}
                onClick={() => {
                  setMyAllProposals(blockedProjects);
                  setVisibleProjects(3)
                  setOpenActive(false);
                  setCloseActive(false);
                  setBlockActive(true);
                }}
              >
                <label for="r1">Blocked</label>
              </span>
            </div>
          </div>
          {!address||myAllProposals.length===0 ? (
            <Heading
              size={"md"}
              py={"4"}
              fontWeight={"bold"}
              textShadow={" 0px 4px 4px rgba(0, 0, 0, 0.25)"}
            >
              Oh! No Proposals Yet...
              {isLoading?
              <Stack>
              <Spinner
              alignSelf={'center'}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            marginTop={"3rem !important"}
          />
          </Stack>:null}
            </Heading>
          ) : (
          
            <Grid
              py={"20"}
              pb={"2rem"}
              templateColumns="repeat(3, 1fr)"
              gap={6}
            >
              {myAllProposals?.sort((a, b) => b.id - a.id).slice(0, visibleProjects).map((project) => (
                <Stack key={project?.id}>
                  <ProjectCard
                    title={project?.title}
                    id={project?.id}
                    amount={project?.amount}
                    fundReleased={project?.fundReleased}
                    disabled={false}
                    isOpen={openActive}
                    isClosed={closeActive}
                    isBlocked={blockActive}
                    duration={project?.duration}
                    proposalCreator={`${project?.proposalCreator.slice(
                      0,
                      6
                    )}....${project?.proposalCreator.slice(-4)}`}
                    description={project?.description}
                    votes={project?.votes}
                    votePercent={
                      NaN
                        ? "0"
                        : ((project?.votes / totalContributors) * 100).toFixed(
                            2
                          )
                    }
                  />
                </Stack>
              ))}
            </Grid>
          )}
          <Stack>
            <Button
              isLoading={false}
              colorScheme="teal"
              variant="solid"
              w={"100%"}
              mb={"20"}
              alignSelf={"center"}
              onClick={handleLoadMore}
              isDisabled={
                visibleProjects >= myAllProposals?.length ? true : false
              }
            >
              {visibleProjects >= myAllProposals?.length
                ? "No More Items"
                : "Load More"}
            </Button>
          </Stack>
        </Stack>
      </Layout>
    </>
  );
};

export default MyProposals;
