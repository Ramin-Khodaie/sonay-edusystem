import { Spinner,
    Box,

    Text,

    SimpleGrid,

    Image,
    Center} from "@chakra-ui/react";

  import React from "react";

  import paymentSuccess from "assets/img/paymentSuccess.jpg";

  import { FaRegCheckCircle } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAllItems } from "redux/product/orderReducer";
import { useQuery } from "hooks/useQuery";
import { useEffect } from "react";
import { verifyRegistration } from "services/purchase";
import { userInfoAction } from "redux/user/UserInfo/UserInfoAction";

  function PaymentSuccess(props) {
    const history = useHistory();
    const { oid } = useParams();
    const dispatch = useDispatch();
    let query = useQuery();
    const paymentStatus = query.get("Status");


  
    const authority = query.get("Authority");
    const doVerify = () => {
      verifyRegistration(oid, authority).then((res) => {
        if (res.data.result === "ok") {
          dispatch(userInfoAction());
          dispatch(clearAllItems())
  
          setTimeout(() => {
            history.push("/sonay/dashboard");
          }, 4000);
        }
      });
    };
    useEffect(() => {
      if (paymentStatus === "OK") {
        doVerify();
      }
    }, []);

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
       
           
       <Text color={'green'} fontSize={'45px'} textAlign={'center'} fontFamily={"Lalezar"}>پرداخت شما با موفقیت انجام شد</Text>
       <Text color={'black'} fontSize={'16px'} textAlign={'center'} >تا لحظاتی دیگر به سامانه آموزشی زبانکده استقلال انتقال خواهید یافت </Text>
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
  