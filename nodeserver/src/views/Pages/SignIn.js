import React from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Icon,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { bixious } from "services/main";
import { useNavigate } from "react-router-dom";
import { withRouter } from "helpers/components/withRouter/withRouter";
function SignIn(props) {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");

  const [formData , setFormData] = React.useState({
    username : "",
    password : ""
  })


  const [status, setStatus] = React.useState({
    user : false,
    error : false
  })
  
  
  const handleChange = (event) => {
    const field = event.target.id
    const value = event.target.value
    setFormData({...formData , [field]: value  })

  }


  let history = props.history;


function createPost(){

  // const fData = new FormData();
  // fData.append("username", formData.username);
  // fData.append("password", formData.password);

  bixious.post("/users/login" , {
    username: formData.username,
    password: formData.password,
 
  }
  ).then((response) => {
    localStorage.setItem("at", response.data.data.at);
    localStorage.setItem("rt", response.data.data.rt);
    setStatus({...status , user : true})
    history.push("/dashboard")
    
    

  })

  .catch((err) => {
    console.log(err)
  })
}



  return (
    <Flex position='relative' mb='40px'>
      <Flex
        minH={{ md: "1000px" }}
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ md: "0px" }}>
        <Flex
          w='100%'
          h='100%'
          alignItems='center'
          justifyContent='center'
          mb='60px'
          mt={{ base: "50px", md: "20px" }}>
          <Flex
            zIndex='2'
            direction='column'
            w='445px'
            background='transparent'
            borderRadius='15px'
            p='40px'
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.05)",
              "unset"
            )}>
            <Text
              fontSize='xl'
              color={textColor}
              fontWeight='bold'
              textAlign='center'
              mb='22px'>
              : ورود به پنل کاربری با 
            </Text>
            <HStack spacing='15px' justify='center' mb='22px'>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='8px'
                border={useColorModeValue("1px solid", "0px")}
                borderColor='gray.200'
                cursor='pointer'
                transition='all .25s ease'
                bg={bgIcons}
                _hover={{ bg: bgIconsHover }}>
                <Link href='#'>
                  <Icon as={FaFacebook} color={colorIcons} w='30px' h='30px' />
                </Link>
              </Flex>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='8px'
                border={useColorModeValue("1px solid", "0px")}
                borderColor='gray.200'
                cursor='pointer'
                transition='all .25s ease'
                bg={bgIcons}
                _hover={{ bg: bgIconsHover }}>
                <Link href='#'>
                  <Icon
                    as={FaApple}
                    color={colorIcons}
                    w='30px'
                    h='30px'
                    _hover={{ filter: "brightness(120%)" }}
                  />
                </Link>
              </Flex>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='8px'
                border={useColorModeValue("1px solid", "0px")}
                borderColor='gray.200'
                cursor='pointer'
                transition='all .25s ease'
                bg={bgIcons}
                _hover={{ bg: bgIconsHover }}>
                <Link href='#'>
                  <Icon
                    as={FaGoogle}
                    color={colorIcons}
                    w='30px'
                    h='30px'
                    _hover={{ filter: "brightness(120%)" }}
                  />
                </Link>
              </Flex>
            </HStack>
            <Text
              fontSize='lg'
              color='gray.400'
              fontWeight='bold'
              textAlign='center'
              mb='22px'>
              یا
            </Text>
            <FormControl>
              <FormLabel textAlign='end' ms='4px' fontSize='sm' fontWeight='normal'>
                نام کاربری
              </FormLabel>
              <Input
              onChange={
                handleChange
              }
              id="username"
              value={formData.username}
                textAlign='right'
                variant='auth'
                fontSize='sm'
                ms='4px'
                type='text'
                placeholder='نام کاربری خود را وارد کنید'
                mb='24px'
                size='lg'
              />
              <FormLabel textAlign='end' ms='4px' fontSize='sm' fontWeight='normal'>
                رمز
              </FormLabel>
              <Input
              onChange={
                handleChange
              }
              id="password"
              value={formData.password}
                textAlign='right'
                variant='auth'
                fontSize='sm'
                ms='4px'
                type='password'
                placeholder='رمز خود را وارد کنید'
                mb='24px'
                size='lg'
              />
              <FormControl display='flex' alignItems='center' mb='24px'>
                <Switch id='remember-login' colorScheme='blue' me='10px' />
                <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
                  ذخیره نام کاربری و رمز
                </FormLabel>
              </FormControl>
              <Button
              onClick={createPost}
                fontSize='20px'
                fontFamily='Lalezar'
                variant='dark'
                fontWeight='bold'
                w='100%'
                h='45'
                mb='24px'>
                ورود
              </Button>
            </FormControl>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
               
                تاکنون ثبت نام نکرده اید؟
                {" "}
                <Link
                  color={titleColor}
                  as='span'
                  ms='5px'
                  href='#'
                  fontWeight='bold'>
                  ثبت نام کنید
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          overflowX='hidden'
          h='100%'
          w='100%'
          left='0px'
          position='absolute'
          bgImage={signInImage}>
          <Box
            w='100%'
            h='100%'
            bgSize='cover'
            bg='blue.500'
            opacity='0.8'></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default withRouter(SignIn);
