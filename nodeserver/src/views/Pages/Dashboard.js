
import AdminDashboard from "components/Dashboard/AdminDashboard/AdminDashboard";
import StudentDashoard from "components/Dashboard/StudentDashboard/StudentDashboard";
import TeacherDashboard from "components/Dashboard/TeacherDashboard/TeacherDashboard";
import AuthorizeProvider from "helpers/authorize/AuthorizeProvider";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoAction } from "redux/user/UserInfo/UserInfoAction";


export default function Dashboard() {
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    await dispatch(userInfoAction());
  };

  const { userInfo } = useSelector((state) => state.getUserInfo);

  useEffect(() => {
    getUserInfo();
  }, []);


  return (
    <AuthorizeProvider roles={[]}>
     {/* <AdminDashboard /> */}
     {/* <StudentDashoard user={userInfo}/> */}
     <TeacherDashboard />
    </AuthorizeProvider>
  );
}
