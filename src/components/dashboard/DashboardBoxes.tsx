import React from 'react';
import Box from '../ui/Box';
import { 
  MdAssignmentAdd, 
  MdCheckCircle, 
  MdFolder, 
  MdPendingActions 
} from "react-icons/md";

const dashboardData = [
  {
    title: "Projects Assigned",
    count: "1,746",
    icon: <MdAssignmentAdd size={40} className="text-blue-500" />,
    progress: true,
  },
  {
    title: "Task's Completed",
    count: "1,232",
    icon: <MdCheckCircle size={40} className="text-green-500" />,
    progress: true,
  },
  {
    title: "Total Projects",
    count: "52",
    icon: <MdFolder size={40} className="text-purple-500" />,
    progress: false,
  },
  {
    title: "Pending Reviews",
    count: "14",
    icon: <MdPendingActions size={40} className="text-orange-500" />,
    progress: false,
  },
];

const DashboardBoxes = () => {
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
