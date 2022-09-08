import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Text,
  Image,
  Divider,
  Avatar,
  useColorMode,
  Button,
  IconButton,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CourseRegisterRecords from "components/CourseRgistrationRecord/CourseRegisterRecords";
import SliderWrapper from "components/SliderWrapper/SliderWrapper";
import avatar6 from "assets/img/avatars/avatar6.png";
import { CheckIcon } from "@chakra-ui/icons";
import { FaRegCheckCircle } from "react-icons/fa";
const Registration = () => {
  const colorMode = useColorMode();
  return (
    <Box mt="60px" px="55px" py="5" w="100%" dir="rtl">
      <Flex flexDirection="column" mb="30px" h="100%" align={"center"}>
        <SliderWrapper>
          <CourseRegisterRecords />
        </SliderWrapper>
      </Flex>

      <Card mb={"20px"}>
        <CardHeader h={"auto"} pb={"10px"}>
          <Text textAlign={"center"} fontSize={"25px"} fontFamily={"Lalezar"}>
            شما در حال ثبت نام برای دوره family and friend هستید
          </Text>
          <Text textAlign={"center"} fontSize={"sm"}>
            جهت ثبت نام برای این دوره روی دکمه سبز رنگ "ثبت نام " کلیک کنید. قبل
            از ورود به درگاه پرداخت از خاموش بودن وی پی ان اطمینان حاصل کنید
          </Text>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }}>
            <Box>
              <Text textAlign={"center"} fontSize={"30px"}>
                Family and Friends
              </Text>
              <Text py={"15px"} textAlign={"start"}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه وهای
                اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد
                استفاده قرار گیرد.
              </Text>
              <Divider />
              <Text>دبیر:</Text>
              <Center pb={"15px"}>
                <Flex
                  alignSelf={"center"}
                  borderRadius={"2rem"}
                  h={"85px"}
                  w={"300px"}
                  bg={colorMode.colorMode === "light" ? "gray.100" : "navy.700"}
                >
                  <Box flex="2" borderRadius={"2rem"}>
                    <Text
                      pr={"10px"}
                      pt={"15px"}
                      textAlign={"center"}
                      fontFamily={"Lalezar"}
                    >
                      {" "}
                      آیسان اشراقی اسکویی یک اسم طولا هست
                    </Text>
                  </Box>

                  <Center flex="1" borderRadius={"2rem"}>
                    <Avatar size="lg" name="Ryan Florence" src={avatar6} />
                  </Center>
                </Flex>
              </Center>

              <Divider />
              <Text>هزینه دوره:</Text>

              <Text textAlign={'center'}>

150000 ریال

              </Text>

              <Divider pt={"15px"} />

              <Center pt={"40px"}>
                <Button

                
                size={"lg"}
                fontSize={'30px'}
                fontFamily={'Lalezar'}
                 bg={"green.400"}
                  aria-label="Search database"
              
                >
                  <FaRegCheckCircle   />
                  
                  ثبت نام
                  
                </Button>
              </Center>
            </Box>

            <Center>
              <Image
                h={{ sm: "400px", md: "300px", lg: "500px" }}
                w={{ sm: "400px", md: "300px", lg: "500px" }}
                src={avatar6}
                alt="Dan Abramov"
                borderRadius={'2rem'}
              />
            </Center>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Registration;
