// import
import React, { Component }  from 'react';
import Dashboard from "./views/Pages/Dashboard.js";
import Users from "./views/Admin/Users.js";
import Courses from "./views/Admin/Courses.js";
import Billing from "./views/Admin/Billing.js";
import RTLPage from "./views/RTL/RTLPage.js";
import Profile from "./views/Admin/Profile.js";
import SignIn from "./views/Pages/SignIn.js";
import SignUp from "./views/Pages/SignUp.js";
import Products from 'views/Student/Products.jsx';
import Registration from './views/Student/Registration.jsx';
import Karne from 'views/Student/Karne.jsx';
import Checkout from 'views/Student/Checkouts'

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
import Product from 'views/Admin/Products.js';
import AddMark from 'views/Teacher/AddMark.js';
import RecentOrder from 'views/Admin/AdminReport/RecentOrder.jsx';
import RecentRegistration from 'views/Admin/AdminReport/RecentRegistration.jsx';
import CourseDetail from 'views/Admin/AdminReport/CourseDetail.jsx';
import MyRecentOrder from 'views/Student/StudentReport/MyRecentOrder.jsx';
import MyRecentRegistration from 'views/Student/StudentReport/MyRecentRegistration.jsx';
var dashRoutes = [
  {
    path: "/dashboard",
    name: "داشبورد",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon/>,
    component: Dashboard,
    layout: "/sonay",
    roles:['admin' , 'teacher' , 'student']
  },
  {
    path: "/courses",
    name: "دوره ها",
    rtlName: "لوحة القيادة",
    icon: <FaUserAlt></FaUserAlt> ,
    component: Courses,
    layout: "/sonay",
    roles:['admin' ]

  },
  {
    path: "/users",
    name: "کاربران",
    rtlName: "لوحة القيادة",
    icon: <FaUserAlt></FaUserAlt> ,
    component: Users,
    layout: "/sonay",
    roles:['admin' ]

  },
  {
    path: "/products",
    name: "محصولات",
    rtlName: "لوحة القيادة",
    icon: <FaBook /> ,
    component: Product,
    layout: "/sonay",
    roles:['admin' ]

  },
  {
    path: "/managemark",
    name: "نمرات",
    rtlName: " نمرات",
    icon: <FaRegistered color='inherit' />,
    component: AddMark,
    layout: "/sonay",
    roles:[ 'teacher']

  },
  
  {
    path: "/billing",
    name: "Billing",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color='inherit' />,
    component: Billing,
    layout: "/sonay",
    roles:['admin' ]

  },
  {
    path: "/karne",
    name: "کارنامه",
    rtlName: "کارنامه",
    icon: <FaPaperclip color='inherit' />,
    component: Karne,
    layout: "/sonay",
    roles:['student']

  },
  // {
  //   path: "/books",
  //   name: "book",
  //   rtlName: "کتاب",
  //   icon: <FaBook color='inherit' />,
  //   component: Products,
  //   layout: "/student",
  //   roles:['student']

  // },
  {
    path: "/register",
    name: "ثبت نام",
    rtlName: "ثبت نام",
    icon: <FaRegistered color='inherit' />,
    component: Registration,
    layout: "/sonay",
    roles:[ 'student']

  },
  {
    path: "/checkout",
    name: "سبد خرید",
    rtlName: "سبد خرید",
    icon: <FaBook color='inherit' />,
    component: Checkout,
    layout: "/sonay",
    roles:[ 'student']

  },
  {
    path: "/recentorder",
    name: "سفارشات اخیر",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color='inherit' />,
    secondaryNavbar: true,
    component: RecentOrder,
    layout: "/sonay",
    roles:['admin' ]

  },
  {
    path: "/recentregistration",
    name: "ثبت نام های اخیر",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color='inherit' />,
    secondaryNavbar: true,
    component: RecentRegistration,
    layout: "/sonay",
    roles:['admin']

  },
  
 
  {
    path: "/coursedetail",
    name: "گزارش کلاسی",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color='inherit' />,
    secondaryNavbar: true,
    component: CourseDetail,
    layout: "/sonay",
    roles:['admin' ]

  },
  {
    path: "/myrecentorder",
    name: "سفارشات اخیر من",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color='inherit' />,
    secondaryNavbar: true,
    component: MyRecentOrder,
    layout: "/sonay",
    roles:['student' ]
  },
  {
    path: "/myrecentregistration",
    name: "ثبت نام های اخیر من",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color='inherit' />,
    secondaryNavbar: true,
    component: MyRecentRegistration,
    layout: "/sonay",
    roles:['student' ]
  },
  {
    path: "/rtl-support-page",
    name: "RTL",
    rtlName: "آرتيإل",
    icon: <SupportIcon color='inherit' />,
    component: RTLPage,
    layout: "/rtl",
    roles:['student' ]
  },
  {
    name: "کاربری من",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    roles:['admin' , 'teacher' , 'student'],  
    

    views: [
      {
        path: "/profile",
        name: "پروفایل من",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/sonay",
        roles:['admin' , 'teacher' , 'student']

      },
      {
        path: "/signin",
        name: "ورود",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color='inherit' />,
        component: SignIn,
        layout: "/auth",
        roles:['admin' , 'teacher' , 'student']

      },
      {
        path: "/signup",
        name: "ثبت کاربری",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color='inherit' />,
        component: SignUp,
        layout: "/auth",
        roles:['admin' , 'teacher' , 'student']

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