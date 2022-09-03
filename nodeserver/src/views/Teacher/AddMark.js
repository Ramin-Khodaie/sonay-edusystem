// Chakra imports
import {
  Flex,
  Box,
  Avatar,
  Text,
  Select,
  useColorMode,
  SimpleGrid,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import SliderWrapper from "components/SliderWrapper/SliderWrapper";
import CourseRecords from "components/CourseRecord/CourseRecords";
import React, { useEffect, useState, useRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import StudentRecords from "components/StudentRecord/StudentRecords";
import MarkForm from "components/Forms/markForm";
import { courseByTeacher } from "services/course";
import useNotify from "helpers/notify/useNotify";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";
import CustomSelector from "components/Selectors/CustomSelector";
import { studentByCourse } from "services/user";
function AddMark() {
  const notify = useNotify()
  const { colorMode } = useColorMode();

  const [selectedItems, setSelectedItems] = useState({
    "course" : {id:"",name:""},
    "student" : {id:"",name:""}
  });

  const [myCourses , setMyCourses] = useState([])
  const [myStudents , setmyStudents] = useState([])
  const getCourseList = async ()=>{
    const coursesList = await courseByTeacher();
    if(coursesList.status === 200){
      setMyCourses(coursesList.data.data)
    }

  }


  const getStudentList = async ()=>{
    
    const studentsList = await studentByCourse(selectedItems.course.id)
    if(studentsList.length > 0){
      setmyStudents(studentsList)
    }
  }

  useEffect(() => {
    getCourseList(); 
  }, []);

  useEffect(()=>{
    getStudentList()
    
  },[selectedItems.course])


  console.log(myStudents,87)
  return (
   
     <>
     
     <Box mt="60px"  px="55px" py="5"  w='100%'  dir='rtl'  >
      <SimpleGrid columns={2} >
      <CustomSelector
              onChange={setSelectedItems}
              data={myCourses}
              state={selectedItems}
              placeHolder={"انتخاب کنید"}
              fieldId={"course"}
              bg = {colorMode === "light" ? 'white' : "navy.700"}
            />
      </SimpleGrid>


        {/* <Select
   
          
          textAlign={"center"}
          bg={colorMode === "light" ? 'white' : "cyan.500"}
          placeholder="کلاس را انتخاب کنید"
          size="lg"
        /> */}
      </Box>

      <Flex flexDirection="column" mb="30 px"   h="100%" align={'center'}>
          <SliderWrapper>
        <StudentRecords data={myStudents} />
      </SliderWrapper>


      </Flex>

    

{/* 

      <MarkForm />
      */}
     
     </>

  );
}

export default AddMark;
