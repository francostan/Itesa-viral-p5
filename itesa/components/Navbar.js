import React from "react";
import { VStack, Text, HStack, Image, Button } from "@chakra-ui/react";
import Link from "next/link";
import { logout } from "../store/reducers/userSlice";
import axios from "../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const LOGOUT = () => {
    localStorage.setItem("VT", "");
    axios.post("/logout");
    dispatch(logout());
    router.push("/home");
  };
  return (
    <HStack
      position={"absolute"}
      bottom={"4"}
      mt={"10%"}
      spacing={"5"}
      direction="row"
    >
      <VStack>
        {" "}
        <Link href="/logged/topInfluencers">
          <Image
            m={"auto"}
            boxSize="50%"
            objectFit="cover"
            src="/ranking (2).png"
            alt="Ranking footer"
          />{" "}
        </Link>{" "}
        <Text fontSize={"xs"} color={"white"}>
          {" "}
          Ranking
        </Text>
      </VStack>
      <VStack>
        <Link href="/logged/milestones">
          <Image
            m={"auto"}
            boxSize="40%"
            objectFit="cover"
            src="/value.png"
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
          Milestones
        </Text>
      </VStack>
      {user.admin === true ? (
        <VStack>
          {" "}
          <Link href="/adminMilestone">
            <Image
              m={"auto"}
              boxSize="40%"
              objectFit="cover"
              src="/admin (2).png"
              alt="Milestone footer"
            />{" "}
          </Link>
          <Text
            position={"absolute"}
            bottom={"-5%"}
            fontSize={"xs"}
            color={"white"}
          >
            {" "}
            Admin
          </Text>
        </VStack>
      ) : (
        ""
      )}
      <VStack>
        {" "}
        <Link href="#">
          <Image
            m={"auto"}
            className="iconos"
            onClick={() => {
              LOGOUT();
            }}
            boxSize="31%"
            objectFit="cover"
            src="/logout (3).png"
            alt="Logout footer"
          />{" "}
        </Link>
        <Text
          position={"absolute"}
          bottom={"-4%"}
          fontSize={"xs"}
          color={"white"}
        >
          {" "}
          Log Out
        </Text>
      </VStack>
    </HStack>
  );
};
export default Navbar;
