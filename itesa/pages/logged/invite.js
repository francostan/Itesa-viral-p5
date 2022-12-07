import handleInput from "../../reactHooks/handleInput";
import axios from "../../config/axios";
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
import Persistence from "../../components/Persistence";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Swal from "sweetalert2";
const inviteMail = () => {
  const email = handleInput();
  const mensaje = handleInput();
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const handleLoading = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  const handleSendMail = async () => {
    const invited = await axios.post("/sendInvite", {
      email: email.value,
      custom_text: mensaje.value,
      viral_code: user.viral_code,
      user: user.nick_name,
    });

    Swal.fire({
      icon: "success",
      title: "Sent",
      text: "El email ha sido enviado",
    });
    setLoading(false);
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
            <Link href="/logged/homeuser">
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
          <Heading color="white"> Invitar amigos</Heading>
        </VStack>
        <FormControl isRequired>
          <FormLabel color="white"> Email del destinatario</FormLabel>{" "}
          <Input rounded="2xl" variant="visible" {...email} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="white"> Mensaje personalizado: </FormLabel>{" "}
          <Input
            id="pwd"
            rounded="2xl"
            variant="visible"
            type="text"
            {...mensaje}
          />
        </FormControl>

        <Link href="/2fa">
          <Button
            colorScheme=""
            variant="solid"
            w={["full", "auto"]}
            onClick={(e) => {
              handleLoading(e);
              handleSendMail();
            }}
          >
            Enviar invitación
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
};

export default inviteMail;
