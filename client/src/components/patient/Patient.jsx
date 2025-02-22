import React, { useState } from "react";
import { Outlet } from "react-router";
import PatientNavbar from "./PatientNavbar";

const Patient = () => {
  return (
    <>
      <PatientNavbar />
      <Outlet />
    </>
  );
};

export default Patient;
