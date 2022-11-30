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
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "../config/axios";
import Link from "next/link";
import Persistence from "../components/Persistence";
import React, { useState, useEffect } from "react";

export default function adminMilestone() {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    axios.get("/adminMilestones").then((res) => setMilestones(res.data));
  }, []);

  return (
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
      <Persistence />
      <VStack spacing={4} align="flex-start" w="full">
        <VStack spacing={1} align={["center", "center"]} mb={3} w="full">
          {" "}
          <HStack mb={20}>
            <Link href="/logged/homeuser/">
              <Image
                boxSize="40px"
                objectFit="cover"
                src="/banana.png"
                alt="Itesa Coin"
              />
            </Link>
            <Heading color="white"> Itesa </Heading>{" "}
            <Heading color="#9d39fe"> Coin</Heading>{" "}
          </HStack>
          <Heading color="white"> Administrador de Premios</Heading>
          {milestones.map(({ name, desc, tokenamount }) => {
            return (
              <div>
                <Heading color="white"> {name}</Heading>
                <h1>{name}</h1>
                <p>{desc}</p>
                <p>{tokenamount}</p>
              </div>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
}
