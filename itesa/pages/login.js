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
export default function Login() {
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
          <Heading color="white"> Login</Heading>
        </VStack>
        <FormControl>
          <FormLabel color="white"> Correo electronico</FormLabel>{" "}
          <Input _focusVisible={"white"} rounded="2xl" variant="filled" />
        </FormControl>
        <FormControl>
          <FormLabel color="white"> Contraseña</FormLabel>{" "}
          <Input
            rounded="2xl"
            variant="filled"
            _focusVisible={"white"}
            type="password"
          />
        </FormControl>
        <HStack>
          <Checkbox color="white"> Remember me.</Checkbox>
          <Button variant="link" colorScheme="purple">
            {" "}
            Forgot Password?
          </Button>
        </HStack>

        <Button colorScheme="" variant="solid" w={["full", "auto"]}>
          {" "}
          Login{" "}
        </Button>
      </VStack>
    </Box>
  );
}
