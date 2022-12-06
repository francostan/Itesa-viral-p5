import React from "react";
import {
  Flex,
  Box,
  Text,
  Image,
  Divider,
  Grid,
  HStack,
  List,
  ListItem,
  Link,
  VStack,
  Center,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function ListTop3({ ranking }) {
  //Single ranked va a venir como un objeto con un id(refferingId) y una cantidad de invitados

  const rankingVisual = [
    { img: "/gold.png", alt: "Primer puesto" },
    { img: "/silver.png", alt: "Segundo puesto" },
    { img: "/bronze.png", alt: "Tercer puesto" },
  ];

  return (
    <Grid
      alignContent={"flex-start"}
      color="white"
      h="100%"
      p={[8, 10]}
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
      </Flex>

      <Text
        mt={{ base: "-45%", md: "-13%", xl: "-9%" }}
        mb="10%"
        ml={"10%"}
        textAlign="center"
        as={"h1"}
        fontSize={"6xl"}
        fontWeight={"bold"}
      >
        {" "}
        Ranking
      </Text>

      {ranking?.slice(0, 3).map((puesto, index) => (
        <HStack align={"center"} direction={"column"} mx={"2"} backgroundColor={"transparent"}>
          <Image
            height={{ base: "45%", md: "100px", xl: "40%" }}
            src={rankingVisual[index].img}
            alt={rankingVisual[index].alt}
            width={{ base: "50%", md: "100px", xl: "10%" }}
            mb={"6%"}
            mt={"5%"}
          />
          <HStack direction={"column"} justify={"space-around"}>
            <Box mx={"4"}>
              <Text as={"h2"} fontSize={"4xl"} fontWeight={"bold"} mb={"2"}>
                {puesto.nick_name}
              </Text>
              <Text as={"h3"} fontSize={"lg"} fontWeight={"light"}>
                Total de invitados: {puesto.awards}
              </Text>
            </Box>
          </HStack>
        </HStack>
      ))}
      <List direction={"column"} paddingTop="5" h="100%">
        {ranking?.length > 3 &&
          ranking?.slice(3).map((item, index) => (
            <ListItem>
              <Divider
                p={1}
                orientation="horizontal"
                borderColor={"black"}
                my={4}
              />

              <Text
                fontWeight="bold"
                fontSize="2xl"
                textAlign="center"
                marginBottom={1}
              >
                Ranking: {index + 4}
              </Text>
              <HStack
                direction={"column"}
                align="center"
                justifyContent={"center"}
              >
                <Text marginTop={1} marginBottom={1}>
                  Nombre: {item.nick_name}
                </Text>

                <Text marginTop={1} marginBottom={1}>
                  Total de invitados: {item.awards}{" "}
                </Text>
              </HStack>
            </ListItem>
          ))}
      </List>
    </Grid>
  );
}
