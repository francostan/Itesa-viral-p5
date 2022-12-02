//importamos un boton de chakra
import {
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Image,
  GridItem,
  Text,
  VStack,
  Flex,
  Box,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import Persistence from "../components/Persistence";
import { useSelector } from "react-redux";

const Index = () => {
  return (
    <Grid
      minH={"100vh"}
      backgroundColor="#101311"
      placeItems={"center"}
      h={"100%"}
      w="100%"
      p={[8, 10]}
    >
      <Persistence />
      <HStack bg="#101311">
        <Image
          src="/banana.png"
          alt="logo"
          border="1px"
          boxSize="50px"
          borderRadius={"20%"}
        />
        <HStack spacing={"0"} align={"center"}>
          <Heading color={"white"}>Itesa</Heading>
          <Heading color="#9d39fe">Coin</Heading>
        </HStack>
      </HStack>
      <GridItem
        h={"60vh"}
        w={"100%"}
        mb="20%"
        align={"center"}
        bgRepeat="no-repeat"
        bgPosition={"center"}
        bgSize={"auto"}
        bgImage={
          "https://media.discordapp.net/attachments/1040681301201666089/1045049523577299075/Screen_Shot_2021-08-24_at_17.58.36.png?width=386&height=414"
        }
      >
        <Flex
          direction={"column"}
          alignItems={"center"}
          justify={"center"}
          h={"100%"}
        >
          <Text color={"white"}>Unite a nuestro universo</Text>
          <Text color={"white"}>de criptomonedas</Text>
        </Flex>
        <HStack
          position={"absolute"}
          bottom={"10%"}
          spacing={"3"}
          direction="row"
        >
          <VStack>
            {" "}
            <Link href="/register">
              <Image
                boxSize="40%"
                objectFit="cover"
                src="/edit.png"
                alt="Ranking footer"
              />{" "}
            </Link>{" "}
            <Text fontSize={"xs"} color={"white"}>
              {" "}
              Register
            </Text>
          </VStack>
          <VStack>
            <Link href="/login">
              <Image
                boxSize="30%"
                objectFit="cover"
                src="/user-interface.png"
                alt="Milestone footer"
              />{" "}
            </Link>{" "}
            <Text
              position={"absolute"}
              bottom={"-5%"}
              fontSize={"xs"}
              color={"white"}
            >
              {" "}
              Login
            </Text>
          </VStack>
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default Index;
