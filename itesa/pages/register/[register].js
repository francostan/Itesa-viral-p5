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
  const [required, setRequired] = useState(false);

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
    if (!nickName.value) {
      setRequired(true);
    } else if (!email.value) {
      setRequired(true);
    } else if (!password.value) {
      setRequired(true);
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
          />
        </FormControl>
        {required === false ? (
          ""
        ) : (
          <div className="errorForm"> Campo requerido</div>
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
        {required === false ? (
          ""
        ) : (
          <div className="errorForm"> Campo requerido</div>
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
        {required === false ? (
          ""
        ) : (
          <div className="errorForm"> Campo requerido</div>
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
          <Button className="btnViewPwd" onClick={() => togglePassword()}>
            {" "}
            <ViewIcon />
          </Button>
        </FormControl>
        {required === false ? (
          ""
        ) : (
          <div className="errorForm"> Campo requerido</div>
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
        {required === false ? (
          ""
        ) : (
          <div className="errorForm"> Campo requerido</div>
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
