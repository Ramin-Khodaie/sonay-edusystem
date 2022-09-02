// Chakra imports
import {
  Flex,
  Box,
  Avatar,
  Text,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import SliderWrapper from "components/SliderWrapper/SliderWrapper";
import CourseRecords from "components/CourseRecord/CourseRecords";
import React, { useEffect, useState, useRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import StudentRecords from "components/StudentRecord/StudentRecords";
import MarkForm from "components/Forms/markForm";
function AddMark() {
  const { colorMode } = useColorMode();

  const [selectedCourse, setSelectedCourse] = useState(undefined);
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };
  const [selectedStudent, setSelectedStudent] = useState(undefined);
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  return (
   
     <>
     
     <Box mt="60px"  px="55px" py="5" w="100%"  dir="rtl">
        <Select
   
          w={{sm:"100%" , md :"50%" , lg : "40%"}}
          textAlign={"center"}
          bg={colorMode === "light" ? 'white' : "cyan.500"}
          placeholder="کلاس را انتخاب کنید"
          size="lg"
        />
      </Box>

      <Flex flexDirection="column" mb="30 px"   h="100%" align={'center'}>
          <SliderWrapper>
        <StudentRecords onSelectStudent={handleSelectStudent} />
      </SliderWrapper>


      </Flex>

    



      <MarkForm />
     
     
     </>

  );
}

export default AddMark;
