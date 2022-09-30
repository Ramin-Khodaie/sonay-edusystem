import {
  Avatar,
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import { useEffect } from "react";
import { useState } from "react";
import { getCourse } from "services/course";
import { studentByCourse } from "services/user";

const InfoCard = (props) => {
  const { user } = props;
  const [teacher, setTeaher] = useState([]);

  const callCourse = async () => {
    await studentByCourse(user.courses[0].id, "teacher").then((res) => {
      console.log(res, 3131);

      setTeaher(res);
    });
  };

  useEffect(() => {
    callCourse();
  }, []);

  return (
    <Card mt="75px">
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={2}
      >
        <GridItem rowSpan={4} colSpan={1}>
          <Avatar size="xl" />{" "}
        </GridItem>
        <GridItem colSpan={4}>
          <Text fontWeight={"bold"} textAlign={"right"}>
            {" "}
            {user.full_name} عزیز خوش آمدید
          </Text>
        </GridItem>
        <GridItem colSpan={4}>
          {user.status.id === "reg" ? (
            <Text textAlign={"right"}>
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
        </GridItem>

        <GridItem colSpan={{ sm: 5, md: 2, lg: 2 }}>
          {teacher.length !== 0 && (
            <Flex alignItems="center">
              <Spacer />

              <Center h="10">
                <Text>{teacher[0].full_name}</Text>
              </Center>
              <Box h="10">
                <Avatar
                  mb={"3px"}
                  ml={"10px"}
                  mr={"20px"}
                  size="md"
                  name="Kola Tioluwani"
                />
              </Box>

              <Center h="10">
                <Text>:دبیر فعلی شما</Text>
              </Center>
            </Flex>
          )}
        </GridItem>
        <GridItem colSpan={{ sm: 5, md: 2, lg: 2 }}>
          <Flex alignItems="center">
            <Spacer />

            <Center h="10">
              <Text>{user.courses[0].name}</Text>
            </Center>
            <Box h="10">
              <Avatar
                mt={"3px"}
                ml={"10px"}
                mr={"20px"}
                size="md"
                name={user.courses[0].name}
              />
            </Box>

            <Center h="10">
              <Text>:دوره فعلی شما</Text>
            </Center>
          </Flex>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default InfoCard;
