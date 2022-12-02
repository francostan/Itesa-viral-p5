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
  Spinner,
  Divider,
  Highlight,
} from "@chakra-ui/react";

import Link from "next/link";
import { logout } from "../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "../config/axios";
import Persistence from "./Persistence";
import Head from "next/head";
import Reference from "./Reference";
import AdminButton from "./AdminButton";
import next from "next";

const WalletCard = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 800px)");
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null); // Address de metamask
  const [userBalance, setUserBalance] = useState(null);
  const [userBalance2, setUserBalance2] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Conectar billetera");
  const [tokentoredeem, settokentoredeem] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [ranking, setRanking] = useState(0);
  const [currentAwards, setCurrentAwards] = useState({});
  const [lastMilestone, setLastMilestone, getLastMilestone] = useState({});
  const [nextMilestone, setNextMilestone, getNextMilestone] = useState({});
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
    localStorage.setItem("VT", "");
    axios.post("/logout");
    dispatch(logout());
    router.push("/home");
  };

  useEffect(() => {
    // Obtener valor de tokens a reclamar y guardar estado con el valor:

    const getStatus = async () => {
      if (user.id) {
        //Consulta de Tokens por recuperar
        const tokens = await axios.post("/redeem", { user: user.id });
        settokentoredeem(tokens.data);
        //Consulta de posición en ranking
        const usersRanking = await axios.get("/ranking");
        const rankingPos = await usersRanking.data.findIndex(
          (element) => element.referringId === user.id
        );
        setRanking(rankingPos + 1);
        // const tempPoints=usersRanking[rankingPos].awards
        // setPoints(tempPoints)

        const tempRanking = await usersRanking.data.find(
          (element) => element.referringId === user.id
        );
        setCurrentAwards(tempRanking);

        //Consulta de próximo Milestone
        const milestones = await axios
          .post("/userMilestones", { user: user.id })
          .then((result) => result.data);

        setLastMilestone(milestones.lastMilestone);
        setNextMilestone(milestones.nextMilestone);
        //Determinar cuántos referidos faltan para próximo milestone
      }
    };
    getStatus();

    const handleNetwork = async () => {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
      const Istoken = localStorage.getItem("VT");
      if (Istoken !== "true") {
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
      }
    };

    // Vinculacion con billetera MetaMask:

    const connectButton = document.getElementById("connect");

    connectButton.addEventListener("click", () => {
      connectWalletHandler();
    });
    const connectWalletHandler = () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result) => {
            accountChangedHandler(result[0]);
            setConnButtonText("Billetera conectada");
            getAccountBalance(result[0]);
            if (user.id)
              axios.put("/newUser", { id: user.id, address: result[0] });
          })
          .then(() => {
            handleNetwork();
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

    // update account, will cause component re-render:
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
    // const chainChangedHandler = () => {
    //   // reload the page to avoid any errors with chain change mid use of application
    //   window.location.reload();
    // };

    // listen for account changes
    // if (window.ethereum && window.ethereum.isMetaMask) {
    //   window.ethereum.on("accountsChanged", accountChangedHandler);
    //   window.ethereum.on("chainChanged", chainChangedHandler);
    // }
  }, [user, userBalance, defaultAccount]);

  const handleTokens = async () => {
    console.log("TOKENS");
    const contractWithWallet = contract.connect(wallet);
    if (tokentoredeem) {
      setLoading(true);
      const tx = await contractWithWallet.transfer(
        defaultAccount,
        tokentoredeem
      );
      await tx.wait();
      console.log(tx);
      setLoading(false);
      const balanceOfReceiver = await contract.balanceOf(defaultAccount);
      setUserBalance(ethers.utils.formatEther(balanceOfReceiver));
      axios.put("redeem", { user: user.id });
    } else {
      Swal.fire({
        icon: "info",
        title: "No tenes tokens disponibles",
        html: "<b> Segui invitando amigos para recibir tokens!</b>",
      });
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
        h="100%"
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
        </Flex>
        <VStack spacing={4} align="flex-start" w="full">
          <Heading color="white">Bienvenido {user.nick_name}</Heading>

          <Stat color="white">
            <StatNumber> TukiTokens: {userBalance}</StatNumber>

            <Text fontSize={"larger"}>Posicion en el ranking: {ranking}</Text>
            <Text fontSize={"larger"}>Puntos: {currentAwards.awards}</Text>
            {nextMilestone.id ? (
              <Text fontSize={"larger"}>
                Te falta(n){" "}
                {nextMilestone.quantityCondition - currentAwards.awards} punto(s)
                para el próximo Milestone!!
              </Text>
            ) : (
              <Text fontSize={"larger"}>
                Has conseguido todos los Milestones!!
              </Text>
            )}

            <Text fontSize={"larger"}>
              Proximo milestone: {nextMilestone.name}
            </Text>
            <Text fontSize={"larger"}>Token por reclamar {tokentoredeem}</Text>
          </Stat>
          <Reference />
        </VStack>

        {loading ? (
          <Spinner
            className="loading"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        ) : (
          ""
        )}

        <HStack spacing={"5"} mt="0%" direction="row">
          <Link href="/logged/topInfluencers">
            <Image
              mt={"2.5"}
              ml={"18%"}
              mb={"-10"}
              boxSize="50%"
              objectFit="cover"
              src="/ranking (2).png"
              alt="Ranking footer"
            />{" "}
          </Link>{" "}
          <Link href="/logged/milestones">
            <Image
              mt={"8"}
              mb={"-4"}
              ml={"30%"}
              boxSize="40%"
              objectFit="cover"
              src="/value.png"
              alt="Milestone footer"
            />{" "}
          </Link>{" "}
          <Link href="#">
            <Image
              mb={"-5"}
              ml={"47%"}
              mt="9"
              className="iconos"
              onClick={() => {
                LOGOUT();
              }}
              boxSize="31%"
              objectFit="cover"
              src="/logout (3).png"
              alt="Logout footer"
            />{" "}
          </Link>{" "}
        </HStack>
        <HStack ml={"5%"} mt={"5"} spacing={"22%"}>
          <Text fontSize={"xs"} color={"white"}>
            {" "}
            Ranking
          </Text>
          {/* <Button>Ranking </Button> */}
          {/* <Button>Milestones </Button> */}
          <Text fontSize={"xs"} color={"white"}>
            {" "}
            Milestones
          </Text>
          <Text fontSize={"xs"} color={"white"}>
            {" "}
            Log Out
          </Text>
          {/* <Button>Log Out </Button> */}
        </HStack>

        {user.admin === true ? <AdminButton /> : ""}
      </Box>
    </>
  );
};

export default WalletCard;
