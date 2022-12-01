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
  Text
} from "@chakra-ui/react";

const Ranking = () => {
  const [ranking, setRanking] = React.useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [rankingBottom, setRangingBottom] = useState([]);

  React.useEffect(() => {
    axios.get("/ranking").then((response) => {
      setRanking(response.data);
    });
  }, []);

  const handleMostrar = () => {
    const temp=ranking.slice(3,ranking.length)
    setRangingBottom(temp);
    setMostrar(!mostrar);
  };
  console.log(rankingBottom);
  return (
    <Grid>
      {ranking.length > 0 ? (
        <ListTop3 top3={ranking.slice(0, 3)} />
      ) : (
        <p>No hay ranking disponible</p>
      )}
      <Button onClick={handleMostrar}>Ver Ranking Completo</Button>
      {mostrar ? (
        <List spacing={3}>
          {rankingBottom?.map((rank,i) => (
            <ListItem>
                <Text>{i+4}</Text>
              <HStack spacing={2}>
                <Text>Nick Name:{rank.nick_name}</Text>
                <Text>Awards: {rank.awards}</Text>
              </HStack>
            </ListItem>
          ))}
        </List>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default Ranking;
