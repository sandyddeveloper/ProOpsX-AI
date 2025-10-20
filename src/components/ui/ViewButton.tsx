"use client";
import { useRouter } from "next/navigation";
import { View } from "lucide-react";

interface Props {
  projectId: number;
  taskId: number;
}

const ViewButton: React.FC<Props> = ({ projectId, taskId }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/project/${projectId}/issue/${taskId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <View size={14} /> View
    </button>
  );
};

export default ViewButton;
