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
import { createCourse } from "services/course";

function CourseForm(props) {
  const { courses, statusData,callData,modalClose, courseId = "-1" } = props;

  const notify = useNotify();

  const currentCourse = useCourse(courseId);

  const [formData, setFormData] = React.useState({
    _id: "",
    courseName: "",
    courseStatus: {},
    prevCourse: {id : '' , name : ''},
    description: "",
    price: 0,
    image: "",
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
      prev_course: formData.prevCourse,
      description: formData.description,
      price: formData.price,
      image: formData.image,
    };
    // await dispatch(createCourseAction(newCourse));
    await createCourse(newCourse).then((res)=>{
      if(res.result==='not_unique'){
        notify("نام وارد شده تکراری می باشد", true, "solid", "error");
      }else if(res.result==='empty_field'){
        notify("لطفا تمامی فیلد هارا تکمیل کنید", true, "solid", "error");
      }else if(res.result==='ok'){
        notify("دوره با موفقیت افزوده شد", true, "solid", "success");
      }
    })
    await dispatch(courseListAction());
    callData()
    if(courseId !== "-1"){
      modalClose()
    }
     //we call it twice one is to update list and other update redux state
  };




  useEffect(() => {
    if (currentCourse.length != 0) {
      setFormData({
        ...formData,
        _id: currentCourse[0]._id,
        courseName: currentCourse[0].name,
        courseStatus: currentCourse[0].status,
        prevCourse: currentCourse[0].prev_course,
        description: currentCourse[0].description,
        price: currentCourse[0].price,
        image: currentCourse[0].image,
      });
    }
  }, [currentCourse]);


  const handleFileChange = (e) => {
    if (e.target.files) {
      setFormData({...formData , image : e.target.files[0]});
    }
  };
console.log(formData.image , 7575)
  return (
    <>
      <FormControl>
        <SimpleGrid
          style={{ direction: "rtl" }}
          columns={{ sm: 1, md: 3, xl: 3 }}
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
              <CustomSelector
                onChange={setFormData}
                state={formData}
                data={statusData}
                fieldId={"courseStatus"}
              />
            </Box>

            <Box minH="80px">
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                دوره قبلی{" "}
              </FormLabel>
              <CustomSelector
                onChange={setFormData}
                state={formData}
                data={courses}
                fieldId={"prevCourse"}
              />
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

              <NumberInput
                
                size={"lg"}
                dir="ltr"
                defaultValue={0}
                value={formData.price}
              >
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="ریال"
                />
                <NumberInputField onChange={handleChange}
                id="price"
                 textAlign={"center"} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>

            <Box>

              <input onChange={handleFileChange} type={'file'}></input>
            </Box>

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
