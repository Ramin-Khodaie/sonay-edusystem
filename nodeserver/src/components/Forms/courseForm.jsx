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
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Spacer,
  Textarea,
    NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
import { useCourse } from "hooks/courses/useCourse";
import { CheckIcon } from "@chakra-ui/icons";

function CourseForm(props) {
  const {courses,statusData, courseId = "-1" } = props;


  const notify = useNotify();


  const currentCourse = useCourse(courseId);
  console.log(currentCourse,courseId,45)


  const [formData, setFormData] = React.useState({
    _id: "",
    courseName: "",
    courseStatus: {},
    nextCourse: {},
    description : "",
    price : 0,
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
      description : formData.description,
      price : formData.price,
      image : formData.image
    };
    await dispatch(createCourseAction(newCourse));   
    await dispatch(courseListAction());   

  };


  // const handleCourseOptionChange = (e) => {
  //   const newOpt = courses.find((f) => f.id === e.target.value);

  //   setFormData({ ...formData, nextCourse: newOpt });
  // };




  useEffect(() => {
    if (message != "") {
      notify("دوره با موفقیت ثبت شد", true, "solid", "success");
    }
    if (error) {
      notify(error, true, "solid", "error");
    }
  }, [message, error]);

  useEffect(() => {
    if (currentCourse.length != 0) {
      setFormData({
        ...formData,
        _id: currentCourse[0]._id,
        courseName: currentCourse[0].name,
        courseStatus: currentCourse[0].status,
        nextCourse: currentCourse[0].next_course,
        description : currentCourse[0].description,
        price : currentCourse[0].price,
        image: currentCourse[0].image,

      });
    }
  }, [currentCourse]);

  return (
    <>
      <FormControl>
        <SimpleGrid
          style={{ direction: "rtl" }}
          columns={{ sm: 1, md: 3, xl:3 }}
          spacing="24px"
          mb="20px"
        >



        <Box>
          

          <Box minH="80px">
            <Flex>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                نام دوره
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <Input
            // disabled={courseId != "-1" ? true : false}
              
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

        </Box>


        <Box>
        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              توضیحات دوره{" "}
            </FormLabel>
        <Textarea
            resize={"none"}
            height={"220px"}
            placeholder="دوره را با چند جمله توصیف کنید"
            onChange={handleChange}
            id="description"
            value={formData.description}
          />
        </Box>


        <Box>
  
          <Box minH="80px">
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              هزینه دوره{" "}
            </FormLabel>
         
            <NumberInput size={"lg"} dir='ltr' defaultValue={0} >
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="ریال"
             
            />
  <NumberInputField textAlign={"center"} />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
           

         
          </Box>

          <Box>

          </Box >


<Box>

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
        </Box>

        



          
    
        </SimpleGrid>

       
      </FormControl>
    </>
  );
}

export default CourseForm;
