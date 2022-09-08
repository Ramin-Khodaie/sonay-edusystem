import { Box, Center, Flex, SimpleGrid, Text, Image, Divider } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CourseRegisterRecords from "components/CourseRgistrationRecord/CourseRegisterRecords";
import SliderWrapper from "components/SliderWrapper/SliderWrapper";

const Registration = () => {
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
              <Text py={'15px'} textAlign={"start"}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه وهای
                اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد
                استفاده قرار گیرد.
              </Text>
              <Divider />
            </Box>
            <Center >
              <Image
                h={{ sm: "400px", md: "300px", lg: "500px" }}
                w={{ sm: "400px", md: "300px", lg: "500px" }}
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
              />
            </Center>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Registration;
