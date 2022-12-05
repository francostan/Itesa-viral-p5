import React from "react";
import LineChart from "../components/Chart";
import {
  Box,
  Center,
  Heading,
  HStack,
  VStack,
  Flex,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Head from "next/head";
const adminDashboard = () => {
  const data = [25, 66, 41, 59, 25, 44, 12, 36, 9, 21];
  const datos = {
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
  };
  const { totTokens, totUsers } = datos;
  //   console.log(datos);
  //   console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", datos.historicEmission);
 
  return (
    <Box
      minH={"100vh"}
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
      <div class="row sparkboxes mt-4">
        <Center>
          <HStack>
            <VStack>
              <div class="col-md-3">
                <div class="box box1">
                  <Heading>{totUsers.Users}</Heading>
                  <Heading>Usuarios registrados</Heading>
                  <div class="details"></div>
                </div>
                <Heading color={"white"}> Total de usuarios</Heading>
              </div>
            </VStack>
            <VStack>
              <div class="col-md-3">
                <div class="box box2">
                  <Heading>{totTokens.Tokens}</Heading>
                  <Heading>Tokens emitidos</Heading>
                  <div class="details"></div>
                </div>
                <Heading color={"white"}> Tokens emitidos</Heading>
              </div>
            </VStack>
          </HStack>
        </Center>
        <Center>
          <VStack>
            <div class="col-md-3">
              <div class="box box3">
                <div class="details"></div>
                <LineChart datos={data} />
              </div>
              <Heading color={"white"}>
                Usuarios registrados por campaña
              </Heading>
            </div>

            <div class="col-md-3">
              <div class="box box4">
                <div class="details"></div>
                <div id="spark4">
                  <LineChart datos={data} />
                </div>
              </div>
              <Heading color={"white"}>
                Tokens emitidos por cada campaña
              </Heading>
            </div>
          </VStack>
        </Center>
      </div>
      {/* <Navbar /> */}
    </Box>
  );
};

export default adminDashboard;
