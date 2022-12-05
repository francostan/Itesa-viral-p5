import React, { useEffect } from "react";
import axios from "../config/axios";
import ListTop3 from "../commons/listTop3";
import { useState } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  HStack,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";
import Navbar from "./Navbar";

const Ranking = () => {
  const [ranking, setRanking] = React.useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [rankingBottom, setRankingBottom] = useState([]);

  React.useEffect(() => {
    axios.get("/ranking").then((response) => {
      setRanking(response.data);
    });
  }, []);

  return (
    <Flex direction={"column"} w={"100%"} h="100%" npm run migrate>
      {ranking.length > 0 ? (
        <ListTop3 ranking={ranking} />
      ) : (
        <p>No hay ranking disponible</p>
      )}
    </Flex>
  );
};

export default Ranking;
