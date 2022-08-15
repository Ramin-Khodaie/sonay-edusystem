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

function CourseForm(props) {
  const { changeSent, sent, courses, userId = "-1" } = props;

  const currentUser = useUser(userId);

  const notify = useNotify();
  const status = [
    { id: "active", name: "فعال" },
    { id: "deactive", name: "غیرفعال" },
  ];

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

  function createPost() {
    changeSent({ sending: true });
    bixios
      .post("/courses/createcourse", {
        _id: formData._id,
        course_name: formData.courseName,
        status: formData.courseStatus,
        next_course: formData.nextCourse,
        image : formData.image
        
      })
      .then((response) => {
        {
          if (response.status === 200) {
            changeSent({ status: true });
            notify("دوره با موفقیت ثبت شد", true, "solid", "success");
          } else {
            changeSent({ sending: true });
          }
        }
      })
      .catch((e) => {
        if (
          e.response &&
          e.response.status === 422 &&
          e.response.data.detail.result === "missing_field"
        ) {
          changeSent({ status: true });
          notify("خطا در ثبت داده", true, "solid", "error");
        } else if (
          e.response &&
          e.response.status === 422 &&
          e.response.data.detail.result === "not_unique"
        ) {
          changeSent({ status: true });
          notify("این کاربر قبلا  ثبت نام کرده است", true, "solid", "error");
        } else if (
          e.response &&
          e.response.status === 422 &&
          e.response.data.detail.result === "empty_field"
        ) {
          changeSent({ status: true });
          notify("لطفا تمامی فیلد ها را تکمیل نمایید", true, "solid", "error");
        }
      });
  }

  const handleCourseOptionChange = (e) => {
    const newOpt = courses.find((f) => f.id === e.target.value);

    setFormData({ ...formData, nextCourse: newOpt });
  };

  const handleStatusOptionChange = (e) => {
    const newOpt = status.find((f) => f.id === e.target.value);

    setFormData({ ...formData, courseStatus: newOpt });
  };

  useEffect(() => {
    if (currentUser.length != 0) {
      setFormData({
        ...formData,
        _id: currentUser[0]._id,
        username: currentUser[0].username,
        full_name: currentUser[0].full_name,
        phone: currentUser[0].phone,
        email: currentUser[0].email,
        course: currentUser[0].course,
        roles: currentUser[0].roles,
      });
    }
  }, [currentUser]);

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
            <Select
              onChange={handleStatusOptionChange}
              id="courseStatus"
              focusBorderColor="purple.300"
              textAlign={"center"}
              placeholder="وضعیت دوره را انتخاب کنید"
            >
              {status.map((row) => {
                return (
                  <option
                    selected={
                      formData.courseStatus &&
                      formData.courseStatus.id === row.id
                        ? true
                        : false
                    }
                    value={row.id}
                    key={row.id}
                  >
                    {" "}
                    {row.name}
                  </option>
                );
              })}
            </Select>
          </Box>

          <Box minH="80px">
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              دوره بعدی{" "}
            </FormLabel>
            <Select
              onChange={handleCourseOptionChange}
              id="nextCourse"
              focusBorderColor="purple.300"
              textAlign={"center"}
              placeholder="دوره بعدی را انتخاب کنید"
            >
              {courses.map((row) => {
                return (
                  <option
                    selected={
                      formData.nextCourse && formData.nextCourse.id === row.id
                        ? true
                        : false
                    }
                    value={row.id}
                    key={row.id}
                  >
                    {" "}
                    {row.name}
                  </option>
                );
              })}
            </Select>
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
              {sent.sending ? "در حال ثبت " : "ثبت "}
            </Button>

         
          </Box>


          
    
        </SimpleGrid>

       
      </FormControl>
    </>
  );
}

export default CourseForm;
