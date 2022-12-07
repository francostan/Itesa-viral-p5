import React from "react";
import WalletCard from "../../components/WalletCard";
import Persistence from "../../components/Persistence";
import Reference from "../../components/Reference";
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