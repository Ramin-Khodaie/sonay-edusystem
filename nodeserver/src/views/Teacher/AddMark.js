// Chakra imports
import {
  Flex,
  Box,
  Avatar,
  Skeleton, SkeletonCircle, SkeletonText,
  Accordion,
  AccordionItem,
  Select,
  Stack,
  useColorMode,
  SimpleGrid,
  Center,
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
import { markBySearch } from "services/mark";
function AddMark() {
  const notify = useNotify();
  const { colorMode } = useColorMode();

  const [selectedItems, setSelectedItems] = useState({
    course: { id: "", name: "" },
    student: { id: "", name: "" },
  });

  const [filter, setFilter] = React.useState({
    name: "",
    courses: { id: "", name: "" },
    isFailed: false,
    isPassed:false,
    startDate : "",
    endDate:"",
    startMark:"",
    endMark:""
    

  });

  const [myCourses, setMyCourses] = useState([]);
  const [myStudents, setmyStudents] = useState([]);
  const [markList, setMarkList] = useState([]);
  const getCourseList = async () => {
    const coursesList = await courseByTeacher();
    if (coursesList.status === 200) {
      if (coursesList.data.data.length > 0) {
        setMyCourses(coursesList.data.data);
        setSelectedItems({
          ...selectedItems,
          course: {
            id: coursesList.data.data[0]._id,
            name: coursesList.data.data[0].name,
          },
        });
      }
    }
  };

  const handleCheckBoxChange = (event) => {
    const field = event.target.id;
    const value = event.target.checked;
    setFilter({ ...filter, [field]: value });
  };
  const handleFilterChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setFilter({ ...filter, [field]: value });
  };

  const getStudentList = async () => {
    const studentsList = await studentByCourse(selectedItems.course.id);
    if (studentsList.length > 0) {
      setmyStudents(studentsList);
    }
  };

  const getMarkList = async () => {
    const markListC = await markByTeacher("0");

    if (markListC.length > 0) {
      setMarkList(markListC);
    }
  };

  useEffect(() => {
    getCourseList();
    getMarkList();
  }, []);

  useEffect(() => {
    getStudentList();
  }, [selectedItems.course]);

  const handleStudentSelect = (_id, name) => {
    setSelectedItems({ ...selectedItems, student: { id: _id, name: name } });
  };


  
  const doSearch = async() => {
    console.log("pooooooooooop")
    const tmp = await markBySearch(filter)
    setMarkList(tmp)
  };


  useEffect(() => {
    setMarkList(markList);

    if (
      filter.name !== "" ||
      filter.isFailed ||
      filter.isPassed ||
      filter.courses.id !== "" ||
      filter.startDate !== "" ||
      filter.endDate !== "" ||
      filter.startMark !== "" ||
      filter.endMark !== ""
    ) {
      doSearch();
    }
  }, [filter]);

  const [slider , setSlider] = useState([0,100])

    const handleSliderChange = (v)=>{
      setSlider(v)
      setFilter({...filter , startMark : v[0] , endMark : v[1]})
  
    }

    const handleStartDateChange = (v)=>{
      setFilter({...filter , startDate : `${v.year}/${v.month}/${v.day}` })
  
    }

    const handleEndDateChange = (v)=>{
      setFilter({...filter , endDate : `${v.year}/${v.month}/${v.day}` })
  
    }



console.log(filter)
  return (
    <>
      <Box mt="60px" px="55px" py="5" w="100%" dir="rtl">
        <SimpleGrid columns={2}>
          <CustomSelector
            onChange={setSelectedItems}
            data={myCourses}
            state={selectedItems}
            placeHolder={"انتخاب کنید"}
            fieldId={"course"}
            bg={colorMode === "light" ? "white" : "navy.700"}
          />
        </SimpleGrid>

        {/* <Select
   
          
          textAlign={"center"}
          bg={colorMode === "light" ? 'white' : "cyan.500"}
          placeholder="کلاس را انتخاب کنید"
          size="lg"
        /> */}
      </Box>

      {selectedItems.course.id == "" ? (






<Flex borderRadius={'3rem'} bg='white'  mt={"25px"} mx={{sm:"25px" , md:"60px" , lg:"80px"}} mb={'55px'}  py={'20px'}>
  <Center w={{sm:"150px" , md:"200px" , lg:"250px"}} >
  <SkeletonCircle mx={{sm:"25px" , md:"60px" , lg:"80px"}}  size='81' />

   
  </Center>
  
  <Box flex='1' >
   
  <Stack mr={{sm:"25px" , md:"60px" , lg:"80px"}}>
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
</Stack>
  </Box>
</Flex>


      ) : (
        <Flex flexDirection="column" mb="30 px" h="100%" align={"center"}>
          <SliderWrapper>
            <StudentRecords
              data={myStudents}
              handleStudentSelect={handleStudentSelect}
              selectedItems={selectedItems}
            />
          </SliderWrapper>
        </Flex>
      )}

      <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Accordion allowToggle>
              <AccordionItem>
                <MarkListFilter
                  filter={filter}
                  onChange={handleFilterChange}
                  courses={myCourses}
                  selectChange={setFilter}
                  handleCheckBoxChange={handleCheckBoxChange}
                  handleSliderChange={handleSliderChange}
                  slider={slider}
                  handleStartDateChange={handleStartDateChange}
                  handleEndDateChange={handleEndDateChange}
                />
              </AccordionItem>
            </Accordion>
          </Flex>
        </CardHeader>

        <MarkListTable data={markList} />

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
