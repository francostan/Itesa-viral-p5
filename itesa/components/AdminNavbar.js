import React from "react";
import {
  VStack,
  Text,
  HStack,
  Image,
  Button,
  Box,
  Center,
} from "@chakra-ui/react";
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
    <Center>
      <HStack mt={"5%"} spacing={"5"} direction="row" color={"white"} backgroundColor="#101311">
      <Link href="/logged/homeuser">
          <Image
            src="/banana.png"
            alt="logo"
            border="1px"
            boxSize="50px"
            borderRadius={"20%"}
          />
        </Link>
        <Link href={"/logged/admin/home"}>
        <Box>Home</Box>
        </Link>
        <Link href={"/logged/admin/changeMilestones"}>
        <Box>Milestones</Box>
        </Link>
        <Link href={"/logged/admin/manageCampaign"}>
        <Box>Nva. Campaña</Box>
        </Link>
      </HStack>
    </Center>
  );
};
export default Navbar;
