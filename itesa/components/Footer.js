import React from "react";
import { VStack, Text, HStack, Image, Button } from "@chakra-ui/react";
import Link from "next/link";

const Footer = () => {
  return (
    <HStack position={"absolute"} bottom={"7"} direction="row">
      <VStack>
        {" "}
        <Link href="/register">
          <Image
            m={"auto"}
            ml="40%"
            mt={"5%"}
            boxSize="30%"
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
            m={"auto"}
            boxSize="30%"
            objectFit="cover"
            src="/user-interface.png"
            alt="Milestone footer"
          />{" "}
        </Link>{" "}
        <Text
          position={"absolute"}
          bottom={"-3%"}
          fontSize={"xs"}
          color={"white"}
        >
          {" "}
          Login
        </Text>
      </VStack>
    </HStack>
  );
};
export default Footer;
