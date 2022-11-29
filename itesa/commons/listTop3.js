import React from "react";
import { Flex, Box, Text, Image, Divider, Grid } from "@chakra-ui/react";

export default function ListTop3 ({ top3 }) {
  //Single ranked va a venir como un objeto con un id(refferingId) y una cantidad de invitados
  // top3 = [{referringId: 1, awards: 19, referringId: 2, awards: 18, referringId: 3, awards: 17}]
    console.log(top3)
  return (
    <Grid alignContent={"center"}>
    <Flex 
    maxW={"1000px"} 
    w={"70vw"}
    direction={["column", "column", "row", "row"]}
    justify={"center"}
    bg={"purple.400"}
    boxShadow={"lg"}
    rounded={"lg"}
    p={4}>
      <Flex align={"center"} mx={"2"} >
        <Image src="https://cdn-icons-png.flaticon.com/512/5406/5406819.png" alt="Primer Puesto" width={"10vw"} />
        <Box mx={"4"} >
          <Text as={"h2"} fontSize={"xl"} fontWeight={"bold"} mb={"2"} >{top3[0].nick_name}</Text>
          <Text as={"h3"} fontSize={"lg"} fontWeight={"light"}  >{top3[0].awards}</Text>
        </Box>
      </Flex>
<Divider orientation="vertical" borderColor={"black"} my={"2"} />
<Flex align={"center"} mx={"2"} >
        <Image src="https://us.123rf.com/450wm/barks/barks1801/barks180100015/93397731-clasificaci%C3%B3n-icono-de-la-medalla-de-ilustraci%C3%B3n-2do-lugar-plata-.jpg" alt="Segundo Puesto" width={"10vw"}/>
        <Box mx={"4"} >
          <Text as={"h2"} fontSize={"xl"} fontWeight={"bold"} mb={"2"} >{top3[1].nick_name}</Text>
          <Text as={"h3"} fontSize={"lg"} fontWeight={"light"}  >{top3[1].awards}</Text>
        </Box>
      </Flex>
<Divider orientation="vertical" borderColor={"black"} my={"2"} />
<Flex align={"center"} mx={"2"} >
        <Image src="https://c8.alamy.com/compes/2ayrrm7/ilustracion-del-icono-de-medalla-de-clasificacion-tercer-lugar-bronce-2ayrrm7.jpg" alt="Tercer Puesto" width={"10vw"}/>
        <Box mx={"4"} >
          <Text as={"h2"} fontSize={"xl"} fontWeight={"bold"} mb={"2"} >{top3[2].nick_name}</Text>
          <Text as={"h3"} fontSize={"lg"} fontWeight={"light"}  >{top3[2].awards}</Text>
        </Box>
      </Flex>
    </Flex>
    </Grid>
  );
};