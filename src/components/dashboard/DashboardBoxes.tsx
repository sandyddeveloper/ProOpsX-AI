import React, { useEffect, useState } from "react";
import Box from "../ui/Box";
import {
  MdAssignmentAdd,
  MdCheckCircle,
  MdFolder,
  MdPendingActions,
} from "react-icons/md";
import axios from "axios";

const DashboardBoxes = () => {
  const [projectCount, setProjectCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectCount = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/projects/count", {
          withCredentials: true,
        });
        setProjectCount(res.data);
      } catch (error) {
        console.error("Failed to fetch project count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectCount();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow text-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const dashboardData = [
    {
      title: "Total Repository",
      count: projectCount ?? 0,
      icon: <MdFolder size={40} className="text-purple-500" />,
      progress: false,
    },
    {
      title: "Projects Assigned",
      count: 12,
      icon: <MdAssignmentAdd size={40} className="text-blue-500" />,
      progress: true,
    },
    {
      title: "Tasks Completed",
      count: 234,
      icon: <MdCheckCircle size={40} className="text-green-500" />,
      progress: true,
    },
    {
      title: "Pending Reviews",
      count: 5,
      icon: <MdPendingActions size={40} className="text-orange-500" />,
      progress: false,
    },
  ];

  return (
    <div className="w-full h-auto">
      <div className="flex flex-wrap gap-4 justify-between">
        {dashboardData.map((item, index) => (
          <div key={index} className="flex-1 min-w-[220px]">
            <Box
              title={item.title}
              count={item.count}
              icon={item.icon}
              progress={item.progress}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardBoxes;
