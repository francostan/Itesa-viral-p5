import React, { useEffect, useState } from "react";
import LineChart from "../../../components/Chart";
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
import AdminNavbar from "../../../components/AdminNavbar";
import Navbar from "../../../components/Navbar";
import axios from "../../../config/axios";

const adminDashboard = () => {
  const [tokensTotal, setTokensTotal] = useState(0);
  const [usersTotal, setUsersTotal] = useState(0);
  const [emission, setEmission] = useState([]);
  const [emissionCampaign, setEmissionCampaign] = useState([]);
  const [registration, setRegistration] = useState([]);
  const [registrationCampaign, setRegistrationCampaign] = useState([]);
  useEffect(() => {
    const getStatus = async () => {
      try {
        const result = await axios.get("/dashboard").then((res) => res.data);
        const tempToken = result.totTokens.Tokens;
        const tempUsers = result.totUsers.Users;
        const tempEmission = result.historicEmission.emissions;
        const tempEmissionCampaigns = result.historicEmission.campaigns;
        const tempRegistration = result.historicRegistration.Registrations;
        const tempRegistrationCampaign = result.historicRegistration.campaigns;
        setTokensTotal(tempToken);
        setUsersTotal(tempUsers);
        setEmission(tempEmission);
        setRegistration(tempRegistration);
        setEmissionCampaign(tempEmissionCampaigns);
        setRegistrationCampaign(tempRegistrationCampaign);
      } catch (err) {
        console.log(err);
      }
    };
    getStatus();
  }, []);

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
      <AdminNavbar />
      <Grid className="row sparkboxes mt-4" mt={"5%"}>
        <Center>
          <VStack mb={"10%"} mt={"5%"} mr={"5%"}>
            <div className="col-md-3">
              <div className="box box1">
                <Heading color="white" textAlign={"center"}>
                  {usersTotal}
                </Heading>
              </div>
              <Heading color={"white"}> Total de usuarios</Heading>
            </div>
          </VStack>
          <VStack mb={"10%"} mt={"5%"} ml={"5%"}>
            <Grid className="col-md-3">
              <div className="box box2">
                <Heading color="white" textAlign={"center"}>
                  {tokensTotal}
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
                {registration.length > 0 ? (
                  <LineChart
                    campaign={registrationCampaign}
                    quantity={registration}
                    text={"Usuarios registrados por campaña"}
                  />
                ) : (
                  ""
                )}
              </div>
            </Grid>
            <div className="col-md-3">
              <div className="box box4">
                <div className="details"></div>
                <div id="spark4">
                  {emission.length > 0 ? (
                    <LineChart
                      campaign={emissionCampaign}
                      quantity={emission}
                      text={"Tokens emitidos por campaña"}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </VStack>
        </Center>
      </Grid>
      <Navbar />
    </Box>
  );
};

export default adminDashboard;
