"use client";

import DashboardBoxes from "@/components/dashboard/DashboardBoxes";
import DashboardHeader from "@/components/projects/DashboardHeader";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React from "react";



const MainArea = () => {
  const router = useRouter();

  const handleShowProjects = () => {
    router.push("/dashboard/project");
  };


  return (
    <div className="w-full h-full space-y-6">
      <DashboardHeader onShowProjects={handleShowProjects} />
      <DashboardBoxes />
    </div>
  );
};

export default MainArea;


