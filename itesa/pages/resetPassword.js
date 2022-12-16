import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Input,
  HStack,
  Button,
  Image,
  Center,
} from "@chakra-ui/react";
import handleInput from "../reactHooks/handleInput";
import { useState } from "react";
import axios from "../config/axios";
import Link from "next/link";
import Swal from "sweetalert2";
import Persistence from "../components/Persistence";

export default function ResetPassword() {
  const email = handleInput();
  const [sentEmail, setSentEmail] = useState(false);
  const [foundUser, setFoundUser] = useState(false);

  const handleLoading = (e) => {
    e.preventDefault();
    setSentEmail(true);
  };

  const handleEmail = async (e) => {
    e.preventDefault();

    // Verifico si el email existe, y obtengo info del usuario:
    const user = await axios.post("/resetPassword", {
      email: email.value,
    });

    if (user.data) {
      setFoundUser(true);

      // Si se encuentra un usuario con el mail ingresado se le mando un mail:
      await axios.post("/emailResetPassword", {
        email: user.data.email,
        id: user.data.id,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "No hay ningun usuario registrado con este mail",
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
          <Input rounded="2xl" variant="visible" type="email" {...email} />
        </FormControl>

        {sentEmail && foundUser ? (
          <Box>
            <HStack>
              <Text m={"auto"} alignContent={"center"} color="white">
                * Hemos enviado un mail a su casilla de correo. Por favor siga
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
              handleEmail(e);
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
