import React, { useState } from "react";
import LineChart from "../../../components/Chart";
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
import AdminNavbar from "../../../components/AdminNavbar";
import Navbar from "../../../components/Navbar";
import Head from "next/head";
import { useEffect } from "react";

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
      <AdminNavbar mb={"5%"}/>
      <Box class="sparkboxes" m={"5%"}>
          <HStack spacing={"8%"}>

                <Box width={"45%"} p={"50%"}>
                  <Heading >{totUsers.Users}</Heading>
                  {/* <Heading>Usuarios registrados</Heading> */}
                </Box>


                <Box width={"45%"} p={"50%"}>
                  <Heading >{totTokens.Tokens}</Heading>
                  {/* <Heading>Tokens emitidos</Heading> */}
                </Box>

          </HStack>
        <Center>
          <VStack>
            <Box class="col-md-3">
              <Box class="box box3">
                <Box class="details"></Box>
                <LineChart datos={data} />
              </Box>
              <Heading color={"white"}>
                Usuarios registrados por campaña
              </Heading>
            </Box>

            <Box class="col-md-3">
              <Box class="box box4">
                <Box class="details"></Box>
                <Box id="spark4">
                  <LineChart datos={data}/>
                </Box>
              </Box>
              <Heading color={"white"}>
                Tokens emitidos por cada campaña
              </Heading>
            </Box>
          </VStack>
        </Center>
      </Box>
      {/* <Navbar /> */}
    </Box>
  );
};

export default adminDashboard;