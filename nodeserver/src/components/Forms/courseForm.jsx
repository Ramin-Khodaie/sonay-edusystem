// Chakra imports
import {
  SimpleGrid,
  Flex,
  Text,
  Box,
  FormControl,
  Input,
  FormLabel,
  Button,
  Select,
  Spacer,
} from "@chakra-ui/react";

// Custom components

import React from "react";
import MultiSelect from "components/MultiSelect/MultiSelect";


import useNotify from "helpers/notify/useNotify";
import { useUser } from "hooks/users/useUser";
import { useEffect } from "react";
import { bixios } from "services/main";
import { useDispatch, useSelector } from "react-redux";
import { createCourseAction } from "redux/course/createCource/createCourseAction";
import { courseListAction } from "redux/course/courseList/courseListAction";
import CustomSelector from "components/Selectors/CustomSelector";

function CourseForm(props) {
  const { changeSent, sent, courses,statusData, courseId = "-1" } = props;


  const notify = useNotify();




  const [formData, setFormData] = React.useState({
    _id: "",
    courseName: "",
    courseStatus: {},
    nextCourse: {},
    image : ""
    
  });

  
  const handleChange = (event) => {
    const field = event.target.id;
    const value = event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const dispatch = useDispatch();
  const { isLoading, message, error } = useSelector(
    (state) => state.createcourse
  );



  const createPost = async () => {
    const newCourse = {
      _id: formData._id,
      name: formData.courseName,
      status: formData.courseStatus,
      next_course: formData.nextCourse,
      image : formData.image
    };
    await dispatch(createCourseAction(newCourse));   
    await dispatch(courseListAction());   

  };


  // const handleCourseOptionChange = (e) => {
  //   const newOpt = courses.find((f) => f.id === e.target.value);

  //   setFormData({ ...formData, nextCourse: newOpt });
  // };

  const handleStatusOptionChange = (e) => {
    const newOpt = status.find((f) => f.id === e.target.value);

    setFormData({ ...formData, courseStatus: newOpt });
  };





  useEffect(() => {
    if (message != "") {
      notify("دوره با موفقیت ثبت شد", true, "solid", "success");
    }
    if (error) {
      notify(error, true, "solid", "error");
    }
  }, [message, error]);


  return (
    <>
      <FormControl>
        <SimpleGrid
          style={{ direction: "rtl" }}
          columns={{ sm: 1, md: 4, xl: 4 }}
          spacing="24px"
          mb="20px"
        >
          <Box minH="80px">
            <Flex>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                نام دوره
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <Input
              
              onChange={handleChange}
              focusBorderColor="purple.300"
              id="courseName"
              textAlign="right"
              variant="filled"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="نام دوره را وارد کنید"
              mb="10px"
              size="lg"
              value={formData.courseName}
            />
          </Box>

          <Box minH="80px">
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              وضعیت{" "}
            </FormLabel>
            <CustomSelector onChange={setFormData}
                state={formData}
                data={statusData}
                fieldId={"courseStatus"} />

           
          </Box>

          <Box minH="80px">
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              دوره بعدی{" "}
            </FormLabel>
            <CustomSelector onChange={setFormData}
                state={formData}
                data={courses}
                fieldId={"nextCourse"} />
          </Box>

          
          <Box minH="80px">

         

            <Button
              onClick={createPost}
              color={"white"}
              fontSize="20px"
              fontFamily="Lalezar"
              bg="blue.400"
              fontWeight="bold"
              mt={"25px"}
              h="45"
              w={"100%"}
              type={"submit"}
            >
              {isLoading ? "در حال ثبت " : "ثبت "}
            </Button>

         
          </Box>


          
    
        </SimpleGrid>

       
      </FormControl>
    </>
  );
}

export default CourseForm;
