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

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import handleInput from "../../reactHooks/handleInput";
import axios from "../../config/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Registro() {
  const router = useRouter();
  const codigoReferido = router.query.register;

  const nickName = handleInput();
  const email = handleInput();
  const password = handleInput();
  const passwordCheck = handleInput();
  const emailCheck = handleInput();
  const [required, setRequired] = useState(0);
  const [contraseña, setContraseña] = useState(false);
  const [contraseñaCheck, setContraseñaCheck] = useState(false);
  let validMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
  const togglePasswordCheck = () => {
    var input = document.getElementById("pwd2");
    if (input.type === "password") {
      input.type = "text";
      setContraseñaCheck(true);
    } else {
      input.type = "password";
      setContraseñaCheck(false);
    }
  };

  const handleSubmit = async (e) => {
    if (!nickName.value) {
      setRequired(1);
    } else if (!email.value) {
      setRequired(2);
    } else if (!emailCheck.value) {
      setRequired(3);
    } else if (!password.value) {
      setRequired(4);
    } else if (!passwordCheck.value) {
      setRequired(5);
    } else if (
      password.value !== passwordCheck.value &&
      email.value !== emailCheck.value
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El email y la contraseña no coinciden",
      });
    } else if (password.value !== passwordCheck.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
      });
    } else if (email.value !== emailCheck.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El email no coincide",
      });
    } else if (!email.value.match(validMail)) {
      alert("ESTO NO ES MAIL");
    } else if (!emailCheck.value.match(validMail)) {
      alert("ESTO NO ES MAIL");
    } else {
      e.preventDefault();
      const newUser = {
        nick_name: nickName.value,
        email: email.value,
        password: password.value,
        referring: codigoReferido,
      };
      const created = await axios
        .post("/newUser", newUser)
        .then(() => router.push("/login"))
        .catch((err) =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Nombre de usuario o mail en uso",
          })
        );
    }
  };

  return (
    <Box
      backgroundColor="#101311"
      h="100%"
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
          <Heading color="white"> Registro</Heading>
        </VStack>
        <FormControl>
          <FormLabel color="white"> Correo electronico</FormLabel>{" "}
          <Input
            _focusVisible={"white"}
            rounded="2xl"
            variant="filled"
            {...email}
          />
        </FormControl>
        {required === 2 ? (
          <div className="errorForm"> Campo requerido</div>
        ) : (
          <div className="rightForm"> Campo requerido</div>
        )}
        <FormControl>
          <FormLabel color="white"> Repita correo electronico</FormLabel>{" "}
          <Input
            _focusVisible={"white"}
            rounded="2xl"
            variant="filled"
            {...emailCheck}
          />
        </FormControl>
        {required === 3 ? (
          <div className="errorForm"> Campo requerido</div>
        ) : (
          <div className="rightForm"> Campo requerido</div>
        )}
        <FormControl>
          <FormLabel color="white"> Nombre de Usuario</FormLabel>{" "}
          <Input
            _focusVisible={"white"}
            rounded="2xl"
            variant="filled"
            {...nickName}
          />
        </FormControl>
        {required === 1 ? (
          <div className="errorForm"> Campo requerido</div>
        ) : (
          <div className="rightForm"> Campo requerido</div>
        )}
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
        {required === 4 ? (
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
          {contraseñaCheck === true ? (
            <Button variant={"registro"} onClick={() => togglePasswordCheck()}>
              {" "}
              <ViewOffIcon />
            </Button>
          ) : (
            <Button variant={"registro"} onClick={() => togglePasswordCheck()}>
              {" "}
              <ViewIcon />
            </Button>
          )}
        </FormControl>
        {required === 5 ? (
          <div className="errorForm"> Campo requerido</div>
        ) : (
          <div className="rightForm"> Campo requerido</div>
        )}
        <FormLabel color="white"> Codigo de referido</FormLabel>{" "}
        <Input
          _focusVisible={"white"}
          rounded="2xl"
          variant="filled"
          value={codigoReferido}
        />
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
