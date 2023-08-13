import { Stack, Grid, Button, Spinner, Text } from "@chakra-ui/react";
import { useStateContext } from "../context";
import ProjectCard from "./ProjectCard";
import { cardsData, totalContibutors } from "../utils";
import { useEffect, useState } from "react";

const AllProjects = () => {
  const { getAllProposals, getAllContributors, getSymbol } =
    useStateContext();
  const [refProjects, setRefProjects] = useState([]);
  const openProjects = refProjects?.filter(
    (projects) => projects.expired === false && projects.blockStatus === false
  );
  const [allProposals, setAllProposals] = useState();
  const [duration, setDuration] = useState();

  const [symbol,setSymbol]=useState()

  console.log('symbol is ',symbol)

  console.log("all projects are" + allProposals);
  console.log("checking reload");

  const [allProjects, setAllProjects] = useState();
  const [openActive, setOpenActive] = useState(true);
  const [closeActive, setCloseActive] = useState(false);
  const [blockActive, setBlockActive] = useState(false);
  const [totalContributors, setTotalContributors] = useState();
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [loading, setLoading] = useState(true);

  const handleLoadMore = () => {
    setVisibleProjects(visibleProjects + 3);
  };
  const blockedProjects = refProjects?.filter(
    (projects) => projects.blockStatus === true
  );

  console.log("all proposals ", allProposals);
  const closedProjects = refProjects?.filter(
    (projects) => projects.expired === true && projects.blockStatus === false
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
    const retrieveSymbol = async () => {
      const symbolData = await getSymbol();
      setSymbol(symbolData);
    
      return symbolData;
    };

    totalContributorsData();
    retrieveSymbol()

    console.log("visible projects are", visibleProjects);
  }, []);
  useEffect(() => {
    const getAllProjects = async () => {
      const allProjects = await getAllProposals();
      setLoading(false);
      setRefProjects(allProjects);
      console.log(allProjects);
      setAllProposals(
        allProjects?.filter(
          (projects) =>
            projects.expired === false && projects.blockStatus === false
        )
      );
    };
    getAllProjects();
  }, [loading, getAllProposals, allProjects]);

  return (
    <>
      <Stack alignItems={"center"} py={"20"}>
        <div class="box1">
          <div>
            <span style={{ background: openActive ? "#00C2FF" : "inherit",borderRight:'1px solid black' }}>
              {" "}
              <label
                class="col open"
                
                onClick={() => {
                  setVisibleProjects(3);
                  setAllProposals(openProjects);

                  setOpenActive(true);
                  setCloseActive(false);
                  setBlockActive(false);
                }}
              >
                Open
              </label>
            </span>

            <span
              class="col closed "
              style={{ background: closeActive ? "#00C2FF" : "inherit" }}
              onClick={() => {
                setAllProposals(closedProjects);

                setVisibleProjects(3);
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
                setVisibleProjects(3);
                setAllProposals(blockedProjects);

                setOpenActive(false);
                setCloseActive(false);
                setBlockActive(true);
              }}
            >
              <label for="r1">Blocked</label>
            </span>
          </div>
        </div>
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            marginTop={"3rem !important"}
          />
        ) : null}

        <Grid py={"20"} pb={"2rem"} templateColumns="repeat(3, 1fr)" gap={6}>
          {allProposals
            ?.sort((a, b) => b.id - a.id)
            .slice(0, visibleProjects)
            .map((project) => (
              <Stack key={project?.id}>
                <ProjectCard
                  setAllProposals={setAllProposals}
                  setOpenActive={setOpenActive}
                  setBlockActive={setBlockActive}
                  setCloseActive={setCloseActive}
                  openProjects={openProjects}
                  title={project?.title}
                  id={project?.id}
                  amount={`${project.amount }  `}
                  symbol={symbol}
                  disabled={false}
                  isOpen={openActive}
                  isClosed={closeActive}
                  isBlocked={blockActive}
                  fundReleased={project?.fundReleased}
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
                      : ((project?.votes / totalContributors) * 100).toFixed(2)
                  }
                />
              </Stack>
            ))}
        </Grid>
        <Stack>
          <Button
            isLoading={false}
            colorScheme="teal"
            variant="solid"
            w={"100%"}
            mb={"20"}
            alignSelf={"center"}
            onClick={handleLoadMore}
            isDisabled={visibleProjects >= allProposals?.length ? true : false}
          >
            {visibleProjects >= allProposals?.length
              ? "No More Items"
              : "Load More"}
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default AllProjects;
