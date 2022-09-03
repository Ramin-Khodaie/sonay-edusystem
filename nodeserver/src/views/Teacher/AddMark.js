// Chakra imports
import {
  Flex,
  Box,
  Avatar,
  Text,
  
  
  Accordion,
  AccordionItem,
  Select,
  useColorMode,
  SimpleGrid,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

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
import MarkListFilter from "components/Filter/MarkFilter";
import { markByTeacher } from "services/mark";
import MarkListTable from "components/Tables/MarkListTable/MarkListTable";
function AddMark() {
  const notify = useNotify()
  const { colorMode } = useColorMode();

  const [selectedItems, setSelectedItems] = useState({
    "course" : {id:"",name:""},
    "student" : {id:"",name:""}
  });
  

  const [filter, setFilter] = React.useState({
    name: "",
    courses: { id: "", name: "" },
    isFailed: false,

  });

  const [myCourses , setMyCourses] = useState([])
  const [myStudents , setmyStudents] = useState([])
  const [markList , setMarkList] = useState([])
  const getCourseList = async ()=>{
    const coursesList = await courseByTeacher();
    if(coursesList.status === 200){
      setMyCourses(coursesList.data.data)
    }

  }

  const handleCheckBoxChange = (event) => {
    const field = event.target.id;
    const value = event.target.checked;
    setFilter({ ...filter, [field]: value });
  };
  const handleChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setFilter({ ...filter, [field]: value });
  };

  const getStudentList = async ()=>{
    
    const studentsList = await studentByCourse(selectedItems.course.id)
    if(studentsList.length > 0){
      setmyStudents(studentsList)
    }
  }


  const getMarkList = async()=>{
    const markListC = await markByTeacher("0")

    if(markListC.length > 0){
      setMarkList(markListC)
    }
  }

  useEffect(() => {
    getCourseList(); 
    getMarkList()
  }, []);

  useEffect(()=>{
    getStudentList()

    
  },[selectedItems.course])


  const handleStudentSelect = (_id , name)=>{

    setSelectedItems({...selectedItems , student : {"id" : _id , "name" : name}})


  }
console.log(4444, selectedItems);

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
        <StudentRecords data={myStudents} handleStudentSelect={handleStudentSelect} />
      </SliderWrapper>


      </Flex>

      <MarkForm selectedCourse={selectedItems.course} selectedStudent={selectedItems.student} />




<Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Accordion allowToggle>
              <AccordionItem>
               
<MarkListFilter filter={filter}
                  onChange={handleChange}
                  courses={myCourses}
                  selectChange={setFilter}
                  handleCheckBoxChange={handleCheckBoxChange}
                 />


              </AccordionItem>
            </Accordion>
          </Flex>
        </CardHeader>

        <MarkListTable data={markList}/>

        {/* {isPending ? (
            <UserListSkleton />
          ) : (
            <ProductListTable data={productList} courses={courseList} />
          )} */}
      </Card>
     
     </>

  );
}

export default AddMark;
