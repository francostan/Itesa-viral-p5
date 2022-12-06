import React from "react";
import { VStack, Text, HStack, Image, Button, Center } from "@chakra-ui/react";
import Link from "next/link";

const Footer = () => {
  return (
    <Center>
      <HStack position={"absolute"} bottom={"7"} direction="row">
        <VStack>
          {" "}
          <Link href="/register">
            <Image
              m={"auto"}
              ml={{ base: "40%", md: "45%", xl: "45%" }}
              mt={"5%"}
              boxSize={{ base: "30%", md: "15%", xl: "15%" }}
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
              boxSize={{ base: "30%", md: "15%", xl: "15%" }}
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
    </Center>
  );
};
export default Footer;
