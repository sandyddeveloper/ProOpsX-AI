import DashboardIcon from '@mui/icons-material/Dashboard';
import { title } from 'process';

export const sideBarMenu = [
    {
        title: "Dashboard",
        href: "/dashboard", 
        icon: DashboardIcon
    },
    {
        title: "Dashboard",
        href: "/dashboard", 
        icon: DashboardIcon,
        items: [
            {
                title:"Item one",
                href:"/"
            },
            {
                title:"Item two",
                href:"/"
            },
        ]
    },
    {
        title: "Dashboard",
        href: "/dashboard", 
        icon: DashboardIcon
    },
    {
        title: "Dashboard",
        href: "/dashboard", 
        icon: DashboardIcon,
        items: [
            {
                title:"Item one",
                href:"/"
            },
            {
                title:"Item two",
                href:"/"
            },
        ]
    },
    {
        title: "Dashboard",
        href: "/dashboard", 
        icon: DashboardIcon
    },
    {
        title: "Dashboard",
        href: "/dashboard", 
        icon: DashboardIcon
    },
]