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
} from "@chakra-ui/react";
import axios from "../config/axios";
import handleInput from "../reactHooks/handleInput";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducers/userSlice";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const secreto = handleInput();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSecret = async (e) => {
    e.preventDefault();
    const secret = {
      id: user.id,
      token: secreto.value,
    };

    try {
      let res = await axios.post("/2FA", secret);
      dispatch(login(res.data));
      router.push("/logged/homeuser");

      // Work with the response...
    } catch (err) {
      // Handle error
      console.log(err.message);
      console.log(err.response.data);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Código incorrecto",
      });
    }

  };

  return (
    <Box
      backgroundColor="#101311"
      h="99vh"
      w="100%"
      p={[8, 10]}
      mx="auto"
      border={["none", "1px"]}
      borderColor={["", "gray.300"]}
      borderRadius={10}
    >
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
          <Heading color="white"> Código de verificación</Heading>
        </VStack>
        <FormControl>
          <Input
            _focusVisible={"white"}
            rounded="2xl"
            variant="filled"
            {...secreto}
          />
        </FormControl>

        <Button
          colorScheme=""
          variant="solid"
          w={["full", "auto"]}
          onClick={(e) => {
            handleSecret(e);
          }}
        >
          {" "}
          Enviar{" "}
        </Button>
      </VStack>
    </Box>
  );
}
