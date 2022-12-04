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
  Select,
} from "@chakra-ui/react";

const Ranking = () => {
  const [ranking, setRanking] = React.useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [rankingBottom, setRankingBottom] = useState([]);
  const [selectedCampaign,setSelectedCampaign]=useState(0)

  React.useEffect(() => {


    // PARA QUE TODO ESTO ANDE HAY QUE AGREGAR COLUMNA DE CAMPAIGN ID A LA TABLA DE AWARDS
    // AGREGAR EN LA LÓGICA DE REGISTRO QUE CUANDO ALGUIEN SE LOGUEA CON UN CÓDIGO DE REFERIDO, SE REGISTRE TAMBIÉN EL CÓDIGO DE CAMPAÑA VIGENTE (O 0 SI NO LA HAY)
    // Tengo que armar ruta para traer un array con todas las campañas que haya

    axios.get("/ranking").then((response) => { //Modificar para que traiga el ranking de la campaña seleccionada
      setRanking(response.data.usersRanking);
    });



  }, []);
  const handleOption = (e)=>{
    setSelectedCampaign(e.target.value)
    console.log(e.target.value);
  }

  return (
    <Flex
      direction={"column"}
      paddingLeft={"5%"}
      w={"100%"}
      h="100%"
      bgGradient="linear(black,#9d39fe)"
    >
      {/* Mapear el array de las campañas que haya */}
      <Select color={"white"} onChange={handleOption}> 
        <option value="0" defaultChecked>Historial General</option>
        <option value="1">Campaña 1</option>
        <option value="2">Campaña 2</option>
      </Select>

      {ranking.length > 0 ? (
        <ListTop3 ranking={ranking} />
      ) : (
        <p>No hay ranking disponible</p>
      )}
    </Flex>
  );
};

export default Ranking;
