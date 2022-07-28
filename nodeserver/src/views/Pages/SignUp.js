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
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

function SignUp() {
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");
  return (
    <Flex
      direction='column'
      alignSelf='center'
      justifySelf='center'
      overflow='hidden'>
      <Box
        position='absolute'
        minH={{ base: "70vh", md: "50vh" }}
        maxH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        maxW={{ md: "calc(100vw - 50px)" }}
        left='0'
        right='0'
        bgRepeat='no-repeat'
        overflow='hidden'
        zIndex='-1'
        top='0'
        bgImage={BgSignUp}
        bgSize='cover'
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
        borderRadius={{ base: "0px", md: "20px" }}>
        <Box w='100vw' h='100vh' bg='blue.500' opacity='0.8'></Box>
      </Box>
      <Flex
        direction='column'
        textAlign='center'
        justifyContent='center'
        align='center'
        mt='125px'
        mb='30px'>
        <Text fontFamily='Lalezar' fontSize='5xl' color='white' fontWeight='bold'>
پنل مدیریتی آموزشی یکپارچه سون آی  </Text>
        <Text
          fontSize='md'
          color='white'
          fontWeight='normal'
          mt='10px'
          mb='26px'
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "333px" }}>
          پس از ثبت نام اطلاعات شما توسط مدیر سیستم تایید خواهد شد . این پروسه ممکن است دو الی سه روز کاری طول کشد بعد از تایید کاربری، شما می توانید از طریق پنل ورود به سیستم، وار ناحیه کاربری خود شوید
        </Text>
      </Flex>
      <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
        <Flex
          direction='column'
          w='445px'
          background='transparent'
          borderRadius='15px'
          p='40px'
          mx={{ base: "100px" }}
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
            : ثبت نام کاربری در سیستم با 
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
            <FormLabel textAlign='right' ms='4px' fontSize='sm' fontWeight='normal'>
              نام
            </FormLabel>
            <Input
            textAlign='right'
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='text'
              placeholder='نام کاربری خود را وارد کنید'
              mb='24px'
              size='lg'
            />
            <FormLabel textAlign='right' ms='4px' fontSize='sm' fontWeight='normal'>
              ایمیل
            </FormLabel>
            <Input
            textAlign='right'
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='email'
              placeholder='ایمیل خود را وارد کنید'
              mb='24px'
              size='lg'
            />
            <FormLabel textAlign='right' ms='4px' fontSize='sm' fontWeight='normal'>
              رمز
            </FormLabel>
            <Input
              textAlign='right'

              variant='auth'
              fontSize='sm'
              ms='4px'
              type='password'
              placeholder='رمز خود را وارد کنید'
              mb='24px'
              size='lg'
            />


            <FormLabel textAlign='right' ms='4px' fontSize='sm' fontWeight='normal'>
              تکرار رمز
            </FormLabel>
            <Input
              textAlign='right'

              variant='auth'
              fontSize='sm'
              ms='4px'
              type='password'
              placeholder='تکرار رمز خود را وارد کنید'
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
            fontSize="20px"
            fontFamily='Lalezar'
              variant='dark'
              fontWeight='bold'
              w='100%'
              h='45'
              mb='24px'>
            ثبت نام
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            maxW='100%'
            mt='0px'>
            <Text color={textColor} fontWeight='medium'>
قبلا ثبت نام کرده اید؟
              {" "}

              <Link
                color={titleColor}
                as='span'
                ms='5px'
                href='#'
                fontWeight='bold'>
ورود               </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
