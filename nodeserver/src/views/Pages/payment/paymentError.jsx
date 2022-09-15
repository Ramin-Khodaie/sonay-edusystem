import { Spinner,
    Box,
    Text, 
    SimpleGrid,
    Image,
    Center} from "@chakra-ui/react";

  import React from "react";

  import paymentError from "assets/img/paymentError.jpg";
  import {  FaTimes } from "react-icons/fa";

  
  function PaymentError(props) {

    return (

    
        <SimpleGrid bg={'white'} columns={{"sm" : 1 , "md" : 1 , "lg" : 2}}
        minH={{ base: "100vh", md: "100vh" }}
        
              
               w={{ md: "calc(100vw )" }}
               maxW={{ md: "calc(100vw )" }}
               left="0"
               right="0"
               top="0">
        
        
        <Center>
        <Box>
         <Center>
        
        
        <FaTimes color="red" fontSize={'85px'} />
        </Center>
        <Box>
        
           
        <Text fontSize={'45px'} textAlign={'center'} fontFamily={"Lalezar"}>متاسفانه خطایی در روند پرداخت رخ داد</Text>
        <Text  fontSize={'16px'} textAlign={'center'} >تا لحظاتی دیگر به سامانه آموزشی زبانکده استقلال انتقال خواهید یافت </Text>
        </Box>
        <Center>
         <Spinner   thickness='5px'
         speed='0.8s'
         emptyColor='gray.200'
         color='red.500'
         size={'lg'}
         mt={'15px'} />
           
        
        </Center>
        
        
        
        </Box>
        </Center>
        
        
           <Box  >
          <Image pt={{"lg" : '40px'}}   src={paymentError}></Image>
         </Box>
        
        
        
        
        
        
        
          
        </SimpleGrid>
          
          
    );
  }
  
  export default PaymentError;
  