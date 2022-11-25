import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Input,
  HStack,
  Checkbox,
  Button,
  Image,
  Flex,
  Spacer,
  useMediaQuery,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import Link from "next/link";
import { logout } from "../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "../config/axios";
import Persistence from "./Persistence";
import Head from "next/head";

const WalletCard = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 800px)");
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Conectar billetera");
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const LOGOUT = () => {
    axios.post("/logout");
    dispatch(logout());
    router.push("/home");
  };

  useEffect(() => {
    console.log(user);
    //Button ID
    const connectButton = document.getElementById("connect");
    //Click Event

    connectButton.addEventListener("click", () => {
      connectWalletHandler();
    });
    const connectWalletHandler = () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        console.log("MetaMask Here!");

        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result) => {
            accountChangedHandler(result[0]);
            setConnButtonText("Billetera conectada");
            getAccountBalance(result[0]);
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "No tenes instalado metamask",
          confirmButtonText:
            '<a target="_blank" href="https://metamask.io/download/">Instalar Metamask</a>',
        });
      }
    };

    // update account, will cause component re-render
    const accountChangedHandler = (newAccount) => {
      setDefaultAccount(newAccount);
      getAccountBalance(newAccount.toString());
    };

    const getAccountBalance = (account) => {
      window.ethereum
        .request({ method: "eth_getBalance", params: [account, "latest"] })
        .then((balance) => {
          setUserBalance(ethers.utils.formatEther(balance));
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    };

    const chainChangedHandler = () => {
      // reload the page to avoid any errors with chain change mid use of application
      window.location.reload();
    };

    // listen for account changes
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum.on("accountsChanged", accountChangedHandler),
        window.ethereum.on("chainChanged", chainChangedHandler);
    }
  }, []);

  return (
    <>
      {/* <div className="walletCard">
        <h4> {"Connection to MetaMask using window.ethereum methods"} </h4>

        <div className="accountDisplay">
          <h3>Address: {defaultAccount}</h3>
        </div>
        <div className="balanceDisplay">
          <h3>Balance: {userBalance}</h3>
        </div>
        {errorMessage}
      </div> */}

      {isLargerThan1280 ? (
        <div>
          <button className="metamask-xl" id="connect">
            {connButtonText}
          </button>
        </div>
      ) : (
        <div>
          <button className="metamask-xs" id="connect">
            {connButtonText}
          </button>
        </div>
      )}

      <Box
        backgroundColor="#101311"
        h="99vh"
        w="100%"
        p={[8, 10]}
        mx="auto"
        border={["none", "1px"]}
        borderColor={["", "gray.300"]}
        borderRadius={10}
      >
        <Flex mb={20}>
          <Box>
            <Link href="/homeuser">
              <Image
                boxSize="40px"
                objectFit="cover"
                src="/banana.png"
                alt="Itesa Coin"
              />{" "}
            </Link>
          </Box>

          <Spacer />
        </Flex>
        <VStack spacing={4} align="flex-start" w="full">
        <Heading color="white">Bienvenido {user.nick_name}</Heading>
          <VStack spacing={1} align={["center", "center"]} mb={3} w="full">
            {" "}
            <Heading color="white"> Home</Heading>
          </VStack>
          <Stat color="white">
            <StatLabel>Balance actual</StatLabel>
            <StatNumber>{userBalance}</StatNumber>
            <StatHelpText>Direccion: {defaultAccount}</StatHelpText>
            <StatLabel>Posicion en el ranking: 10</StatLabel>
            <StatLabel>Proximo milestone: 30 referidos</StatLabel>
          </Stat>
          
        </VStack>
        
        <Box>
          <Button
            ml="25%"
            mt="100%"
            colorScheme=""
            variant="solid"
            w={["50%", "auto"]}
            onClick={() => {
              LOGOUT();
            }}
          >
            LOGOUT
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default WalletCard;
