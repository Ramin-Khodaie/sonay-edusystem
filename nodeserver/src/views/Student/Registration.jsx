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

import RegistrationCard from "components/RegistrationCard/RegistrationCard";
const Registration = () => {
  return (
    <Box mt="60px" px="55px" py="5" w="100%" dir="rtl">
      <Flex flexDirection="column" mb="30px" h="100%" align={"center"}>
        <SliderWrapper>
          <CourseRegisterRecords />
        </SliderWrapper>
      </Flex>

      <RegistrationCard />


    </Box>
  );
};

export default Registration;
