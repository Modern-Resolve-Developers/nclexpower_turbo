import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import SourceIcon from '@mui/icons-material/Source';
import { NavigationType } from '../../types/navigation';




const AuthenticatedMenu: NavigationType[] = [
    {
        id: 1,
        label: "Dashboard",
        icon: <DashboardIcon color='primary' fontSize='small' />,
        children: [
            {
                id: 1,
                label: "Performance",
                path: "/",
            }
        ]
    },
    {
        id: 2,
        label: "Questionnaires",
        icon: <QuestionAnswerIcon color='primary' fontSize='small' />,
        children: [
            {
                id: 2,
                label: "Case Study",
                path: "/",

            },
            {
                id: 3,
                label: "Regular",
                path: "/",

            }
        ]
    },
    {
        id: 3,
        label: "Manage Exams",
        icon: <FeedIcon color='primary' fontSize='small' />,
        children: [
            {
                id: 4,
                label: "Create Exams",
                path: "/create",

            },
            {
                id: 5,
                label: "Manage Exams",
                path: "/",

            }
        ]
    },
    {
        id: 4,
        label: 'Results',
        path: "/",
        icon: <SourceIcon color='primary' fontSize='small' />
    },
    {
        id: 5,
        label: "Manage Users",
        path: "/",
        icon: <PersonIcon color='primary' fontSize='small' />,

    },
    {
        id: 6,
        label: "Settings",
        path: "/",
        icon: <SettingsIcon color='primary' />,
    },

    {
        id: 7,
        label: "Reports",
        path: "/",
        icon: <ReportIcon color='primary' />,
    },

]


const UnauthencatedMenu: NavigationType[] = [
    {
        id: 1,
        label: "Home",
        path: "/",
    },
    {
        id: 2,
        label: "About Us",
        path: "/",
    },
    {
        id: 3,
        label: "Contact Us",
        path: "/",
    },
    {
        id: 4,
        label: "Login",
        path: "/",
    }
]

export const mockMenus = (isAuthenticated: boolean) => {

    if (isAuthenticated) {
        return AuthenticatedMenu
    }

    return UnauthencatedMenu
};