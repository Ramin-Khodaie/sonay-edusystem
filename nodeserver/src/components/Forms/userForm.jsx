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
import { bixious } from "services/main";

import useNotify from "helpers/notify/useNotify";
import { useUser } from "hooks/users/useUser";
import { useEffect } from "react";

function UserForm(props) {
  const { changeSent, sent, mode = "save", userId = "-1" } = props;
  
  const currentUser = useUser(userId)




  const notify = useNotify();
  const data = [
    { id: "teacher", name: "دبیر" },
    { id: "student", name: "دانش آموز" },
    { id: "manager", name: "مدیر" },
  ];

  const courses = [
    { id: "1", name: "کلاس ۱" },
    { id: "2", name: "کلاس ۲" },
    { id: "3", name: "کلاس ۳" },
  ];

  const [formData, setFormData] = React.useState({
    username: "",
    full_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    course: "",
    roles: [],
  });

  const handleDelete = (id) => (e) => {
    const cc = formData.roles.filter((element) => {
      return element.id !== id;
    });
    setFormData({ ...formData, roles: cc });
  };

  function createPost() {
    changeSent({ sending: true });
    bixious
      .post("/users/createuser", {
        username: formData.username,
        full_name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        course: formData.course,
        roles: formData.roles,
      })
      .then((response) => {
        {
          response.status === 200
            ? changeSent({ status: true })
            : changeSent({ sending: true });
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

  // const { passMessage, passStatus } = useConfirmPassword(
  //   formData.password,
  //   formData.confirm_password
  // );


  // const {
  //   userMessage,
  //   userValid,
  //   emailMessage,
  //   emailValid,
  //   phoneMessage,
  //   phoneValid,
  // } = useConfirmUserEmailPhone(
  //   formData.username,
  //   formData.email,
  //   formData.phone
  // );
  const handleChange = (event) => {
    const field = event.target.id;
    const value = event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleOptionChange = (e) => {
    const newOpt = data.find((f) => f.id === e.target.value);
    console.log(newOpt,9595)

    formData.roles.findIndex((itm) => itm.id == newOpt.id) === -1
      ? setFormData({ ...formData, roles: [...formData.roles, newOpt] })
      : notify("این آیتم قبلا انتخاب شده است", true, "solid", "warning");
  };

  const handleCourseOptionChange = (e) => {
    const newOpt = courses.find((f) => f.id === e.target.value);

    setFormData({ ...formData, course: newOpt });
  };

  useEffect(()=>{
    if (currentUser.length != 0){
      setFormData({
        ...formData,
        username: currentUser[0].username ,
        full_name: currentUser[0].full_name ,
        phone: currentUser[0].phone ,
        email: currentUser[0].email ,
        course: currentUser[0].course ,
        roles: currentUser[0].roles ,
      });
    }

  },[currentUser])

  console.log(formData.roles , 7474)

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
                  نام کاربری
                </FormLabel>
                <Spacer />
                <Text textAlign={"end"} color={"red"} fontSize={"14px"}>
                </Text>
              </Flex>

              <Input
                onChange={handleChange}
                focusBorderColor="purple.300"
                id="username"
                textAlign="right"
                variant="filled"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="نام کاربری را وارد کنید"
                mb="10px"
                size="lg"
                value={formData.username}
              />
            </Box>
            <Box minH="80px">
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                نام و نام خانوادگی{" "}
              </FormLabel>
              <Input
                onChange={handleChange}
                focusBorderColor="purple.300"
                id="full_name"
                textAlign="right"
                variant="filled"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="نام و نام خانوادگی را وارد کنید"
                mb="10px"
                size="lg"
                value={formData.full_name}
              />
            </Box>

            <Box minH="80px">
              <Flex>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  شماره تماس{" "}
                </FormLabel>
                <Spacer />
                <Text textAlign={"end"} color={"red"} fontSize={"14px"}>
                  {}
                </Text>
              </Flex>

              <Input
                onChange={handleChange}
                focusBorderColor="purple.300"
                id="phone"
                textAlign="right"
                variant="filled"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder=" شماره تماس را وارد کنید"
                mb="10px"
                size="lg"
                value={formData.phone}
              />
            </Box>

            <Box minH="80px">
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                دوره{" "}
              </FormLabel>
              <Select
                onChange={handleCourseOptionChange}
                id="course"
                focusBorderColor="purple.300"
                textAlign={"center"}
                placeholder="دوره کاربر را انتخاب کنید"
              >
                {courses.map((row) => {
                  return (
                    <option
                      selected={
                        formData.course && formData.course.id === row.id
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
          </Box>

          <Box>
            <Box minH="80px">
              <Flex>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  ایمیل{" "}
                </FormLabel>
                <Spacer />
                <Text textAlign={"end"} color={"red"} fontWeight="medium">
                </Text>
              </Flex>
              <Input
                onChange={handleChange}
                focusBorderColor="purple.300"
                id="email"
                textAlign="right"
                variant="filled"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="‌ایمیل را وارد کنید"
                mb="10px"
                size="lg"
                value={formData.email}
              />
            </Box>
            <Box minH="80px">
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                رمز عبور{" "}
              </FormLabel>

              <Input
                onChange={handleChange}
                focusBorderColor="purple.300"
                id="password"
                textAlign="right"
                variant="filled"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="رمز عبور را وارد کنید"
                mb="10px"
                size="lg"
              />
            </Box>
            <Box minH="80px">
              <Flex>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  تکرار رمز عبور{" "}
                </FormLabel>
                <Spacer />

                <Text textAlign={"end"} color={"red"} fontWeight="medium">
                </Text>
              </Flex>
              <Input
                onChange={handleChange}
                focusBorderColor="purple.300"
                id="confirm_password"
                textAlign="right"
                variant="filled"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="تکرار رمز را وارد کنید"
                mb="10px"
                size="lg"
              />
            </Box>
          </Box>

          <Box>
            <Box minH="80px">
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                نقش ها{" "}
              </FormLabel>
              <MultiSelect
                handleChange={handleOptionChange}
                handleDelete={handleDelete}
                data={data}
                options={formData.roles}
              />
            </Box>
          </Box>
        </SimpleGrid>
        <Button
          onClick={createPost}
          color={"white"}
          fontSize="20px"
          fontFamily="Lalezar"
          bg="blue.400"
          fontWeight="bold"
          h="45"
          w={{ sm: "100%", md: "15%", lg: "15%" }}
          mb={"20px"}
          type={"submit"}
        >
          {sent.sending ? "در حال ثبت " : "ثبت "}
        </Button>
      </FormControl>
    </>
  );
}

export default UserForm;
