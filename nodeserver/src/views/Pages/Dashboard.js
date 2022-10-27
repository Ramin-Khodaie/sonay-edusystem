import AdminDashboard from "components/Dashboard/AdminDashboard/AdminDashboard";
import StudentDashoard from "components/Dashboard/StudentDashboard/StudentDashboard";
import TeacherDashboard from "components/Dashboard/TeacherDashboard/TeacherDashboard";
import AuthorizeProvider from "helpers/authorize/AuthorizeProvider";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseListAction } from "redux/course/courseList/courseListAction";
import { userInfoAction } from "redux/user/UserInfo/UserInfoAction";

export default function Dashboard() {


  const { userInfo } = useSelector((state) => state.getUserInfo);
  const dispatch = useDispatch();

  const callStoredData = async () => {
    await dispatch(courseListAction());
  };
  useEffect(()=>{
    callStoredData()
  },[])


  return (
    <AuthorizeProvider roles={["admin", "student", "teacher"]}>
      {userInfo.role.id === "admin" ? (
        <AdminDashboard />
      ) : userInfo.role.id === "teacher" ? (
        <TeacherDashboard />
      ) : userInfo.role.id === "student" ? (
        <StudentDashoard user={userInfo} />
      ) : (
        <></>
      )}
    </AuthorizeProvider>
  );
}
