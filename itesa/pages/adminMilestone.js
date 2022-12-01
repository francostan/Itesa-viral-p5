import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Textarea,
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
  Center,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  AddIcon,
  MinusIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import axios from "../config/axios";
import Link from "next/link";
import Persistence from "../components/Persistence";
import React, { useState, useEffect } from "react";
import handleInput from "../reactHooks/handleInput";

export default function adminMilestone() {
  const [milestones, setMilestones] = useState([]);
  const [addMilestone, setAddMilestone] = useState({});
  const [add, setAdd] = useState(false);
  const name = handleInput();
  const description = handleInput();
  const token = handleInput();

  const hanldeAdd = () => {
    setAdd(!add);
  };

  const handleConfirm = async () => {
    const newMilestone = await axios.post("/adminMilestones", {
      tokenAmount: token.value,
      name: name.value,
      desc: description.value,
    });

    setAddMilestone(newMilestone.data);

    setAdd(!add);
  };

  useEffect(() => {
    axios.get("/adminMilestones").then((res) => setMilestones(res.data));
  }, [addMilestone]);

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
            <Button onClick={hanldeAdd}>
              {add ? <MinusIcon /> : <AddIcon />}
            </Button>
            {add ? (
              <Box display="flex" alignItems="center">
                <SimpleGrid
                  spacing={4}
                  templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
                  width="110%"
                >
                  <Card backgroundColor="white">
                    <CardHeader>
                      <Heading size="md">Nombre: </Heading>
                      <Input placeholder="Milestone" {...name} />
                    </CardHeader>
                    <CardBody>
                      <Text> Descripción: </Text>
                      <Textarea
                        placeholder="Descripción de milestone"
                        {...description}
                      />
                      <Text>Cantidad de tokens: </Text>
                      <Input placeholder="Tokens" {...token} />
                    </CardBody>
                    <CardFooter>
                      <Button onClick={handleConfirm}>
                        <CheckIcon mr={2} /> Confirmar
                      </Button>
                    </CardFooter>
                  </Card>
                </SimpleGrid>
              </Box>
            ) : (
              ""
            )}
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
