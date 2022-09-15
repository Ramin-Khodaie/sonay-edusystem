import { Spinner,
    Box,

    Text,

    SimpleGrid,

    Image,
    Center} from "@chakra-ui/react";

  import React from "react";

  import paymentSuccess from "assets/img/paymentSuccess.jpg";

  import { FaRegCheckCircle } from "react-icons/fa";

  function PaymentSuccess(props) {

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
        
        
       <FaRegCheckCircle color="green" fontSize={'85px'} />
       </Center>
       <Box>
       
           
       <Text fontSize={'45px'} textAlign={'center'} fontFamily={"Lalezar"}>پرداخت شما با موفقیت انجام شد</Text>
       <Text  fontSize={'16px'} textAlign={'center'} >تا لحظاتی دیگر به سامانه آموزشی زبانکده استقلال انتقال خواهید یافت </Text>
        </Box>
        <Center>
         <Spinner   thickness='5px'
         speed='0.8s'
         emptyColor='gray.200'
         color='green.500'
         size={'lg'}
         mt={'15px'} />
           
       
        </Center>
       
       
       
       </Box>
       </Center>
       
       
           <Box  >
          <Image pt={{"lg" : '40px'}}   src={paymentSuccess}></Image>
         </Box>
       
       
       
       
       
        
       
          
        </SimpleGrid> 
    );
  }
  
  export default PaymentSuccess;
  