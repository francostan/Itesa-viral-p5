import React from "react";
import { VStack, Text, HStack, Image, Button, Center } from "@chakra-ui/react";
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
  const sizers = {
    base: "30px", // 0-48em
    md: "60px", // 48em-80em,
    xl: "60px", // 80em+
  };
  return (
    <Center>
      <HStack
        justifySelf={"center"}
        position={"absolute"}
        bottom={"4"}
        mt={"25%"}
        spacing={{ base: "30px", md: "100px", xl: "200px" }}
        direction="row"
      >
        <VStack>
          {" "}
          <Center flexDirection={"column"}>
            <Link href="/logged/topInfluencers">
              <Image
                m={"auto"}
                height={sizers}
                width={sizers}
                objectFit="cover"
                src="/ranking (2).png"
                alt="Ranking footer"
              />{" "}
            </Link>{" "}
            <Text fontSize={"xs"} color={"white"}>
              {" "}
              Ranking
            </Text>
          </Center>
        </VStack>

        <VStack>
          <Center flexDirection={"column"}>
            <Link href="/logged/admin/milestones">
              <Image
                m={"auto"}
                height={sizers}
                width={sizers}
                objectFit="cover"
                src="/value.png"
                alt="Milestone footer"
              />{" "}
            </Link>{" "}
            <Text fontSize={"xs"} color={"white"}>
              {" "}
              Milestones
            </Text>
          </Center>
        </VStack>
        {user.admin === true ? (
          <VStack>
            {" "}
            <Center flexDirection={"column"}>
              <Link href="/logged/admin/home">
                <Image
                  m={"auto"}
                  height={sizers}
                  width={sizers}
                  objectFit="cover"
                  src="/admin (2).png"
                  alt="Milestone footer"
                />{" "}
              </Link>
              <Text fontSize={"xs"} color={"white"}>
                {" "}
                Admin
              </Text>
            </Center>
          </VStack>
        ) : (
          ""
        )}
        <VStack>
          {" "}
          <Center flexDirection={"column"}>
            <Link href="#">
              <Image
                m={"auto"}
                className="iconos"
                onClick={() => {
                  LOGOUT();
                }}
                height={sizers}
                width={sizers}
                objectFit="cover"
                src="/log-out.png"
                alt="Logout footer"
              />{" "}
            </Link>
            <Text fontSize={"xs"} color={"white"}>
              {" "}
              Log Out
            </Text>
          </Center>
        </VStack>
      </HStack>
    </Center>
  );
};
export default Navbar;
