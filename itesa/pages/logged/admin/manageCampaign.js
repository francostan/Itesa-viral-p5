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
import Swal from "sweetalert2";

export default function home() {
  const [proceed, setProceed] = useState(true);
  const [milestones, setMilestones] = useState([]);
  const name = handleInput();
  const desc = handleInput();
  const tokenQty = handleInput();
  const refReq = handleInput();
  const expireDate = handleInput();

  const handleProceed = async (e) => {
    setMilestones([])
    setProceed(false)
    setProceed(!proceed);
  };
  const handleSubmit = async () => {
    let tempArray = [...milestones];
    tempArray.push({
      name: name.value,
      desc: desc.value,
      tokenAmount: tokenQty.value,
      quantityCondition: refReq.value,
    });
    name.setValue("")
    desc.setValue("")
    tokenQty.setValue("")
    refReq.setValue("")
    return setMilestones(tempArray);
  };
  const handleDelete = async (e,i) => {
    const id = e.target.id;
    let tempArray = [...milestones];
    tempArray.splice(i, 1);
    return setMilestones(tempArray);
  };

  const generarCampaña = async () => {
    const tempArray = [...milestones];
    tempArray.sort((a, b) => a.quantityCondition - b.quantityCondition);
    setMilestones(tempArray);
    const newCampaign = {
      expirationDate: expireDate.value,
      milestones: tempArray,
    };
    await axios.post("/campaign", {newCampaign:newCampaign});
    setMilestones([])
    setProceed(true)
    name.setValue("")
    desc.setValue("")
    tokenQty.setValue("")
    refReq.setValue("")
    Swal.fire({
      icon: "success",
      title: "Campaña Creada",
      text: "La campaña ha sido generada correctamente",
    });
  };

  return (
    <Box backgroundColor="#101311">
      <AdminNavbar color={"white"}/>
      <Flex
        direction={"column"}
        padding={"5%"}
        w={"100%"}
        backgroundColor="#101311"
        color={"white"}
      >
        <Persistence />
        <Flex
          //border={"1px solid red"}
          id="header"
          color={"white"}
          flexDirection="column"
          p={"5%"}
        >
          <Heading mb={"5%"} textAlign={"center"}>
            Generar Campaña Nueva
          </Heading>
          <HStack>
            <Text>Recuerde que esto finalizará la campaña vigente</Text>
            {proceed ? (
              <Button onClick={handleProceed}> Ok </Button>
            ) : (
              <Button onClick={handleProceed}> Cancelar </Button>
            )}
          </HStack>
        </Flex>
        <Flex
          height={"90%"}
          id="mainBody"
          //border={"1px solid red"}
          flexDirection="column"
        >
          <FormControl padding={"5%"} isDisabled={proceed} size={"sm"}>
            <FormLabel size={"sm"} padding={"1%"} m={"1%"}>
              Nuevo Milestone
            </FormLabel>
            <FormLabel size={"sm"} padding={"1%"} m={"1%"}>
              Fecha de Finalización de la Campaña
            </FormLabel>
            <Input
              type={"date"}
              width={"200px"}
              size={"sm"}
              padding={"1%"}
              pl={"5%"}
              borderRadius={"20"}
              {...expireDate}
              m={"1%"}
            ></Input>
            <FormLabel size={"sm"} padding={"1%"} m={"1%"}>
              Nombre
            </FormLabel>
            <Input
              size={"sm"}
              padding={"1%"}
              pl={"5%"}
              borderRadius={"20"}
              {...name}
              m={"1%"}
            ></Input>
            <FormLabel size={"sm"} padding={"1%"} m={"1%"}>
              Descripción
            </FormLabel>
            <Input
              size={"sm"}
              padding={"1%"}
              pl={"5%"}
              m={"1%"}
              borderRadius={"20"}
              {...desc}
            ></Input>
            <FormLabel size={"sm"} padding={"1%"} m={"1%"}>
              Cantidad Requerida de Referidos
            </FormLabel>
            <Input
              size={"sm"}
              padding={"1%"}
              pl={"5%"}
              m={"1%"}
              borderRadius={"20"}
              {...refReq}
            ></Input>
            <FormLabel size={"sm"} padding={"1%"} m={"1%"}>
              Cantidad Tokens de Recompensa
            </FormLabel>
            <Input
              size={"sm"}
              padding={"1%"}
              pl={"5%"}
              m={"1%"}
              borderRadius={"20"}
              {...tokenQty}
            ></Input>
            <Flex justifyContent={"space-evenly"}>
              <Button
                size={"sm"}
                mt={"10%"}
                alignSelf={"flex-end"}
                isDisabled={proceed}
                onClick={handleSubmit}
              >
                Agregar
              </Button>
              <Button
                size={"sm"}
                mt={"10%"}
                alignSelf={"flex-end"}
                onClick={generarCampaña}
                isDisabled={milestones.length===0}
              >
                {" "}
                Confirmar Campaña{" "}
              </Button>
            </Flex>
          </FormControl>
          <Box>
            <Table size={"sm"} padding={"6%"}>
              <TableCaption bgColor={"transparent"}>Milestones Cargados</TableCaption>
              <Thead>
                <Tr color={"white"}>
                  <Th color={"white"}>#</Th>
                  <Th color={"white"}>Nombre</Th>
                  <Th color={"white"}>Recompensa</Th>
                  <Th color={"white"}>Requisito</Th>
                </Tr>
              </Thead>
              <Tbody>
                {milestones?.map((element, i) => {
                  return (
                    <Tr key={i}>
                      <Td>{i}</Td>
                      <Td>{element.name}</Td>
                      <Td>{element.tokenAmount}</Td>
                      <Td>{element.quantityCondition}</Td>
                      <Button id={i} size={"sm"} onClick={async (e)=>handleDelete(e,i)}>
                        <DeleteIcon/>
                      </Button>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
