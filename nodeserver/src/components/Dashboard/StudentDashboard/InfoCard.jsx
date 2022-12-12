import {
  Avatar,
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Spacer,
  Text,
  useColorModeValue,
  Button,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import { useEffect } from "react";
import { useState } from "react";
import { getCourse } from "services/course";
import { studentByCourse } from "services/user";
import avatar5 from "assets/img/avatars/avatar5.png";
import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPenFancy,
  FaPlus,
  FaTwitter,
} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";

const InfoCard = (props) => {
  const { user } = props;
  const [teacher, setTeaher] = useState([]);
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("blue.500", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const emailColor = useColorModeValue("gray.400", "gray.300");
  const { colorMode } = useColorMode();

  const callTeacher = async () => {
    await studentByCourse(user.courses[0].id, "teacher").then((res) => {

      setTeaher(res);
    });
  };

  useEffect(() => {
    callTeacher();
  }, []);

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px", lg: "100px" }}>

<Flex
        direction={{ sm: "column", md: "row" }}
        mb='24px'
        maxH='330px'
        justifyContent={{ sm: "center", md: "space-between" }}
        align='center'
        backdropFilter='blur(21px)'
        boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
        border='1.5px solid'
        borderColor={borderProfileColor}
        bg={bgProfile}
        p='24px'
        borderRadius='20px'>
        <Flex
          align='center'
          mb={{ sm: "10px", md: "0px" }}
          direction={{ sm: "column", md: "row" }}
          w={{ sm: "100%" }}
          textAlign={{ sm: "center", md: "start" }}>
          <Avatar
            me={{ md: "22px" }}
            
            w='80px'
            h='80px'
            borderRadius='15px'
          />
          <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
            <Text
              fontSize={{ sm: "lg", lg: "xl" }}
              color={textColor}
              fontWeight='bold'
              ms={{ sm: "8px", md: "0px" }}>
             {user.full_name}
            </Text>
            <Text
              fontSize={{ sm: "sm", md: "md" }}
              color={emailColor}
              fontWeight='semibold'>
{user.courses[0].name}
            </Text>
          </Flex>
        </Flex>
        <Flex
          direction={{ sm: "column", lg: "row" }}
          w={{ sm: "100%", md: "50%", lg: "auto" }}>
    
    {user.status.id === "reg" ? (
            <Text dir="rtl" textAlign={"justify"}>
              شما در حال گذراندن دوره {user.courses[0].name} هستید. جهت شروع
              عملیات ثبت نام و سفارش کتاب منتظر بمانید تا نمره ترم جاری توسط
              دبیر وارد سامانه گردد
            </Text>
          ) : user.status.id === "mark" ? (
            <Text textAlign={"right"}>
              نمره شما برای دوره جاری وارد سامانه گردیده است. لطفا جهت مشاهده
              نمره از پنل سمت راست بخش کارنامه را انتخاب کنید . پس از مشاهده
              نمره خواهشمند است در اسرع وقت به ثبت نام و سفارش کتاب برای دوره
              بعدی اقدام نمایید
            </Text>
          ) : (
            <></>
          )}

        </Flex>
      </Flex>


    </Flex>



  );
};

export default InfoCard;
