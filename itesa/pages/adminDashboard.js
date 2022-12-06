import React, { useEffect, useState } from "react";
import LineChart from "../components/Chart";
import {
  Box,
  Center,
  Heading,
  HStack,
  VStack,
  Flex,
  Image,
  Text,
  Grid,
} from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import axios from "../config/axios";

const adminDashboard = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get("/dashboard")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // const data = {
  //   totUsers: {
  //     Users: "67",
  //   },
  //   totTokens: {
  //     Tokens: "4935",
  //   },
  //   historicRegistration: {
  //     campaigns: [0, 1, 2, 3],
  //     Registrations: [160, 67, 111, 55],
  //   },
  //   historicEmission: {
  //     campaigns: [0, 1, 2, 3],
  //     emissions: [600, 4875, 2555, 3031],
  //   },
  // };
  const { totTokens, totUsers, historicEmission, historicRegistration } = data;
  //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", historicEmission);

  return (
    <Box
      minH={"100vh"}
      alignContent={"flex-start"}
      backgroundColor="#101311"
      h="100%"
      w="100%"
      p={[8, 10]}
      mx="auto"
      border={["none", "1px"]}
      borderColor={["", "gray.300"]}
      borderRadius={10}
    >
      <HStack spacing={12} mb={"5%"}>
        <Text
          color={"white"}
          textAlign="center"
          as={"h1"}
          fontSize={"4xl"}
          fontWeight={"bold"}
        >
          Dashboard
        </Text>
        <Link href="/logged/homeuser">
          <Image
            src="/banana.png"
            alt="logo"
            border="1px"
            boxSize="50px"
            borderRadius={"20%"}
          />
        </Link>
      </HStack>
      <Grid className="row sparkboxes mt-4">
        <Center>
          <VStack mb={"10%"} mt={"5%"} mr={"5%"}>
            <div className="col-md-3">
              <div className="box box1">
                <Heading ml={"30%"} color="white">
                  {totUsers.Users}
                </Heading>
              </div>
              <Heading color={"white"}> Total de usuarios</Heading>
            </div>
          </VStack>
          <VStack mb={"10%"} mt={"5%"} ml={"5%"}>
            <Grid className="col-md-3">
              <div className="box box2">
                <Heading ml={"15%"} color="white">
                  {totTokens.Tokens}
                </Heading>
              </div>
              <Heading color={"white"}> Tokens emitidos</Heading>
            </Grid>
          </VStack>
        </Center>
        <Center>
          <VStack mb={"10%"}>
            <Grid className="col-md-3" mb={"15%"} mt={"15%"}>
              <div className="box box3">
                <div className="details"></div>
                <LineChart
                  campaign={historicRegistration.campaigns}
                  quantity={historicRegistration.Registrations}
                  text={"Usuarios registrados por campaña"}
                />
              </div>
            </Grid>

            <div className="col-md-3">
              <div className="box box4">
                <div className="details"></div>
                <div id="spark4">
                  <LineChart
                    campaign={historicEmission.campaigns}
                    quantity={historicEmission.emissions}
                    text={"Tokens emitidos por campaña"}
                  />
                </div>
              </div>
            </div>
          </VStack>
        </Center>
      </Grid>
      {/* <Navbar /> */}
    </Box>
  );
};

export default adminDashboard;

/* const datos = {
    totUsers: {
      Users: "67",
    },
    totTokens: {
      Tokens: "4935",
    },
    historicRegistration: [
      {
        Users: "2",
        campaignId: 0,
      },
      {
        Users: "128",
        campaignId: 1,
      },
    ],
    historicEmission: [
      {
        Tokens: "210",
        campaignId: 0,
      },
      {
        Tokens: "4725",
        campaignId: 1,
      },
    ],
  };*/
