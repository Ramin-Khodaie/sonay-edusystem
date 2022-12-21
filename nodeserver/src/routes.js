// import
import React, { Component }  from 'react';
import Dashboard from "./views/Pages/Dashboard.js";
import Users from "./views/Admin/Users.js";
import Courses from "./views/Admin/Courses.js";
import Billing from "./views/Admin/Billing.js";
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
import {FaUserAlt, FaRegistered, FaBook, FaPaperclip, FaTable, FaUsers, FaCartArrowDown, FaShoppingCart, FaClipboardCheck, FaTasks} from "react-icons/fa"
import Product from 'views/Admin/Products.js';
import AddMark from 'views/Teacher/AddMark.js';
import RecentOrder from 'views/Admin/AdminReport/RecentOrder.jsx';
import RecentRegistration from 'views/Admin/AdminReport/RecentRegistration.jsx';
import CourseDetail from 'views/Admin/AdminReport/CourseDetail.jsx';
import MyRecentOrder from 'views/Student/StudentReport/MyRecentOrder.jsx';
import MyRecentRegistration from 'views/Student/StudentReport/MyRecentRegistration.jsx';
import { IoExitOutline } from 'react-icons/io5';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { SiGoogleanalytics } from 'react-icons/si';
import { MdAnalytics } from 'react-icons/md';
import Transfer from 'views/Admin/Transfer.js';
var dashRoutes = [
  {
    path: "/dashboard",
    name: "داشبورد",
    rtlName: "لوحة القيادة",
    icon: <FaTable /> ,
    component: Dashboard,
    layout: "/sonay",
    roles:['admin' , 'teacher' , 'student'],
    show : true
  },
  {
    path: "/courses",
    name: "دوره ها",
    rtlName: "لوحة القيادة",
    icon: <FaUsers />,
    component: Courses,
    layout: "/sonay",
    roles:['admin' ],
    show : true

  },
  {
    path: "/users",
    name: "کاربران",
    rtlName: "لوحة القيادة",
    icon: <FaUserAlt /> ,
    component: Users,
    layout: "/sonay",
    roles:['admin' ],
    show : true

  },
  {
    path: "/products",
    name: "محصولات",
    rtlName: "لوحة القيادة",
    icon: <FaBook /> ,
    component: Product,
    layout: "/sonay",
    roles:['admin' ],
    show : true

  },
  {
    path: "/transfer",
    name: "انتقال",
    rtlName: "لوحة القيادة",
    icon: <FaBook /> ,
    component: Transfer,
    layout: "/sonay",
    roles:['admin' ],
    show : true

  },
  {
    path: "/managemark",
    name: "ورود نمره",
    rtlName: " نمرات",
    icon:<SiGoogleanalytics /> ,
    component: AddMark,
    layout: "/sonay",
    roles:[ 'teacher' ],
    show : true

  },
  
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   rtlName: "لوحة القيادة",
  //   icon: <CreditIcon color='inherit' />,
  //   component: Billing,
  //   layout: "/sonay",
  //   roles:['admin' ]

  // },
  {
    path: "/report",
    name: "کارنامه",
    rtlName: "کارنامه",
    icon: <SiGoogleanalytics />,
    component: Karne,
    layout: "/sonay",
    roles:['student'],
    show : true

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
    icon: <FaRegistered  />,
    component: Registration,
    layout: "/sonay",
    roles:[ 'student'],
    show : true

  },
  // {
  //   path: "/checkout",
  //   name: "سبد خرید",
  //   rtlName: "سبد خرید",
  //   icon: <FaShoppingCart />,
  //   component: Checkout,
  //   layout: "/sonay",
  //   roles:[ 'student'],
  //   show : true

  // },
  {
    path: "/recentorder",
    name: "سفارشات اخیر",
    rtlName: "لوحة القيادة",
    icon: <FaCartArrowDown /> ,
    secondaryNavbar: true,
    component: RecentOrder,
    layout: "/sonay",
    roles:['admin' ],
    show : true

  },
  {
    path: "/recentregistration",
    name: "ثبت نام های اخیر",
    rtlName: "لوحة القيادة",
    icon: <FaClipboardCheck />,
    secondaryNavbar: true,
    component: RecentRegistration,
    layout: "/sonay",
    roles:['admin'],
    show : true

  },
  
 
  {
    path: "/coursedetail",
    name: "گزارش کلاسی",
    rtlName: "لوحة القيادة",
    icon: <FaTasks />,
    secondaryNavbar: true,
    component: CourseDetail,
    layout: "/sonay",
    roles:['admin' ],
    show : true

  },
  {
    path: "/myrecentorder",
    name: "سفارشات اخیر من",
    rtlName: "لوحة القيادة",
    icon:  <FaCartArrowDown />,
    secondaryNavbar: true,
    component: MyRecentOrder,
    layout: "/sonay",
    roles:['student' ],
    show : true
  },
  {
    path: "/myrecentregistration",
    name: "ثبت نام های اخیر من",
    rtlName: "لوحة القيادة",
    icon:  <FaClipboardCheck />,
    secondaryNavbar: true,
    component: MyRecentRegistration,
    layout: "/sonay",
    roles:['student' ],
    show : true
  },

  {
    path: "/profile",
    name: "پروفایل من",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color='inherit' />,
    secondaryNavbar: true,
    component: Profile,
    layout: "/sonay",
    roles:['admin' , 'teacher' , 'student'],
    show : true

  },
  // {
  //   path: "/rtl-support-page",
  //   name: "RTL",
  //   rtlName: "آرتيإل",
  //   icon: <SupportIcon color='inherit' />,
  //   component: RTLPage,
  //   layout: "/rtl",
  //   roles:['student' ]
  // },
  {
    name: "کاربری من",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    roles:['admin' , 'teacher' , 'student'],  
    show:true,
    

    views: [
      
      {
        path: "/signin",
        name: "ورود",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color='inherit' />,
        component: SignIn,
        layout: "/auth",
        roles:['admin' , 'teacher' , 'student'],
        show : false

      },
      // {
      //   path: "/signup",
      //   name: "ثبت کاربری",
      //   rtlName: "لوحة القيادة",
      //   icon: <RocketIcon color='inherit' />,
      //   component: SignUp,
      //   layout: "/auth",
      //   roles:['admin' , 'teacher' , 'student']

      // },
      {
        path: "/logout",
        name: "خروج از حساب کاربری",
        rtlName: "لوحة القيادة",
        icon: <RiLogoutBoxRFill />,
        component: SignIn,
        layout: "/auth",
        roles:['admin' , 'teacher' , 'student'],
        show : true

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