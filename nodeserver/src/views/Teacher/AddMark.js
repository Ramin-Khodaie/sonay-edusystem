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
function AddMark() {
  const notify = useNotify()
  const { colorMode } = useColorMode();

  const [selectedItems, setSelectedItems] = useState({
    "course" : {id:"",name:""},
    "student" : {id:"",name:""}
  });

  const [myCourses , setMyCourses] = useState([])
  const getList = async ()=>{
    const res = await courseByTeacher();
  
    if(res.status === 200){

     


      setMyCourses(res.data.data)

    }else{
      // notify("خطا در بارگذاری اطلاعات" , true , "solid" , "error")
    }
  }

  useEffect(() => {
    getList();
    
  }, []);
  console.log(65,myCourses)
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
              bg = {colorMode === "light" ? 'white' : "cyan.500"}
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
        <StudentRecords />
      </SliderWrapper>


      </Flex>

    



      <MarkForm />
     
     
     </>

  );
}

export default AddMark;
