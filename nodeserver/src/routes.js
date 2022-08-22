// import
import React, { Component }  from 'react';
import Dashboard from "./views/Admin/Dashboard.js";
import Users from "./views/Admin/Users.js";
import Courses from "./views/Admin/Courses.js";
import Billing from "./views/Admin/Billing.js";
import RTLPage from "./views/RTL/RTLPage.js";
import Profile from "./views/Admin/Profile.js";
import SignIn from "./views/Pages/SignIn.js";
import SignUp from "./views/Pages/SignUp.js";
import Books from 'views/Student/Books.js';
import Registration from 'views/Student/Registration.js';
import Karne from 'views/Student/Karne.js';

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "./components/Icons/Icons";
import {FaUserAlt, FaRegistered, FaBook, FaPaperclip} from "react-icons/fa"
import Product from 'views/Admin/Product.js';
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
    path: "/courses",
    name: "دوره ها",
    rtlName: "لوحة القيادة",
    icon: <FaUserAlt></FaUserAlt> ,
    component: Courses,
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
    path: "/products",
    name: "محصولات",
    rtlName: "لوحة القيادة",
    icon: <FaBook /> ,
    component: Product,
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
    path: "/karne",
    name: "karne",
    rtlName: "کارنامه",
    icon: <FaPaperclip color='inherit' />,
    component: Karne,
    layout: "/student",
  },
  {
    path: "/books",
    name: "book",
    rtlName: "کتاب",
    icon: <FaBook color='inherit' />,
    component: Books,
    layout: "/student",
  },
  {
    path: "/register",
    name: "registration",
    rtlName: "ثبت نام",
    icon: <FaRegistered color='inherit' />,
    component: Registration,
    layout: "/student",
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

export const getActiveRoute = (routes) => {
  let activeRoute = "Default Brand Text";
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].collapse) {
      let collapseActiveRoute = getActiveRoute(routes[i].views);
      if (collapseActiveRoute !== activeRoute) {
        return collapseActiveRoute;
      }
    } else if (routes[i].category) {
      let categoryActiveRoute = getActiveRoute(routes[i].views);
      if (categoryActiveRoute !== activeRoute) {
        return categoryActiveRoute;
      }
    } else {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
  }
  return activeRoute;
};

export const getActiveNavbar = (routes) => {
  let activeNavbar = false;
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].category) {
      let categoryActiveNavbar = getActiveNavbar(routes[i].views);
      if (categoryActiveNavbar !== activeNavbar) {
        return categoryActiveNavbar;
      }
    } else {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        if (routes[i].secondaryNavbar) {
          return routes[i].secondaryNavbar;
        }
      }
    }
  }
  return activeNavbar;
};