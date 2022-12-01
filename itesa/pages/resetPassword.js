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

export default function resetPassword() {
  const email = handleInput();
  const [sentEmail, setSentEmail] = useState(false);

  const handleLoading = (e) => {
    e.preventDefault();
    setSentEmail(true);
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    await axios.post("/emailResetPassword", {
      email: email.value,
    });
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
            <Heading color="white"> Itesa </Heading>{" "}
            <Heading color="#9d39fe"> Coin</Heading>{" "}
          </HStack>
          <Heading color="white"> Recuperar Contraseña</Heading>
        </VStack>
        <FormControl isRequired>
          <FormLabel color="white">
            {" "}
            Por favor ingrese su correo electrónico
          </FormLabel>{" "}
          <Input
            _focusVisible={"white"}
            rounded="2xl"
            variant="filled"
            {...email}
          />
        </FormControl>

        {sentEmail ? (
          <Box>
            <HStack>
              <Text color="red">
                * Se ha enviado un mail a su casilla de correo. Por favor siga
                los pasos indicados en el mismo para recuperar su contraseña.
              </Text>
            </HStack>
            <HStack>
              <Text color="white" mt={4} ml="25%" fontSize="xl" as="b">
                Muchas Gracias
              </Text>
            </HStack>
          </Box>
        ) : (
          <Button
            colorScheme=""
            variant="solid"
            w={["full", "auto"]}
            onClick={(e) => {
              handleLoading(e);
              //   handleLogin(e);
            }}
          >
            {" "}
            Enviar{" "}
          </Button>
        )}
      </VStack>
    </Box>
  );
}
