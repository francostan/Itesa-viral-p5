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
import Reference from "./Reference";

const WalletCard = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 800px)");
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null); // Address de metamask
  const [userBalance, setUserBalance] = useState(null);
  const [userBalance2, setUserBalance2] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Conectar billetera");
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const provider = new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/07844f3846764830b55e143f3d6f324d"
  );
  const privateKey1 =
    "ae6eb5a105b3557eada011913816e359cf9f792ab8645e557d4a8415f8330f03";
  const wallet = new ethers.Wallet(privateKey1, provider);
  const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
  ];
  const address = "0x319d484fA709D449dc60a5C916a1d229E589aB59";
  const contract = new ethers.Contract(address, ERC20_ABI, provider);

  const LOGOUT = () => {
    axios.post("/logout");
    dispatch(logout());
    router.push("/home");
  };

  useEffect(() => {
    //Button ID
    const connectButton = document.getElementById("connect");
    //Click Event

    connectButton.addEventListener("click", () => {
      connectWalletHandler();
    });
    const connectWalletHandler = () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        console.log("MetaMask Here!");
        console.log("USER>>>>>>>>", user);

        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result) => {
            accountChangedHandler(result[0]);
            setConnButtonText("Billetera conectada");
            getAccountBalance(result[0]);
            if (user.id)
              axios.put("/newUser", { id: user.id, address: result[0] });
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

    const getAccountBalance = async (account) => {
      try {
        const result = await contract.balanceOf(account);
        setUserBalance(ethers.utils.formatEther(result));
      } catch (error) {
        setErrorMessage(error.message);
      }
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
  }, [user, userBalance, defaultAccount]);

  const handleTokens = async () => {
    console.log("TOKENS");
    const contractWithWallet = contract.connect(wallet);

    const tx = await contractWithWallet.transfer(
      defaultAccount,
      "1000000000000"
    );
    await tx.wait();
    console.log(tx);
    const balanceOfReceiver = await contract.balanceOf(defaultAccount);
    setUserBalance(ethers.utils.formatEther(balanceOfReceiver));
    console.log(`\nBalance of sender: ${balanceOfReceiver}`);
  };

  const handleNetwork = async () => {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }],
    });
    const Istoken = localStorage.getItem("VT");
    if (Istoken !== "true") {
      console.log("hola capo");
      await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: address, // The address that the token is at.
            symbol: "VT", // A ticker symbol or shorthand, up to 5 chars.
            decimals: "18", // The number of decimals in the token
            image:
              "https://img.a.transfermarkt.technology/portrait/big/28003-1631171950.jpg?lm=1", // A string url of the token logo
          },
        },
      });
      localStorage.setItem("VT", "true");
    } else {
      alert("ya se integro");
    }
  };

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
          <div>
            <button className="metamask-xs" id="connect">
              {connButtonText}
            </button>
          </div>
          <div>
            {connButtonText === "Billetera conectada" ? (
              <button className="network-xs" onClick={handleNetwork}>
                Network
              </button>
            ) : (
              ""
            )}
          </div>
          <div>
            {connButtonText === "Billetera conectada" ? (
              <button className="tokens-xs" onClick={handleTokens}>
                Reclamar Tokens
              </button>
            ) : (
              ""
            )}
          </div>
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
            <Link href="/logged/homeuser">
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



        <Reference />
        

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
