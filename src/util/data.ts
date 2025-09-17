import DashboardIcon from "@mui/icons-material/Dashboard"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import ChatIcon from '@mui/icons-material/Chat';

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
        title: "Product Repository",
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
    title: "Account",
    href: "/dashboard/account",
    icon: ManageAccountsIcon,
  },
  
]
