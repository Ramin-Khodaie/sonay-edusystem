import { Spinner,
    Box,
    Text, 
    SimpleGrid,
    Image,
    Center,
    Button} from "@chakra-ui/react";

  import React from "react";

  import forbidenBg from "assets/img/forbiden.jpg";
  import {  FaTimes } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Forbiden = (props)=>{
    const history = useHistory()
    const { userInfo } = useSelector((state) => state.getUserInfo);
    const goBack=()=>{
        if(userInfo.username !== 'anonymous'){
            history.push("/sonay/dashboard")
        }else{
            history.push("/auth/signin")
        }
  
    }

    
    return(
       
    
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
        
           
        <Text fontSize={'45px'} textAlign={'center'} fontFamily={"Lalezar"}> شما به این صفحه دسترسی ندارید</Text>
        </Box>
        <Center>
        <Button bg='green.300' size='lg' mt={'15px'}
        onClick={goBack}
        >
            بازگشت به صفحه اصلی
        </Button>
           
        
        </Center>
        
        
        
        </Box>
        </Center>
        
        
           <Box  >
          <Image pt={{"lg" : '40px'}}   src={forbidenBg}></Image>
         </Box>
        
        
        
        
        
        
        
          
        </SimpleGrid>
    )
}

export default Forbiden