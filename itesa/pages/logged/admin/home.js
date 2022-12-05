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
  import Navbar from "../../../components/Navbar";
  import AdminNavbar from "../../../components/AdminNavbar"
  
  export default function home() {
    const [milestones, setMilestones] = useState([]);
    const [edit, setEdit] = useState({});
    const [add, setAdd] = useState(false);
    const [iden, setIden] = useState(null);
    const nombre = handleInput();
    const descripcion = handleInput();
    const cantidadToken = handleInput();
    const expirationState = handleInput();
    const quantityState = handleInput();
  
  
    return (<>
      <Persistence />
      <Box minH={"100vh"} h={"100%"} w={"100%"} p={"5%"} bg={"black"}>

      <AdminNavbar/>
      {/* <Flex
      direction={"column"}
      padding={"5%"}
      w={"100%"}
      height={"100vh"}
      backgroundColor="#101311"
      overflowY={"scroll"}
    >
        <Flex>
        <Button>DashBoard</Button>
        <Button>Milestones Vigentes</Button>
        <Button>Gestionar Campaña</Button>
        </Flex>

      </Flex> */}
      <Navbar/>
      </Box>
      </>
    );
  }
  