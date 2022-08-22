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
    InputGroup,
    InputRightElement,
    InputLeftElement,   
    Spacer,
  } from "@chakra-ui/react";
  
  // Custom components
  import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
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
import { CheckIcon } from "@chakra-ui/icons";
  
  function ProductForm(props) {
  
    // const currentUser = useUser(userId);
    // const dispatch = useDispatch();
    // const { isLoading, message, error } = useSelector(
    //   (state) => state.createuser
    // );
  
    // const notify = useNotify();
    // const data = [
    //   { id: "teacher", name: "دبیر" },
    //   { id: "student", name: "دانش آموز" },
    //   { id: "manager", name: "مدیر" },
    // ];
  
    // const [formData, setFormData] = React.useState({
    //   _id: "",
    //   username: "",
    //   full_name: "",
    //   phone: "",
    //   email: "",
    //   password: "",
    //   confirm_password: "",
    //   course: "",
    //   roles: [],
    // });
  
    // const resetFormInputs = () => {
    //   setFormData({
    //     _id: "",
    //     username: "",
    //     full_name: "",
    //     phone: "",
    //     email: "",
    //     password: "",
    //     confirm_password: "",
    //     course: "",
    //     roles: [],
    //   });
    // };
    // const handleDelete = (id) => (e) => {
    //   const cc = formData.roles.filter((element) => {
    //     return element.id !== id;
    //   });
    //   setFormData({ ...formData, roles: cc });
    // };
    // const handleChange = (event) => {
    //   const field = event.target.id;
    //   const value = event.target.value;
    //   setFormData({ ...formData, [field]: value });
    // };
  
    // const doSubmit = async () => {
    //   const newUser = {
    //     _id: formData._id,
    //     username: formData.username,
    //     full_name: formData.full_name,
    //     phone: formData.phone,
    //     email: formData.email,
    //     password: formData.password,
    //     course: formData.course,
    //     roles: formData.roles,
    //   };
    //   await dispatch(createUserAction(newUser));   
    //   await dispatch(userListAction())
    //   resetFormInputs()
    // };
  
  
  
    // function handleSubmitform() {
    //   doSubmit();
    // }
    // const { passMessage, passStatus } = useConfirmPassword(
    //   formData.password,
    //   formData.confirm_password
    // );
  
  
  
    // const handleOptionChange = (e) => {
    //   const newOpt = data.find((f) => f.id === e.target.value);
    //   formData.roles.findIndex((itm) => itm.id == newOpt.id) === -1
    //     ? setFormData({ ...formData, roles: [...formData.roles, newOpt] })
    //     : notify("این آیتم قبلا انتخاب شده است", true, "solid", "warning");
    // };
  
    // const handleCourseOptionChange = (e) => {
    //   const newOpt = courses.find((f) => f.id === e.target.value);
    //   setFormData({ ...formData, course: newOpt });
    // };
  
    // useEffect(() => {
    //   if (message != "") {
    //     notify("کابر با موفقیت ثبت شد", true, "solid", "success");
    //   }
    //   if (error) {
    //     notify(error, true, "solid", "error");
    //   }
    // }, [message, error]);
    // useEffect(() => {
    //   if (currentUser.length != 0) {
    //     setFormData({
    //       ...formData,
    //       _id: currentUser[0]._id,
    //       username: currentUser[0].username,
    //       full_name: currentUser[0].full_name,
    //       phone: currentUser[0].phone,
    //       email: currentUser[0].email,
    //       course: currentUser[0].course,
    //       roles: currentUser[0].roles,
    //     });
    //   }
    // }, [currentUser]);
  
    return (
      <>
        <FormControl >
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
                    نام محصول
                  </FormLabel>
                  <Spacer />
                  <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
                </Flex>
  
                <Input
                 
                  focusBorderColor="purple.300"
                  textAlign="right"
                  variant="filled"
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="نام محصول را وارد کنید"
                  mb="10px"
                  size="lg"
     
                />


                
              </Box>



              <Box minH="80px">
                <Flex>
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    نام محصول
                  </FormLabel>
                  <Spacer />
                  <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
                </Flex>
  




              
  <InputGroup>
    <InputLeftElement
      pointerEvents='none'
      color='gray.300'
      fontSize='1.2em'
      children='$'
    />
    <Input placeholder='Enter amount' />
    <InputRightElement children={<CheckIcon color='green.500' />} />
  </InputGroup>
              

                
              </Box>







            </Box>
  
           
          </SimpleGrid>
          <Button
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

            ثبت
            {/* {isLoading ? "در حال ثبت " : "ثبت "} */}
          </Button>
        </FormControl>
      </>
    );
  }
  
  export default ProductForm;
  