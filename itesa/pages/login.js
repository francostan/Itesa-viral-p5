import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Input,
  HStack,
  Checkbox,
  Button,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import handleInput from "../reactHooks/handleInput";
import { login } from "../store/reducers/userSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../config/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Persistence from "../components/Persistence";

export default function Login() {
  const nickName = handleInput();
  const password = handleInput();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [contraseña, setContraseña] = useState(false);

  const user = useSelector((state) => state.user);

  const handleLoading = (e) => {
    e.preventDefault();
    setLoading(true);
  };
  const togglePassword = () => {
    var input = document.getElementById("pwd");
    if (input.type === "password") {
      input.type = "text";
      setContraseña(true);
    } else {
      input.type = "password";
      setContraseña(false);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      nick_name: nickName.value,
      password: password.value,
    };
    const loggedUser = await axios.post("/login", user);

    if (loggedUser.status === 200) {
      dispatch(login(loggedUser.data));
      router.push("/2fa");
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrectos",
      });
    }
  };

  return (
    <Box
      backgroundColor="#101311"
      minH={"100vh"}
      w="100%"
      p={[8, 10]}
      mx="auto"
      border={["none", "1px"]}
      borderColor={["", "gray.300"]}
      borderRadius={10}
    >
      <Persistence />
      <VStack spacing={4} align="flex-start" w="full">
        <VStack spacing={1} align={["center", "center"]} mb={3} w="full">
          {" "}
          <HStack mb={20}>
            <Link href="/home">
              <Image
                boxSize="40px"
                objectFit="cover"
                src="/banana.png"
                alt="Itesa Coin"
              />
            </Link>
            <Heading color="white"> Tuki </Heading>{" "}
            <Heading color="#9d39fe"> Coin</Heading>{" "}
          </HStack>
          <Heading color="white"> Login</Heading>
        </VStack>
        <FormControl isRequired>
          <FormLabel color="white"> Nombre de Usuario</FormLabel>{" "}
          <Input
            _focusVisible={"white"}
            rounded="2xl"
            variant="filled"
            {...nickName}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="white"> Contraseña</FormLabel>{" "}
          <Input
            id="pwd"
            width="89%"
            rounded="2xl"
            variant="filled"
            _focusVisible={"white"}
            type="password"
            {...password}
          />
          {contraseña === true ? (
            <Button variant={"registro"} onClick={() => togglePassword()}>
              {" "}
              <ViewOffIcon />
            </Button>
          ) : (
            <Button variant={"registro"} onClick={() => togglePassword()}>
              {" "}
              <ViewIcon />
            </Button>
          )}
        </FormControl>

        <HStack>
          <Link href="/resetPassword">
            <Button variant="link" colorScheme="purple">
              {" "}
              ¿Olvidaste tu contraseña?
            </Button>
          </Link>
        </HStack>

        <Link href="/2fa">
          <Button
            colorScheme=""
            variant="solid"
            w={["full", "auto"]}
            onClick={(e) => {
              handleLoading(e);
              handleLogin(e);
            }}
          >
            {" "}
            Login{" "}
          </Button>
        </Link>
        {loading ? (
          <Spinner
            className="loading"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        ) : (
          ""
        )}
      </VStack>
    </Box>
  );
}
