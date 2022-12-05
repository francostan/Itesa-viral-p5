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
  const [campaigns,setCampaigns]=useState([])

  React.useEffect(() => {

    axios.get("/campaign").then(response=>setCampaigns(response.data))
    
    axios.get("/ranking").then((response) => { //Modificar para que traiga el ranking de la campaña seleccionada
      setRanking(response.data.usersRanking);
    });



  }, []);

  
  const handleOption = async (e)=>{
    setSelectedCampaign(e.target.value)
    await axios.post("/ranking",{campaignId:e.target.value}).then((response) => { //Modificar para que traiga el ranking de la campaña seleccionada
      setRanking(response.data);
    });
  }

  return (
    <Flex
      direction={"column"}
      padding={"5%"}
      w={"100%"}
      height={"100%"}
      bgGradient="linear(black,#9d39fe)"
    >
      {/* Mapear el array de las campañas que haya */}
      <Select color={"white"} onChange={handleOption}>
        {campaigns.map((element)=> <option value={element.num}>{element.campaignName}</option>)}
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
