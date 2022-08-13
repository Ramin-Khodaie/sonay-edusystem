// import
import React, { Component }  from 'react';
import Dashboard from "./views/Dashboard/Dashboard.js";
import Users from "./views/Dashboard/Users.js";
import Billing from "./views/Dashboard/Billing.js";
import RTLPage from "./views/RTL/RTLPage.js";
import Profile from "./views/Dashboard/Profile.js";
import SignIn from "./views/Pages/SignIn.js";
import SignUp from "./views/Pages/SignUp.js";
import { Icon } from '@chakra-ui/react'
import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "./components/Icons/Icons";
import {FaUserAlt} from "react-icons/fa"
var dashRoutes = [
  {
    path: "/dashboard",
    name: "داشبورد",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon/>,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "کاربران",
    rtlName: "لوحة القيادة",
    icon: <FaUserAlt></FaUserAlt> ,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Billing",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color='inherit' />,
    component: Billing,
    layout: "/admin",
  },
  {
    path: "/rtl-support-page",
    name: "RTL",
    rtlName: "آرتيإل",
    icon: <SupportIcon color='inherit' />,
    component: RTLPage,
    layout: "/rtl",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color='inherit' />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color='inherit' />,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
