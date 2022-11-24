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
import handleInput from "../reactHooks/handleInput";
import axios from "../config/axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Registro() {
  const nickName = handleInput();
  const email = handleInput();
  const password = handleInput();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      nick_name: nickName.value,
      email: email.value,
      password: password.value,
    };
    const created = await axios.post("/newUser", newUser);
    router.push("/login");
  };

  return (
    <Box
      backgroundColor="#201925"
      h="99vh"
      w={["full", "md"]}
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
            <Heading color="white"> Itesa </Heading>{" "}
            <Heading color="#9d39fe"> Coin</Heading>{" "}
          </HStack>
          <Heading color="white"> Registro</Heading>
        </VStack>
        <FormControl>
          <FormLabel color="white"> Correo electronico</FormLabel>{" "}
          <Input
            _focusVisible={"white"}
            rounded="2xl"
            variant="filled"
            {...email}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel color="white"> Nombre de Usuario</FormLabel>{" "}
          <Input
            _focusVisible={"white"}
            rounded="2xl"
            variant="filled"
            {...nickName}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel color="white"> Contraseña</FormLabel>{" "}
          <Input
            rounded="2xl"
            variant="filled"
            _focusVisible={"white"}
            type="password"
            {...password}
            required
          />
        </FormControl>

        <Button
          colorScheme=""
          variant="solid"
          w={["full", "auto"]}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {" "}
          Registrarse{" "}
        </Button>
      </VStack>
    </Box>
  );
}
