import React from "react";
import axios from "../config/axios";
import ListTop3 from "../commons/listTop3";

const Ranking = () => {
  const [ranking, setRanking] = React.useState([]);

  React.useEffect(() => {
    axios.get("/ranking").then((response) => {
      setRanking(response.data);
    });
  }, []);
  return (
    <div>
      <h1>Ranking</h1>

      {ranking.length > 0 ? (
        <ListTop3 top3={ranking.slice(0,3)}/>
      ) : (
        <p>No hay ranking disponible</p>
      )}
    </div>
  );
};

export default Ranking;
