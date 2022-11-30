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
import { userInfoAction } from "redux/user/UserInfo/UserInfoAction";
import NoMarkAlert from "components/Alert/noMarkAlert";
import MarkLimitAlert from "components/Alert/markLimitAlert";
import useNotify from "helpers/notify/useNotify";
import { getRedirectUrl } from "services/purchase";
import { Redirect, useHistory } from "react-router-dom";
import AuthorizeProvider from "helpers/authorize/AuthorizeProvider";
import NoNextCourseAlert from "components/Alert/NoNextCourseAlert";
const Registration = () => {
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    await dispatch(userInfoAction());
  };
  const { userInfo } = useSelector((state) => state.getUserInfo);
  const { cartItems } = useSelector((state) => state.order);

  const [myCourseHistory, setMyCourseHistory] = useState([]);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({
    id: "",
    name: "",
    state: "",
  });
  const [courseDetailData, setCourseDetailData] = useState({
    c_obj: [],
    t_obj: [],
    m_obj: [],
  });

  const [state, setState] = useState(undefined);
  const [error, setError] = useState(undefined);

  const getCourseHistoryData = async () => {
    const ch = await courseHistory(userInfo.courses[0].id);
    if (ch.status === 200) {
      if (ch.data.data.length > 0) {
        setMyCourseHistory(ch.data.data);
      }
    }else if(ch.status === 422){
      if(ch.data.detail.result === 'missing_next_course')
setError('missing_next_course')    }
  };

  const notify = useNotify();

  const getCourseDetail = async () => {
    if (selectedCourse.id !== "") {
      const cd = await courseDetail(
        selectedCourse.id,
        userInfo.username,
        selectedCourse.state
      );
      if (cd.status === 200) {
        if (cd.data.data.length > 0) {
          setState("allowed")
          setCourseDetailData(cd.data.data[0]);
        }
      } else if (
        cd.response.status === 422 &&
        cd.response.data.detail.result === "no_mark"
      ) {
        setState("noMark");
      } else if (
        cd.response.status === 422 &&
        cd.response.data.detail.result === "failed"
      ) {
        setState("PassMarkLimit");
      } else {
        
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
    getUserInfo();
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
  const getSum = () => {
    if (courseDetailData.c_obj.length > 0) {
      const sum = cartItems.reduce((acc, curr) => acc + curr.price, 0);
      return sum + Number(courseDetailData.c_obj[0].price);
    }
  };

  const handleSelectCourseHistory = (courseId, courseName, state) => {
    setSelectedCourse({ id: courseId, name: courseName, state: state });
  };

  const [link, setLink] = useState("");

  const registerCourse = async () => {
    setIsRedirecting(true)
    const res = await getRedirectUrl(
      courseDetailData.c_obj.length > 0 && courseDetailData.c_obj[0]._id,
      courseDetailData.c_obj.length > 0 && courseDetailData.c_obj[0].name,
      userInfo.username,
      getSum(),
      cartItems

    );

    if (res.data.data !== "") {
      // setRedirect(res.data.data)
      setIsRedirecting(false)


      window.location.replace(res.data.data);
    }

    // await dispatch(userInfoAction());
  };

  return (
    <AuthorizeProvider roles={["student"]}>
     {!error ?
      <Box mt="60px" py="5" w="100%" dir="rtl">
      <Flex flexDirection="column" mb="30px" h="100%" align={"center"}>
        <SliderWrapper>
          <CourseRegisterRecords
            handleSelectCourseHistory={handleSelectCourseHistory}
            data={myCourseHistory}
          />
        </SliderWrapper>
      </Flex>

      { state === "noMark" ? (
        <NoMarkAlert />
      ) :  state === "PassMarkLimit" ? (
        <MarkLimitAlert />
      ) :  state==='allowed'? (
        <RegistrationCard
          getSum={getSum}
          cartItems={cartItems}
          courseDetailData={courseDetailData}
          registerCourse={registerCourse}
          isRedirecting={isRedirecting}
        />

      ) : <></>}
    </Box>:
    
    
    <NoNextCourseAlert />
    
    
    
    }
    </AuthorizeProvider>
  );
};

export default Registration;
