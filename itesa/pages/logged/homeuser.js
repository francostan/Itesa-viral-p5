import React from "react";
import WalletCard from "../../components/WalletCard";
import Persistence from "../../components/Persistence";
import { useSelector } from "react-redux";

const HomeUser = () => {
  
  return (
    <div>
      <Persistence />
      <WalletCard />
    </div>
  );
};

export default HomeUser;


//Esta es la pantalla principal de la app
//Se muestra saldo de tokens
//Siguiente milestone
//Tokens por reclamar (si el reclamo lo hacemos manual)
//Algún resumen de la actividad de los últimos días
//Cuando tengamos vencimientos; el más cercano debería mostrarse acá