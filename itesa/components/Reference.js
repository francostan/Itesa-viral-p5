import React, { useState } from "react";
import { Alert, Button, Center, useDisclosure, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Modale from "./Modal";

const Reference = () => {

  const userRedux = useSelector((state) => state.user);
  const { viral_code } = userRedux;

  const data = { url: `http://localhost:3000/register/${viral_code}` };

  const handleClick = () => {
    alert("El codigo para referir es: " + viral_code);
  };

  const handleReference = () => {
    if (window.navigator.share) {
      window.navigator
        .share(data)
        .then(() => console.log("Compartido"))
        .catch((error) => console.log("Error", error));
    } else {
      alert(`Tu url para compartir es -->  ${data.url}`);
    }
  };

  return (
    <div>
      <Modale prop={viral_code} />
    </div>
  );
};

export default Reference;
