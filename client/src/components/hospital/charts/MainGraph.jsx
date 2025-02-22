import React from "react";
import Age from "./Age";
import Demand from "./Demand";
import Inventory from "./Inventory";

const MainGraph = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Inventory />
      <Demand />
      <Age />
    </div>
  );
};

export default MainGraph;
