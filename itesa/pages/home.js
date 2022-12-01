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
  //<Heading fontFamily={"poppins"} color={"white"} fontSize={"60px"} >Index</Heading>
  /*  <Image
        src="https://media.discordapp.net/attachments/1040681301201666089/1045049523577299075/Screen_Shot_2021-08-24_at_17.58.36.png?width=386&height=414"
        alt="logo"
        objectFit="cover"
        boxSize="300px"
        borderRadius={"20%"}
      /> */

  return (
    <Grid
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
      </GridItem>

      <HStack mt="35%" direction="row">
        <Link href="#">
          <Image
            mb="10%"
            ml={"33%"}
            boxSize="37%"
            objectFit="cover"
            src="/edit.png"
            alt="Ranking footer"
          />{" "}
        </Link>{" "}
        <Link href="#">
          <Image
            mb={"14%"}
            ml={"35%"}
            className="iconos"
            onClick={() => {}}
            boxSize="30%"
            objectFit="cover"
            src="/user-interface.png"
            alt="Ranking footer"
          />{" "}
        </Link>{" "}
      </HStack>

      <HStack direction={"row"} spacing={"20"}>
        {" "}
        <Link href={"/register"}>
          <Button width="80%">Register </Button>
        </Link>
        <Link href={"/login"}>
          <Button width="80%">Login </Button>
        </Link>
      </HStack>
    </Grid>
  );
};

export default Index;
