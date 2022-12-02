import React from "react";
import axios from "../config/axios";
import {
  Button,
  Grid,
  List,
  ListItem,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  Link,
  Spacer,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const MilestoneTable = () => {
  const [milestones, setMilestones] = React.useState([]);
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    axios
      .post("/milestones", { user: user.id })
      .then((res) => {
        return setMilestones(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

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

        <Spacer />
      </Flex>
      <Box marginBottom={10}>
        <VStack>
          <Text bg={"green"} color={"white"} p={2} borderRadius={10}>
            {" "}
            COMPLETED ITEM{" "}
          </Text>
          <Text bg={"red"} color={"white"} p={2} borderRadius={10}>
            {" "}
            NOT COMPLETED ITEM
          </Text>
        </VStack>
      </Box>

      <Box alignContent={"center"}>
        <TableContainer bg={"white"}>
          <Table variant="simple" size="md">
            <TableCaption>
              Conviertete en el primero de tus amigos en completar todos los
              milestones!
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Descripcion</Th>
                <Th isNumeric>Cantidad de tokens</Th>
              </Tr>
            </Thead>
            {milestones.length > 0 ? (
              milestones.map((miles) => {
                if (miles.completed) {
                  return (
                    <Tbody>
                      <Tr bg={"green"}>
                        <Td>{miles.name}</Td>
                        <Td>{miles.desc} </Td>
                        <Td isNumeric>{miles.tokenAmount}</Td>
                      </Tr>
                    </Tbody>
                  );
                } else {
                  return (
                    <Tbody>
                      <Tr bg={"red"}>
                        <Td>{miles.name}</Td>
                        <Td>{miles.desc} </Td>
                        <Td isNumeric>{miles.tokenAmount}</Td>
                      </Tr>
                    </Tbody>
                  );
                }
              })
            ) : (
              <Tbody>
                <Tr>
                  <Td>Empty</Td>
                  <Td>Empty </Td>
                  <Td isNumeric>0</Td>
                </Tr>
              </Tbody>
            )}
            <Tfoot>
              <Tr>
                <Th>Nombre</Th>
                <Th>Descripcion</Th>
                <Th isNumeric>Cantidad de tokens</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>

      <HStack spacing={"5"} mt="0%" direction="row">
        <Link href="/logged/topInfluencers">
          <Image
            mt={"2.5"}
            ml={"18%"}
            mb={"-10"}
            boxSize="50%"
            objectFit="cover"
            src="/ranking (2).png"
            alt="Ranking footer"
          />{" "}
        </Link>{" "}
        <Link href="#">
          <Image
            mt={"8"}
            mb={"-4"}
            ml={"30%"}
            boxSize="40%"
            objectFit="cover"
            src="/value.png"
            alt="Milestone footer"
          />{" "}
        </Link>{" "}
        <Link href="#">
          <Image
            mb={"-5"}
            ml={"47%"}
            mt="9"
            className="iconos"
            onClick={() => {
              LOGOUT();
            }}
            boxSize="31%"
            objectFit="cover"
            src="/logout (3).png"
            alt="Logout footer"
          />{" "}
        </Link>{" "}
      </HStack>
      <HStack ml={"5%"} mt={"5"} spacing={"22%"}>
        <Text fontSize={"xs"} color={"white"}>
          {" "}
          Ranking
        </Text>
        {/* <Button>Ranking </Button> */}
        {/* <Button>Milestones </Button> */}
        <Text fontSize={"xs"} color={"white"}>
          {" "}
          Milestones
        </Text>
        <Text fontSize={"xs"} color={"white"}>
          {" "}
          Log Out
        </Text>
        {/* <Button>Log Out </Button> */}
      </HStack>
    </Box>
  );
};

export default MilestoneTable;
