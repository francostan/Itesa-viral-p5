//Página de consulta de los milestones ya cumplidos y los que se tienen por cumplir.
//Resumen de los token ya obtenidos
// Si reclamar los tokens es manual, acá iría la ruta para reclamar los token pendientes
// Cuando agreguemos vencimientos, acá deberían mostrarse

import React from "react";
import MilestoneTable from "../../components/MilestoneTable";
import Persistence from "../../components/Persistence";

const milestones = () => {
  return (
    <>
      <Persistence />
      <MilestoneTable />
    </>
  );
};

export default milestones;
