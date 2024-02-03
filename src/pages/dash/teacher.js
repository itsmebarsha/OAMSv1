/** @format */

import DashboardTeacher from "@/components/dashboard/DashTeacher";
import dynamic from "next/dynamic";
import React from "react";
const Teacher = dynamic(
  () => import("../../components/dashboard/DashTeacher"),
  {
    ssr: false,
  }
);
function teacher() {
  return <Teacher />;
}

export default teacher;
