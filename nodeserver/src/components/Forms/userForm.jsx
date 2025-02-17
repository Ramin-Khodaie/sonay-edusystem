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
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";
import MultiSelect from "components/MultiSelect/MultiSelect";

import useNotify from "helpers/notify/useNotify";
import { useUser } from "hooks/users/useUser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserAction } from "redux/user/userCreate/userCreateAction";
import { userListAction } from "redux/user/UserList/UserListAction";
import { useConfirmPassword } from "hooks/formValidation/useConfirmPassword";
import CustomSelector from "components/Selectors/CustomSelector";

function UserForm(props) {
  const { courses, userId = "-1" } = props;

  const currentUser = useUser(userId);
  const dispatch = useDispatch();
  const { isLoading, message, error } = useSelector(
    (state) => state.createuser
  );

  const notify = useNotify();
  const data = [
    { _id: "teacher", name: "دبیر" },
    { _id: "student", name: "دانش آموز" },
    { _id: "manager", name: "مدیر" },
  ];

  const [formData, setFormData] = React.useState({
    _id: "",
    username: "",
    full_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    course: "",
    roles: [],
  });

  const resetFormInputs = () => {
    setFormData({
      _id: "",
      username: "",
      full_name: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
      course: "",
      roles: [],
    });
  };
  const handleDelete = (id) => (e) => {
    const cc = formData.roles.filter((element) => {
      return element._id !== id;
    });
    setFormData({ ...formData, roles: cc });
  };
  const handleChange = (event) => {
    const field = event.target.id;
    const value = event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const doSubmit = async () => {
    const newUser = {
      _id: formData._id,
      username: formData.username,
      full_name: formData.full_name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      course: formData.course,
      roles: formData.roles,
    };
    await dispatch(createUserAction(newUser));
    await dispatch(userListAction());
 
  };

  function handleSubmitform() {
    doSubmit();
  }
  const { passMessage, passStatus } = useConfirmPassword(
    formData.password,
    formData.confirm_password
  );

  const handleOptionChange = (e) => {
    const newOpt = data.find((f) => f._id === e.target.value);
    formData.roles.findIndex((itm) => itm._id == newOpt._id) === -1
      ? setFormData({ ...formData, roles: [...formData.roles, {"id" : newOpt._id , "name" : newOpt.name}] })
      : notify("این آیتم قبلا انتخاب شده است", true, "solid", "warning");
  };

  // const handleCourseOptionChange = (e) => {
  //   const newOpt = courses.find((f) => f.id === e.target.value);
  //   setFormData({ ...formData, course: newOpt });
  // };

  useEffect(() => {
    if (message != "") {
      notify("کابر با موفقیت ثبت شد", true, "solid", "success");
    }
    if (error) {
      notify(error, true, "solid", "error");
    }
  }, [message, error]);
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
      <FormControl onSubmit={handleSubmitform}>
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
                <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
              </Flex>

              <Input
                disabled={userId === "-1" ? false : true}
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
              {/* <Select
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
              </Select> */}

              <CustomSelector
                onChange={setFormData}
                state={formData}
                data={courses}
                fieldId={"course"}
              />
            </Box>
          </Box>

          <Box>
            <Box minH="80px">
              <Flex>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  ایمیل{" "}
                </FormLabel>
                <Spacer />
                <Text
                  textAlign={"end"}
                  color={"red"}
                  fontWeight="medium"
                ></Text>
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
                  {passMessage}
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
                placeholder="نقش کاربر را انتخاب کنید"
              />
            </Box>
          </Box>
        </SimpleGrid>
        <Button
          onClick={handleSubmitform}
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
          {isLoading ? "در حال ثبت " : "ثبت "}
          {/* {true ? "در حال ثبت " : "ثبت "} */}
        </Button>
      </FormControl>
    </>
  );
}

export default UserForm;
