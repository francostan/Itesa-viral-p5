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

export default function Login() {
  const secreto = handleInput();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSecret = async (e) => {
    e.preventDefault();
    const secret = {
      id: user.id,
      token: secreto.value,
    };
    const loggedUser = await axios.post("/2FA", secret);
    if (loggedUser.status === 200) dispatch(login(loggedUser.data));
    else console.log("hay algo mal");
  };

  return (
    <Box
      backgroundColor="#080B0E"
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
            <Image
              boxSize="40px"
              objectFit="cover"
              src="/banana.png"
              alt="Itesa Coin"
            />
            <Heading color="white"> Itesa </Heading>{" "}
            <Heading color="#9d39fe"> Coin</Heading>{" "}
          </HStack>
          <Heading color="white"> Código de veificación</Heading>
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
