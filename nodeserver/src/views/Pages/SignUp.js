// Chakra imports
import {
  
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  LightMode,
  FormErrorMessage,
  FormHelperText
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import useNotify from "helpers/notify/useNotify";
import React, { useEffect } from "react";
import { FaApple, FaFacebook, FaGoogle , FaTimes } from "react-icons/fa";
import { bixios } from "services/main";

function SignUp() {
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");

  

  const checkUsernameAndEmail = (usn,eml) => {

    bixios.get("/users/checkregisterform",
    {
      params: {
        "user_name": usn,
        "email":eml
      }

  }).then((response) => {
      if (response.status === 200){
        setMessages({...messages,emailMessage : "" , usernameMessage : ""})
        setValid({...valid , username : true , email : true})
        
      }
  })
  .catch((e)=> {
    if ((e.response.status === 422 && e.response.data.result) === "user_unique"){
      setMessages({...messages ,emailMessage : "" ,usernameMessage : "این نام کاربری قبلا انتخاب شده است"})
      setValid({...valid , username : false})
    }
    else if ((e.response.status === 422 && e.response.data.result) === "email_unique"){
      setMessages({...messages ,usernameMessage: "", emailMessage : "این ایمیل قبلا انتخاب شده است"})
      setValid({...valid , email : false})

    }
    else {
    }
  });


}

 function createPost() {
    setSent({ sending: true });
    bixios
      .post("/users/register", {
        username: formData.username,
        email: formData.email,
        full_name: formData.full_name,
        password: formData.password,
        password_confirm: formData.confirm_password,
      })
      .then((response) => {
        {
          response.status === 200
            ? setSent({ status: true })
            : setSent({ sending: true });
        }
      })
      .catch((e)=>{


        if (e.response && e.response.status === 422 && e.response.data.result === "requiered_field") {
         
          setSent({ status: true })
          notify("خطا در ثبت داده", true, "solid","error")
      
        }
        else if(e.response && e.response.status === 422 && e.response.data.result === "not_unique"){
          setSent({ status: true })
          notify("این کاربر قبلا  ثبت نام کرده است", true, "solid" , 'error')
        }
      });
  }



const handleChange = (event) => {
    const field = event.target.id
    const value = event.target.value
    setFormData({...formData , [field]: value  })

  }

 
 
  const [sent, setSent] = React.useState({
    status: false,
    sending: false,
  });

  const [valid, setValid] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [messages,setMessages] = React.useState({
    passwordConfirm : "",
    usernameMessage:"",
    emailMessage : ""
  })
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    full_name: "",
    password: "",
    confirm_password: "",
  });
  useEffect(()=>{

    chackFormValidation()
  },[formData.confirm_password])



   useEffect(()=>{
    checkUsernameAndEmail(formData.username , formData.email)
   },[formData.username,formData.email])



  function chackFormValidation() {
    
    // password comfirmation check
 
    
      if(formData.password === formData.confirm_password)
      {
        setValid({...valid, password: true })
        setMessages({...messages, passwordConfirm : ""})
      }
      else{
        setValid({...valid, password: false });
        setMessages({...messages,passwordConfirm : "رمز عبور با تکرار آن مطابقت ندارد"})

      }
         
         return
    
  }

  const notify = useNotify()
  
  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "100vh", md: "100vh" }}
        maxH={{ base: "100vh", md: "100vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        maxW={{ md: "calc(100vw - 50px)" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
        borderRadius={{ base: "0px", md: "20px" }}
      >
        <Box w="100vw" h="200vh" bg="blue.500" opacity="0.8"></Box>
      </Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="125px"
        mb="30px"
      >
        <Text
          fontFamily="Lalezar"
          fontSize="5xl"
          color="white"
          fontWeight="bold"
        >
          پنل مدیریتی آموزشی یکپارچه سون آی{" "}
        </Text>
        {/* <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "333px" }}
        >
          پس از ثبت نام اطلاعات شما توسط مدیر سیستم تایید خواهد شد . این پروسه
          ممکن است دو الی سه روز کاری طول کشد بعد از تایید کاربری، شما می توانید
          از طریق پنل ورود به سیستم، وار ناحیه کاربری خود شوید
        </Text> */}
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          bg={bgForm}
          boxShadow={useColorModeValue(
            "0px 5px 14px rgba(0, 0, 0, 0.05)",
            "unset"
          )}
        >
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            : ثبت نام کاربری در سیستم با
          </Text>
          <HStack spacing="15px" justify="center" mb="22px">
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon as={FaFacebook} color={colorIcons} w="30px" h="30px" />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon
                  as={FaApple}
                  color={colorIcons}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon
                  as={FaGoogle}
                  color={colorIcons}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
          </HStack>
          <Text
            fontSize="lg"
            color="gray.400"
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            یا
          </Text>
          <FormControl >
            <FormLabel
              textAlign="right"
              ms="4px"
              fontSize="sm"
              fontWeight="normal"
            >
              نام کاربری
            </FormLabel>
            <Input
              onChange={
                handleChange
              }
              id="username"
              value={formData.username}
              textAlign="right"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="نام کاربری خود را وارد کنید"
              mb={valid.username | valid.username === "" ? "24px" : "5px"}
              size="lg"
            />
            <Text textAlign={"end"}  mb={"14px"} color={'red'} fontWeight="medium">
            {messages.usernameMessage}     
            </Text>

            <FormLabel
              textAlign="right"
              ms="4px"
              fontSize="sm"
              fontWeight="normal"
            >
              نام و نام خانوادگی
            </FormLabel>
            <Input
              onChange={
                handleChange
              }
              id="full_name"
              value={formData.full_name}
              textAlign="right"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              mb="24px"
              size="lg"
            />
            
            <FormLabel
              textAlign="right"
              ms="4px"
              fontSize="sm"
              fontWeight="normal"
            >
              ایمیل
            </FormLabel>
            <Input
              onChange={
                handleChange
              }
              id="email"
              value={formData.email}
              textAlign="right"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="email"

              placeholder="ایمیل خود را وارد کنید"
              mb={valid.email | valid.email === "" ? "24px" : "5px"}

              size="lg"
            />
            <Text textAlign={"end"} mb={"14px"} color={'red'} fontWeight="medium">
            {messages.emailMessage}     
            </Text>
            <FormLabel
              textAlign="right"
              ms="4px"
              fontSize="sm"
              fontWeight="normal"
            >
              رمز
            </FormLabel>
            <Input
              onChange={handleChange
              }
              id="password"
              value={formData.password}
              textAlign="right"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="password"
              placeholder="رمز خود را وارد کنید"
              mb="24px"
              size="lg"
            />

            <FormLabel
              textAlign="right"
              ms="4px"
              fontSize="sm"
              fontWeight="normal"
            >
              تکرار رمز
            </FormLabel>
            <Input
              onChange={
                handleChange
              }
              id="confirm_password"
              value={formData.confirm_password}
              textAlign="right"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="password"
              placeholder="تکرار رمز خود را وارد کنید"
              mb={valid.password | valid.password === "" ? "24px" : "5px"}
              size="lg"
            />





            
            
            <Text textAlign={"end"} mb={"14px"} color={'red'} fontWeight="medium">
            {messages.passwordConfirm}     
            </Text>
            
              
            

            

            
            <Button
            
            
            // disabled={valid.password & valid.email & valid.username ? false : true}
              onClick={createPost}
              fontSize="20px"
              fontFamily="Lalezar"
              variant="dark"
              fontWeight="bold"
              w="100%"
              h="45"
              mb="24px">
              {sent.sending ? "در حال ثبت نام" : "! ثبت نام کن"}
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              قبلا ثبت نام کرده اید؟{" "}
              <Link
                color={titleColor}
                as="span"
                ms="5px"
                href="#"
                fontWeight="bold"
              >
                ورود{" "}
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
