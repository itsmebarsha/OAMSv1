/** @format */

import DashboardStudent from "@/components/dashboard/DashStudent";
import dynamic from "next/dynamic";
import React from "react";
const Student = dynamic(
  () => import("../../components/dashboard/DashStudent"),
  {
    ssr: false,
  }
);
function student() {
  return <Student />;
}

export default student;
