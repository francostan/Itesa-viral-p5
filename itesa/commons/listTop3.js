import React from "react";
import {
  Flex,
  Box,
  Text,
  Image,
  Divider,
  Grid,
  HStack,
} from "@chakra-ui/react";

export default function ListTop3({ top3 }) {
  //Single ranked va a venir como un objeto con un id(refferingId) y una cantidad de invitados
  // top3 = [{referringId: 1, awards: 19, referringId: 2, awards: 18, referringId: 3, awards: 17}]
  return (
    <Grid alignContent={"center"}>
      <Flex
        w={"100%"}
        direction={["column", "column", "row", "row"]}
        justify={"center"}
        bg={"#9d39fe"}
        boxShadow={"lg"}
        rounded={"lg"}
        p={4}
      >
        <HStack spacing={12}>
          <Text
            textAlign="center"
            as={"h1"}
            fontSize={"6xl"}
            fontWeight={"bold"}
          >
            {" "}
            Ranking
          </Text>
          <Image
            marginLeft="100px"
            src="/winner.png"
            alt="Tercer Puesto"
            width={"20%"}
          />
        </HStack>
        <Flex align={"center"} mx={"2"}>
          <Image src="/gold.png" alt="Primer Puesto" width={"35%"} />
          <Box mx={"4"}>
            <Text as={"h2"} fontSize={"4xl"} fontWeight={"bold"} mb={"2"}>
              {top3[0].nick_name}
            </Text>
            <Text as={"h3"} fontSize={"lg"} fontWeight={"light"}>
              Total de invitados:{top3[0].awards}
            </Text>
          </Box>
        </Flex>
        <Divider orientation="horizontal" borderColor={"black"} my={"2"} />
        <Flex align={"center"} mx={"2"}>
          <Image src="/silver.png" width={"25%"} />
          <Box mx={"4"}>
            <Text as={"h2"} fontSize={"2xl"} fontWeight={"bold"} mb={"2"}>
              {top3[1].nick_name}
            </Text>
            <Text as={"h3"} fontSize={"lg"} fontWeight={"light"}>
              Total de invitados : {top3[1].awards}
            </Text>
          </Box>
        </Flex>
        <Divider orientation="horizontal" borderColor={"black"} my={"2"} />
        <Flex align={"center"} mx={"2"}>
          <Image src="/bronze.png" alt="Tercer Puesto" width={"20%"} />
          <Box mx={"4"}>
            <Text as={"h2"} fontSize={"lg"} fontWeight={"bold"} mb={"2"}>
              {top3[2].nick_name}
            </Text>
            <Text as={"h3"} fontSize={"lg"} fontWeight={"light"}>
              Total de invitados :{top3[2].awards}
            </Text>
          </Box>
        </Flex>
        <Divider orientation="horizontal" borderColor={"black"} my={"2"} />
      </Flex>
    </Grid>
  );
}
