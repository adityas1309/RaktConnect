import React from "react";
import { Outlet } from "react-router";
import DonorNavbar from "./DonorNavbar";

const Donor = () => {
  return (
    <>
      <DonorNavbar />
      <Outlet />
    </>
  );
};

export default Donor;