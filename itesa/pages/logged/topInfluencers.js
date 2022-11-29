import React from "react";
import Ranking from "../../components/Ranking";
import Persistence from "../../components/Persistence";
import { useSelector } from "react-redux";

const topInfluencers = () => {
  
  return (
    <div>
      <Persistence />
      <Ranking />
      
    </div>
  );
};

export default topInfluencers;