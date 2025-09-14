import DashboardIcon from "@mui/icons-material/Dashboard"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"

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
        title: "Add Product",
        href: "/project",
      },
    ],
  },
  {
    title: "Account",
    href: "/account",
    icon: ManageAccountsIcon,
  },
]
