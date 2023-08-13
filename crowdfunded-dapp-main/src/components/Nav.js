import {
  Image,
  Stack,
  ListItem,
  UnorderedList,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  ModalFooter,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { useRef } from "react";
import Metamask from "../assets/images/metamask.png";
import { useStateContext } from "../context";
import { useMetamask } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/react";


const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();
  const {connect,address}=useStateContext()
  const connectWithMetamask = useMetamask();
  const requiredChainId = '0x61';


  async function connectAndSwitchNetwork() {
    try {
      const address = await connectWithMetamask();
      const provider = window.ethereum;
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: requiredChainId,
            // chainName: requiredNetwork,
            // nativeCurrency: {
            //   name: "Binance Coin",
            //   symbol: "BNB",
            //   decimals: 18,
            // },
            // rpcUrls: [rpcUrls],
            // blockExplorerUrls: [exporler],
          },
        ],
      });
      console.log(`Connected to MetaMask with address: ${address}`);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(address)
  return (
    <>
      <Stack
        fontWeight={"bold"}
        direction={"row"}
        w={"full"}
        px={"8"}
        alignItems={"center"}
        justifyContent={"space-between "}
        backgroundColor={"#000000"}
      >
        <Stack>
          <Image src={Logo} w={"111px"} />
        </Stack>

        <Stack>
          <UnorderedList listStyleType={"none"} color={"#fff"}>
            <ListItem>
              <Stack
                direction={"row"}
                alignItems={"center"}
                w={"full"}
                spacing={"12"}
              >
                <Link to={"/"}>Home</Link>
                <Link to={"/my-proposals"}>My Proposals</Link>
                <Link to={"/create-proposal"}>Create Proposals</Link>
                <Button
                  fontWeight={"bold"}
                  color={"#000000"}
                  background={"#FF5C00"}
                  onClick={!address?onOpen:()=>{
                    return
                  }}
                >
                  {address?`${address.slice(
                  0,
                  6
                )}....${address.slice(-4)}`:'Connect Wallet'}
                </Button>
              </Stack>
            </ListItem>
          </UnorderedList>
        </Stack>

        {/* Modal */}

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          
        >
          <ModalOverlay />
          <ModalContent >
            <ModalHeader borderBottom={"0.2px solid black"}>
              Connect A Wallet
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={10}   >
              <FormControl py={4}>
                <InputGroup onClick={()=>{
                 connectAndSwitchNetwork()
                  onClose()
                }} >
                  <Input
                    color={"black"}
                    cursor={'pointer'}
                    ref={initialRef}
                    isReadOnly={true}
                    value="Metamask"
                    placeholder="First name"
                  />
                  <InputRightElement children={<Image src={Metamask}  />} />
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    </>
  );
};

export default Nav;
