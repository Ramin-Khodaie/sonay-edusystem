import { Avatar, Text, Box, Flex, Divider, Spacer } from "@chakra-ui/react";

const { default: Card } = require("components/Card/Card");

const TeacherMessage = (props) => {
  return (
    <Card height="100%" dir="rtl">
      <Flex>
        <Avatar />
        <Text pt={"10px"} pr={"10px"} fontFamily={"Lalezar"} fontSize={"20px"}>
          آیسان اشراقی
        </Text>
        <Spacer />
        <Text pt={"10px"} >پیام دبیر</Text>
      </Flex>
      <Divider pt={"10px"} />

      <Text   overflow={'scroll'} height={'300px'} textAlign={'justify'} fontSize={'20px'}>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با
        ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربر
      </Text>
    </Card>
  );
};
export default TeacherMessage;
