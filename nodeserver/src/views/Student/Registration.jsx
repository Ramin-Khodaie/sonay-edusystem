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
import { useState  } from "react";
import { useEffect } from "react";
const Registration = () => {



  const [myCourseHistory , setMyCourseHistory] = useState([])
  const [selectedCourse , setSelectedCourse] = useState({'id' : '', 'name' : '' , 'state' : ''})
  const getCourseHistoryData = async () => {
    const courseHistoryData = await courseHistory();
    if (courseHistoryData.status === 200) {
      if (courseHistoryData.data.data.length > 0) {
        setMyCourseHistory(courseHistoryData.data.data);
        
      }
    }
  };

  useEffect(() => {
    getCourseHistoryData();
  }, []);

  const handleSelectCourseHistory = (courseId , courseName , state)=>{

    setSelectedCourse({'id' : courseId , 'name':courseName , 'state' : state})
  }


  return (
    <Box mt="60px" px="55px" py="5" w="100%" dir="rtl">
      <Flex flexDirection="column" mb="30px" h="100%" align={"center"}>
        <SliderWrapper>
          <CourseRegisterRecords handleSelectCourseHistory={handleSelectCourseHistory} data={myCourseHistory} />
        </SliderWrapper>
      </Flex>

      <RegistrationCard />


    </Box>
  );
};

export default Registration;
