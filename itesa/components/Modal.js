import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  useToast,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { CopyIcon, EmailIcon } from "@chakra-ui/icons";

const Modale = ({ prop }) => {
  const toast = useToast();
  const codigo = prop;
  const handleCopy = () => {
    {
      navigator.clipboard.writeText(codigo);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState("");
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  return (
    <>
      <Button

        ml={"5%"}
        mt={"25%"}

        variant="outline"
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Compartir mi código de referido
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Tu código para compartir es: </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{prop}</Text>
          </ModalBody>
          <ModalFooter>
            <Link href="/logged/invite">
              <Button>
                <EmailIcon></EmailIcon>
              </Button>
            </Link>
            <Button
              onClick={() => {
                handleCopy();
                toast({
                  isClosable: true,
                  render: () => (
                    <Box
                      p={3}
                      bg="#9d39fe"
                      borderRadius="15px"
                      border="solid white"
                      color="white"
                    >
                      Código copiado al portapepeles
                    </Box>
                  ),
                });
              }}
            >
              <CopyIcon></CopyIcon>
            </Button>

            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Modale;
