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

import Swal from "sweetalert2";
import { ViewIcon } from "@chakra-ui/icons";
import handleInput from "../../reactHooks/handleInput";
import axios from "../../config/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function updatePassword() {
  const router = useRouter();
  const idUsuario = router.query.updatePassword;
  const password = handleInput();
  const passwordCheck = handleInput();
  const [required, setRequired] = useState(0);

  const togglePassword = () => {
    var input = document.getElementById("pwd");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const togglePasswordCheck = () => {
    var input = document.getElementById("pwd2");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const handleSubmit = async (e) => {
    if (!password.value) {
      setRequired(1);
    } else if (!passwordCheck.value) {
      setRequired(2);
    } else if (password.value !== passwordCheck.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
      });
    } else {
      e.preventDefault();

      const user = await axios.post("/user", { id: idUsuario });

      const newPassword = {
        id: user.data.id,
        password: password.value,
      };

      await axios
        .put("/resetPassword", newPassword)
        .then(() => router.push("/login"))
        .catch((err) => console.log(err));
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
            <Heading color="white"> Itesa </Heading>{" "}
            <Heading color="#9d39fe"> Coin</Heading>{" "}
          </HStack>
          <Heading color="white"> Nueva Contraseña</Heading>
        </VStack>

        <Box>
          <Text color="white" fontSize="xl" as="b">
            Bienvenido devuelta!
          </Text>
        </Box>

        <FormControl>
          <FormLabel color="white"> Contraseña</FormLabel>{" "}
          <Input
            width="93%"
            id="pwd"
            rounded="2xl"
            variant="filled"
            _focusVisible={"white"}
            type="password"
            {...password}
          />
          <Button className="btnViewPwd" onClick={() => togglePassword()}>
            {" "}
            <ViewIcon />
          </Button>
        </FormControl>
        {required === 1 ? (
          <div className="errorForm"> Campo requerido</div>
        ) : (
          <div className="rightForm"> Campo requerido</div>
        )}
        <FormControl>
          <FormLabel color="white"> Repita contraseña</FormLabel>{" "}
          <Input
            width="93%"
            id="pwd2"
            rounded="2xl"
            variant="filled"
            _focusVisible={"white"}
            type="password"
            {...passwordCheck}
          />
          <Button className="btnViewPwd" onClick={() => togglePasswordCheck()}>
            {" "}
            <ViewIcon />
          </Button>
        </FormControl>
        {required === 2 ? (
          <div className="errorForm"> Campo requerido</div>
        ) : (
          <div className="rightForm"> Campo requerido</div>
        )}
      </VStack>
      <Button
        colorScheme=""
        variant="solid"
        w={["full", "auto"]}
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        {" "}
        Confirmar{" "}
      </Button>
    </Box>
  );
}
