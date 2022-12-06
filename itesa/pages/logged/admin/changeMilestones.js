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
import axios from "../../../config/axios";
import Link from "next/link";
import Persistence from "../../../components/Persistence";
import React, { useState, useEffect } from "react";
import handleInput from "../../../reactHooks/handleInput";
import AdminNavbar from "../../../components/AdminNavbar";

export default function adminMilestone() {
  const [milestones, setMilestones] = useState([]);
  const [edit, setEdit] = useState({});
  const [add, setAdd] = useState(false);
  const [iden, setIden] = useState(null);
  const nombre = handleInput();
  const descripcion = handleInput();
  const cantidadToken = handleInput();
  const expirationState = handleInput();
  const quantityState = handleInput();

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
      <AdminNavbar />
      <VStack spacing={4} align="flex-start" w="full">
        <VStack spacing={1} align={["center", "center"]} mb={3} w="full">
          <Heading color="white" mt={"5%"} mr={"auto"} ml={"auto"}> Administrador de Premios</Heading>
          <VStack w={"100%"}>
            <VStack spacing={4} align="stretch" w={"100%"}>
              {milestones.map(
                (
                  {
                    name,
                    desc,
                    tokenAmount,
                    id,
                    expirationDate,
                    quantityCondition,
                  },
                  i
                ) => {
                  const hanldeAdd = () => {
                    setAdd(!add);
                    setIden(id);
                    nombre.setValue("");
                    descripcion.setValue("");
                    cantidadToken.setValue("");
                    expirationState.setValue("");
                    quantityState.setValue("");
                  };

                  const handleEdit = async () => {
                    const edit = await axios.put("/adminMilestones", {
                      name: nombre.value,
                      desc: descripcion.value,
                      tokenAmount: cantidadToken.value,
                      expirationDate: expirationState.value,
                      quantityCondition: quantityState.value,
                      id,
                    });
                    setEdit(edit);
                    setAdd(!add);
                  };

                  const handleDelete = async () => {
                    //Sin esta vuelta, el delete no acepta body
                    var data = JSON.stringify({
                      id: id,
                    });
                    var config = {
                      method: "delete",
                      url: "http://localhost:3000/api/adminMilestones",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      data: data,
                    };
                    const deleted = await axios(config);
                    setEdit(deleted);
                    setAdd(!add);
                  };

                  return (
                    <div key={i} i={i}>
                      {add && id === iden ? (
                        <Card backgroundColor="whiteAlpha.100">
                          <CardHeader>
                            <Input placeholder={name} {...nombre} />
                          </CardHeader>
                          <CardBody>
                            <Textarea placeholder={desc} {...descripcion} />
                            <Input
                              placeholder={tokenAmount}
                              {...cantidadToken}
                            />
                            <Input
                              placeholder={quantityCondition}
                              {...quantityState}
                            />
                          </CardBody>
                          <CardFooter ml="30%">
                            <Button backgroundColor="red">
                              <CloseIcon onClick={hanldeAdd} />
                            </Button>
                            <Button backgroundColor="green">
                              <CheckIcon onClick={handleEdit} />
                            </Button>
                            <Button backgroundColor="red">
                              <DeleteIcon onClick={handleDelete} />
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
                            <Text as="b" fontSize="lg">
                              Vencimiento:
                            </Text>
                            {expirationDate ? (
                              <Text>{expirationDate}</Text>
                            ) : (
                              <Text>Sin Vencimiento</Text>
                            )}
                            <Text as="b" fontSize="lg">
                              Referidos Requeridos:
                            </Text>
                            <Text>{quantityCondition}</Text>
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
                }
              )}
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
}
