import { Avatar, Text, Box, Flex, Divider, Spacer } from "@chakra-ui/react";

const { default: Card } = require("components/Card/Card");

const TeacherMessage = (props) => {
  const {description} = props
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
   {description}
      </Text>
    </Card>
  );
};
export default TeacherMessage;
