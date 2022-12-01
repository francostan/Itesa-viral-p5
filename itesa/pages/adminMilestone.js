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
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  AddIcon,
  MinusIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import axios from "../config/axios";
import Link from "next/link";
import Persistence from "../components/Persistence";
import React, { useState, useEffect } from "react";
import handleInput from "../reactHooks/handleInput";

export default function adminMilestone() {
  const [milestones, setMilestones] = useState([]);
  const [edit, setEdit] = useState({});
  const [add, setAdd] = useState(false);
  const [iden, setIden] = useState(null);
  const nombre = handleInput();
  const descripcion = handleInput();
  const cantidadToken = handleInput();

  useEffect(() => {
    axios.get("/adminMilestones").then((res) => setMilestones(res.data));
  }, [edit]);

  return (
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
            <VStack
              spacing={4}
              //   templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
              align="stretch"
            >
              {milestones.map(({ name, desc, tokenAmount, id }, i) => {
                const hanldeAdd = () => {
                  setAdd(!add);
                  setIden(id);
                };

                const handleEdit = async () => {
                  const edit = await axios.put("/adminMilestones", {
                    name: nombre.value,
                    desc: descripcion.value,
                    tokenAmount: cantidadToken.value,
                    id,
                  });

                  setEdit(edit);
                  setAdd(!add);
                };

                return (
                  <div key={i} i={i}>
                    {add && id === iden ? (
                      <Card backgroundColor="white">
                        <CardHeader>
                          <Input placeholder={name} {...nombre} />
                        </CardHeader>
                        <CardBody>
                          <Textarea placeholder={desc} {...descripcion} />

                          <Input placeholder={tokenAmount} {...cantidadToken} />
                        </CardBody>
                        <CardFooter ml="30%">
                          <Button backgroundColor="red">
                            <CloseIcon onClick={hanldeAdd} />
                          </Button>
                          <Button backgroundColor="green">
                            <CheckIcon onClick={handleEdit} />
                          </Button>
                        </CardFooter>
                      </Card>
                    ) : (
                      <Card backgroundColor="white">
                        <CardHeader>
                          <Heading size="lg" as="b">
                            {" "}
                            {name}
                          </Heading>
                        </CardHeader>
                        <CardBody>
                          <Text as="b" fontSize="lg">
                            {" "}
                            Descripción:
                          </Text>
                          <Text mb={2}> {desc}</Text>
                          <Text as="b" fontSize="lg">
                            Cantidad de tokens:
                          </Text>
                          <Text>{tokenAmount}</Text>
                        </CardBody>
                        <CardFooter>
                          <Box ml="80%">
                            <Button>
                              <EditIcon onClick={hanldeAdd} />
                            </Button>
                          </Box>
                        </CardFooter>
                      </Card>
                    )}
                  </div>
                );
              })}
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
}
