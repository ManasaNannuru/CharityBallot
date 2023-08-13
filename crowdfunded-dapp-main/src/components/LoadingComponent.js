import { Center, Spinner } from "@chakra-ui/react";

function LoadingComponent() {
  return (
    <Center>
      <Center
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0,0,0,0.5)"
        zIndex="modal"
        backdropFilter="blur(5px)"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    </Center>
  );
}

export default LoadingComponent;
