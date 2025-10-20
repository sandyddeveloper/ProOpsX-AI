"use client";
import React, { useEffect, useState } from "react";
import Box from "../ui/Box";
import {
  MdAssignmentAdd,
  MdCheckCircle,
  MdFolder,
  MdPendingActions,
} from "react-icons/md";
import axios from "axios";
import { motion } from "framer-motion";

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
    // 🧩 Skeleton Loading Effect
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="animate-pulse bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 h-[160px] rounded-2xl shadow-sm"
          >
            <div className="p-4">
              <div className="w-2/3 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
              <div className="w-1/2 h-8 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const dashboardData = [
    {
      title: "Total Repositories",
      count: projectCount ?? 0,
      icon: <MdFolder size={36} />,
      progress: true,
      percentage: 14.6,
      tag: "Active",
    },
    {
      title: "Projects Assigned",
      count: 12,
      icon: <MdAssignmentAdd size={36} />,
      progress: true,
      percentage: 8.4,
      tag: "Ongoing",
    },
    {
      title: "Tasks Completed",
      count: 234,
      icon: <MdCheckCircle size={36} />,
      progress: true,
      percentage: 32.1,
      tag: "Completed",
    },
    {
      title: "Pending Reviews",
      count: 5,
      icon: <MdPendingActions size={36} />,
      progress: false,
      percentage: -6.3,
      tag: "Pending",
    },
  ];

  return (
    <section className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {dashboardData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex-1"
          >
            <Box
              title={item.title}
              count={item.count}
              icon={item.icon}
              progress={item.progress}
              percentage={item.percentage}
              tag={item.tag}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DashboardBoxes;
