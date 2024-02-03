/** @format */

import React from "react";

import DashboardAdmin from "../../components/dashboard/DashAdmin";
import dynamic from "next/dynamic";

const Admin = dynamic(() => import("../../components/dashboard/DashAdmin"), {
  ssr: false,
});
function admin() {
  return (
    <>
      <Admin />
    </>
  );
}

export default admin;
