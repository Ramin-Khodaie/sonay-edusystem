import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
} from "@chakra-ui/react";
function NoNextCourseAlert(props) {
  return (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="auto"
      borderRadius={"3rem"}
      mt={"100px"}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        <Text textAlign={"center"} fontFamily={"Lalezar"} fontSize={"25px"}>
        کاربر گرمی{" "}
        </Text>
      </AlertTitle>
      <AlertDescription mb={"10px"} mx={"13px"} maxW={"lg"}>
        <Text textAlign={"center"}>
دوره بعدی شما جهت ثبت نام تعریف نشده است. لطفا منتظر بمانید تا دوره بعدی توسط ادمین سیستم تعریف گردد
        </Text>
      </AlertDescription>
    </Alert>
  );
}

export default NoNextCourseAlert;
