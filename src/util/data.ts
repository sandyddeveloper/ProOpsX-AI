import DashboardIcon from "@mui/icons-material/Dashboard"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import ChatIcon from '@mui/icons-material/Chat';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';

export const sideBarMenu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Project",
    icon: CreateNewFolderIcon,
    items: [
      {
        title: "Project Repository",
        href: "/dashboard/project",
      },
      {
        title: "Create Repository",
        href: "/dashboard/project/add",
      },
    ],
  },
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: ChatIcon,
  },
  {
    title: "ShortCuts",
    href: "/dashboard/shortcut",
    icon: AddToDriveIcon,
  },
  {
    title: "Account",
    href: "/dashboard/account",
    icon: ManageAccountsIcon,
  },
  
]


// data.ts
export const sampleIssue = {
  title: "Create Navbar",
  description: "Implement a responsive navbar with dropdowns and animations.",
  assignee: "TxSandy",
  labels: ["UI", "Frontend"],
  status: "In Progress",
  releaseDate: "2025-09-30",
  reporter: "Harini",
};

export const sampleComments = [
  { id: 1, author: "TxSandy", text: "How much work is pending?" },
  { id: 2, author: "Harini", text: "We need to finalize the design." },
];


export const historyStates = [
  {
    id: 1,
    type: "created",
    message: "Issue was created by Alice",
    date: "2025-09-20 10:15 AM",
  },
  {
    id: 2,
    type: "status",
    message: "Status changed from 'To Do' to 'In Progress'",
    date: "2025-09-21 09:30 AM",
  },
  {
    id: 3,
    type: "comment",
    message: "Bob commented: 'Need clarification on requirements.'",
    date: "2025-09-21 11:45 AM",
  },
  {
    id: 4,
    type: "updated",
    message: "Description updated to include more details",
    date: "2025-09-22 02:20 PM",
  },
  {
    id: 5,
    type: "deleted",
    message: "Removed outdated attachment",
    date: "2025-09-23 04:10 PM",
  },
];
