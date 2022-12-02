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
  Checkbox,
} from "@chakra-ui/react";

// Custom components
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";
import MultiSelect from "components/MultiSelect/MultiSelect";

import useNotify from "helpers/notify/useNotify";
import { useUser } from "hooks/users/useUser";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useConfirmPassword } from "hooks/formValidation/useConfirmPassword";
import { createUser } from "services/user";
import { useState } from "react";
import CustomSelector from "components/Selectors/CustomSelector";

function UserForm(props) {
  const { courses, userList, setUserList, onClose, userId = "-1" } = props;

  const currentUser = useUser(userId);
  const [isLoading, setIsLoading] = useState(false);

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
    role: {'id' : "" , 'name' : ""},
    isEnable: true,
    courses: [],
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
      role: {'name' : "" , 'id' : ""},
      courses: [],
    });
  };

  const handleChange = (event) => {
    const field = event.target.id;
    const value = event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const doSubmit = async () => {
    setIsLoading(true);
    const newUser = {
      _id: formData._id,
      username: formData.username,
      full_name: formData.full_name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      confirmPassword : formData.confirm_password,
      courses: formData.courses,
      role: formData.role,
      is_enable: formData.isEnable,
    };

    await createUser(newUser).then((res) => {
      switch (res.result) {
        case "ok":
          if(userId === '-1'){
            // insert mode
          setIsLoading(false);
          setUserList([ res.data,...userList]);
          notify("کابر با موفقیت ثبت شد", true, "solid", "success");

          break;
          }else{
            // edit mode
            setIsLoading(false);
            setUserList(userList.map((item , key)=>{
              return item.username === res.data.username ? res.data : item
            }))
            notify("کابر با موفقیت ویرایش شد", true, "solid", "success");
            onClose()

            break
          }
        case "empty_field":
          setIsLoading(false);

          notify("تمامی فیلدها تکمیل شوند", true, "solid", "error");
          break;
        case "not_unique":
          setIsLoading(false);
          notify("کاربر از قبل ثبت شده است", true, "solid", "error");
          break;
        case "wrong_course":
          setIsLoading(false);
          notify("دوره ای که انتخاب کردید برای دبیر دیگری تعریف شده است", true, "solid", "error");
          break;
        case "wrong_pass":
          notify("رمز وارد شده با تکرار آن مطابقت ندارد", true, "solid", "error");

      }
    });
  };

  function handleSubmitform() {
    doSubmit();
  }
  const { passMessage, passStatus } = useConfirmPassword(
    formData.password,
    formData.confirm_password
  );



  const handleOptionCourseChange = (e) => {
    const newOpt = courses.find((f) => f._id === e.target.value);
    formData.courses.findIndex((itm) => itm.id == newOpt._id) === -1
      ? setFormData({
          ...formData,
          courses: [...formData.courses, { id: newOpt._id, name: newOpt.name }],
        })
      : notify("این آیتم قبلا انتخاب شده است", true, "solid", "warning");
  };

  const handleOptionCourseDelete = (id) => (e) => {
    const cc = formData.courses.filter((element) => {
      return element.id !== id;
    });
    setFormData({ ...formData, courses: cc });
  };


  const handleChckBoxChange = ()=>{
    setFormData({...formData , isEnable: !formData.isEnable})
  }

  useEffect(() => {
    if (currentUser.length != 0) {
      setFormData({
        ...formData,
        _id: currentUser[0]._id,
        username: currentUser[0].username,
        full_name: currentUser[0].full_name,
        phone: currentUser[0].phone,
        email: currentUser[0].email,
        courses: currentUser[0].courses,
        role: currentUser[0].role,
        isEnable : currentUser[0].is_enable
      });
    }
  }, [currentUser]);

  const handleSinleOptionChange = (e) => {
    const tmp = e.target.value.split(",");

    setFormData({
      ...formData,
      courses: [
        {
          id: tmp.length < 2 ? "" : tmp[1],
          name: tmp.length < 2 ? "" : tmp[0],
        },
      ],
    });
  };


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
                نقش {" "}
              </FormLabel>
             


<CustomSelector
                onChange={setFormData}
                state={formData}
                data={data}
                fieldId={"role"}
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



            <Box pt={'35px'} minH="80px">

             

              <Checkbox onChange={handleChckBoxChange} isChecked={formData.isEnable}>آیا کاربر فعال هست؟</Checkbox>
            </Box>
          </Box>

          <Box>
        


            
            <Box minH="80px">
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                دوره{" "}
              </FormLabel>

              {formData.role.id == 'teacher' ? (
                <MultiSelect
                  handleChange={handleOptionCourseChange}
                  handleDelete={handleOptionCourseDelete}
                  data={courses}
                  options={formData.courses}
                  placeholder="دوره کاربر را انتخاب کنید"
                />
              ) : (
                <Select
                  focusBorderColor="purple.300"
                  textAlign={"center"}
                  placeholder={"دوره کاربر را انتخاب کنید"}
                  onChange={handleSinleOptionChange}
                >
                  {courses.map((d) => (
                    <option
                      selected={
                        formData.courses[0] && formData.courses[0].id === d._id
                          ? true
                          : false
                      }
                      value={[d.name, d._id]}
                    >
                      {d.name}
                    </option>
                  ))}
                </Select>
              )}
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
