import React from "react";
import { Outlet } from "react-router";
import DonorNavbar from "./DonorNavbar";
import PageMeta from "../common/PageMeta";
const Donor = () => {
  return (
    <>
    <PageMeta title="Donor | RaktConnect" />

      <DonorNavbar />
      <Outlet />
    </>
  );
};

export default Donor;