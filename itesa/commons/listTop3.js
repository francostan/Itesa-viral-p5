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
} from "@chakra-ui/react";

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
      bgGradient="linear(black,#9d39fe)"
      h="100%"
    >
      <HStack spacing={12}>
        <Text textAlign="center" as={"h1"} fontSize={"6xl"} fontWeight={"bold"}>
          {" "}
          Ranking
        </Text>
        <Link href="/logged/homeuser">
          <Image
            src="/banana.png"
            alt="logo"
            border="1px"
            boxSize="50px"
            borderRadius={"20%"}
          />
        </Link>
      </HStack>
      {ranking?.slice(0, 3).map((puesto, index) => (
        <HStack align={"center"} direction={"column"} mx={"2"}>
          <Image
            src={rankingVisual[index].img}
            alt={rankingVisual[index].alt}
            width={"35%"}
            mb={"7%"}
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

{
  /* <Flex align={"center"} mx={"2"}>
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
        <Divider orientation="horizontal" borderColor={"black"} my={"2"} /> */
}
