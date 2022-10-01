import { useState } from "react";
import { useEffect } from "react";
import { getTeacherCounts } from "services/dashboard";
import TecherCounts from "./TeacherCounts";

const TeacherDashboard = () => {

  const [st,setSt] = useState(0)
  const [cr,setCr] = useState(0)
  const [courseDetail,setCourseDetail] = useState([])



const callData = async()=>{
  await getTeacherCounts().then((res)=>{
    console.log(res,8787)

    
    setSt(res.data.data.st)
    setCr(res.data.data.cr)
    setCourseDetail(res.data.data.data)

  })
}

  useEffect(()=>{
callData()
  },[])


console.log(st,cr,courseDetail , 6565)
  

  return (
    <>
    <TecherCounts />

    </>
  );
};

export default TeacherDashboard;

