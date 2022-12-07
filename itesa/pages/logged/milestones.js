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
