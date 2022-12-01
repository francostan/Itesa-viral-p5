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
} from "@chakra-ui/react";

const MilestoneTable = () => {
  
  const [milestones,setMilestones] = React.useState([]);

  React.useEffect(() => {
    setMilestones([{name: "Registration",
          desc: "Succesfull Registration",
          tokenAmount: "25",},
           {name: "Invitation",
          desc: "Succesfull Registration",
          tokenAmount: "50",},
            {name: "Registration",
          desc: "10 Invitations",
          tokenAmount: "60",},
            {name: "50 Invitations",
          desc: "Succesfull Registration",
          tokenAmount: "100",},
            {name: "100 Invitations",
          desc: "Succesfull Registration",
          tokenAmount: "150"}]);
  }, []);

  return ( <Box
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

       <Flex>
          <TableContainer>
          <Table variant='simple' size='md'>
          <TableCaption>Conviertete en el primero de tus amigos en completar todos los milestones!</TableCaption>
          <Thead>
          <Tr>
          <Th>Nombre</Th>
          <Th>Descripcion</Th>
          <Th isNumeric>Cantidad de tokens</Th>
          </Tr>
         </Thead>
{ milestones.length>0?(
  {milestones.map((miles) =>(
    <Tbody>
         <Tr>
          <Td>{miles.name}</Td>
          <Td>{miles.desc} </Td>
          <Td isNumeric>{miles.tokenAmount}</Td>
        </Tr>
        </Tbody>
))}
         ) : (<></>)
}
  <Tfoot>
          <Tr>
          <Th>Nombre</Th>
          <Th>Descripcion</Th>
          <Th isNumeric>Cantidad de tokens</Th>
          </Tr>
   </Tfoot>
    </Table>
   </TableContainer>
                  
       </Flex>
                  

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

      </Box>);
};

export default MilestoneTable;
