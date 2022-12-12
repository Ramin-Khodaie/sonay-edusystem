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
    
    InputLeftElement,
  
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
  
  import useNotify from "helpers/notify/useNotify";
  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { courseListAction } from "redux/course/courseList/courseListAction";
  import CustomSelector from "components/Selectors/CustomSelector";
  import { useCourse } from "hooks/courses/useCourse";
  import { createCourse } from "services/course";
import { useState } from "react";
import { ChangePassword } from "services/user";
  
  function ChangePasswordForm({onClose}) {
  
    const notify = useNotify();  
    const [valid , setValid] = useState(true)
    const [formData, setFormData] = useState({
      current: "",
      new: "",
      repeat : ""
    });
  
    const handleChange = (event) => {
      const field = event.target.id;
      const value = event.target.value;
      setFormData({ ...formData, [field]: value });
      
    };
const checkPasswordValidation = ()=>{
  if(formData.new !== formData.repeat){
    setValid(false)
  }else{
    setValid(true)
  }
}
useEffect(()=>{
  checkPasswordValidation()
} ,[formData.new , formData.repeat])

  
    const createPost = async () => {
      
      // await dispatch(createCourseAction(newCourse));
      await ChangePassword(formData).then((res)=>{
        console.log(res)
        if(res.status === 200){
          
            notify("رمز عبور با موفقیت تغییر یافت", true, "solid", "success");
            onClose()
          
        }else if(res.status === 422){
          if(res.data.detail.result==='wrong_password'){
            notify("رمز عبور فعلی نادرست می باشد", true, "solid", "error");
          }else if(res.data.detail.result==='less'){
            notify("رمز عبور جدید نباید کمتر از ۸ کاراکتر باشد", true, "solid", "error");
          }
          else{
            notify("خطایی رخ داد", true, "solid", "error");

          }
        }else{
          notify("خطایی رخ داد", true, "solid", "error");

        }
       
        
        
        
      })
      
    };
  
  
  

  
    return (
      <>
        <FormControl dir={'rtl'} px={"30px"}  pb={'20px'}>
     
            <Box>
              <Box minH="80px">
                <Flex>
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                   رمز عبور فعلی
                  </FormLabel>
                  <Spacer />
                  <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
                </Flex>
  
                <Input
                  // disabled={courseId != "-1" ? true : false}
  
                  onChange={handleChange}
                  focusBorderColor="purple.300"
                  id="current"
                  textAlign="right"
                  variant="filled"
                  fontSize="sm"
                  ms="4px"
                  type="password"
                  placeholder="رمز عبور فعلی را وارد کنید"
                  mb="10px"
                  size="lg"
                  value={formData.current}
                />
              </Box>
  
              <Box minH="80px">
                <Flex>
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                   رمز عبور جدید
                  </FormLabel>
                  <Spacer />
                  <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
                </Flex>
  
                <Input
                  // disabled={courseId != "-1" ? true : false}
  
                  onChange={handleChange}
                  focusBorderColor="purple.300"
                  id="new"
                  textAlign="right"
                  variant="filled"
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="رمز عبور جدید را وارد کنید"
                  mb="10px"
                  size="lg"
                  value={formData.new}
                />
              </Box>


              <Box minH="80px">
                <Flex>
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                   تکرار رمز عبور جدید
                  </FormLabel>
                  <Spacer />
                  <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
                </Flex>
  
                <Input
                  // disabled={courseId != "-1" ? true : false}
  
                  onChange={handleChange}
                  focusBorderColor="purple.300"
                  id="repeat"
                  textAlign="right"
                  variant="filled"
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="تکرار رمز عبور جدید را وارد کنید"
                  mb="10px"
                  size="lg"
                  value={formData.repeat}
                />
                {!valid && <Text>رمز عبور جدید با تکرار آن مطابقت ندارد</Text>}
              </Box>
            </Box>

            <Button disabled={!valid} onClick={createPost} colorScheme={'green'}  mt={'20px'} mx={'5px'}>ثبت</Button>
            <Button onClick={onClose}  colorScheme={'red'}  mt={'20px'} mx={'5px'}>لغو</Button>
  

    
        </FormControl>
      </>
    );
  }
  
  export default ChangePasswordForm;
  