import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Text,
  Image,
  Divider,
  Avatar,
  useColorMode,
  Button,
  IconButton,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CourseRegisterRecords from "components/CourseRgistrationRecord/CourseRegisterRecords";
import SliderWrapper from "components/SliderWrapper/SliderWrapper";

import RegistrationCard from "components/RegistrationCard/RegistrationCard";
import { courseHistory } from "services/course";
import { useState } from "react";
import { useEffect } from "react";
import { courseDetail } from "services/course";
import { useSelector, useDispatch } from "react-redux";
import { registrationSuccess } from "services/course";
import { userInfoAction } from "redux/user/UserInfo/UserInfoAction";
import NoMarkAlert from "components/Alert/noMarkAlert";
import MarkLimitAlert from "components/Alert/markLimitAlert";
import useNotify from "helpers/notify/useNotify";
const Registration = () => {

  
  const dispatch = useDispatch();

  
  
  const getUserInfo = async () => {
    
    // await dispatch(userInfoAction());

  };
  const { userInfo } = useSelector((state) => state.getUserInfo);

  const [myCourseHistory, setMyCourseHistory] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({
    id: "",
    name: "",
    state: "",
  });
  const [courseDetailData, setCourseDetailData] = useState({});

  const [state , setState] = useState(undefined)

  const getCourseHistoryData = async () => {
    const ch = await courseHistory(userInfo.courses[0].id);
    if (ch.status === 200) {
      if (ch.data.data.length > 0) {
        setMyCourseHistory(ch.data.data);
      }
    }
  };

  const notify = useNotify()

  const getCourseDetail = async () => {
    if (selectedCourse.id !== "") {
      const cd = await courseDetail(selectedCourse.id , userInfo.username , selectedCourse.state);
      if (cd.status === 200) {

        if (cd.data.data.length > 0) {
                   

         setCourseDetailData(cd.data.data[0]);
        }
      }
      else if (cd.response.status === 422 && cd.response.data.detail.result === 'no_mark'){
        setState('noMark')
      }else if(cd.response.status === 422 && cd.response.data.detail.result === 'failed'){
        setState('PassMarkLimit')
      }else{
        
      }
    }
  };
  const handleSetDefaultCourse = () => {
    if (myCourseHistory != []) {
      const tmp = myCourseHistory.filter(function (item) {
        return item.state === "current";
      });
      if (tmp.length === 1) {
        setSelectedCourse({
          id: tmp[0].id,
          name: tmp[0].name,
          state: tmp[0].state,
        });
      }
    }
  };
  useEffect(() => {
    getUserInfo()
    
  }, []);


  useEffect(() => {
    getCourseHistoryData();

    
  }, [userInfo]);


  useEffect(() => {
    getCourseDetail();
  }, [selectedCourse]);

  useEffect(() => {
    handleSetDefaultCourse();
  }, [myCourseHistory]);


  const handleSelectCourseHistory = (courseId, courseName, state) => {
    setSelectedCourse({ id: courseId, name: courseName, state: state });
  };

  const registerCourse = async()=>{
    const res = await registrationSuccess( courseDetailData.c_obj && courseDetailData.c_obj[0]._id , userInfo.username )
    await dispatch(userInfoAction());
  }


  return (
    <Box mt="60px" px="55px" py="5" w="100%" dir="rtl">
      <Flex flexDirection="column" mb="30px" h="100%" align={"center"}>
        <SliderWrapper>
          <CourseRegisterRecords
            handleSelectCourseHistory={handleSelectCourseHistory}
            data={myCourseHistory}
          />
        </SliderWrapper>
      </Flex>


      {
        state && state === 'noMark' ? <NoMarkAlert /> :
        state === 'PassMarkLimit' ?  <MarkLimitAlert /> :
        <RegistrationCard courseDetailData={courseDetailData } registerCourse={registerCourse} />

      }

    </Box>
  );
};

export default Registration;
