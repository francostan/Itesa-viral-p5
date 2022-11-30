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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
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
          <VStack>
            <Button>
              <AddIcon />
            </Button>
          </VStack>
          <VStack>
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
            >
              {milestones.map(({ name, desc, tokenAmount }) => {
                return (
                  <Card backgroundColor="white">
                    <CardHeader>
                      <Heading size="md"> {name}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text> Descripción: {desc}</Text>
                      <Text>Cantidad de tokens: {tokenAmount}</Text>
                    </CardBody>
                    <CardFooter>
                      <Button>
                        <EditIcon />
                      </Button>
                      <Button>
                        <DeleteIcon />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </SimpleGrid>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
}
