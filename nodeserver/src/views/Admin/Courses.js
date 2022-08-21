// Chakra imports
import {
  SimpleGrid,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Flex,
  Text,
  Box,
  Input,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spacer,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CourseForm from "components/Forms/courseForm";
import UserForm from "components/Forms/userForm";
import CustomSelector from "components/Selectors/CustomSelector";
import TablesTableRow from "components/Tables/TablesTableRow";
import { useCourseList } from "hooks/users/useCourseList";
import { useUserList } from "hooks/users/useUserList";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { courseListAction } from "redux/course/courseList/courseListAction";

function Courses() {
  const statusData = [
    { _id: "active", name: "فعال" },
    { _id: "deactive", name: "غیرفعال" },
  ];

  const { courseList, errorMessage, isPending } = useSelector(
    (state) => state.courseList
  );

  const [state, setState] = useState([]);
  useEffect(() => {
    setState(courseList);
  }, [isPending]);

  const status = [
    { id: "onlinr", name: "آنلاین" },
    { id: "ofline", name: "آفلاین" },
  ];

  const [sent, setSent] = React.useState({
    status: false,
    sending: false,
  });

  const [filter, setFilter] = React.useState({
    fFullName: "",
    fCourse: "",
    fStatus: "",
  });

  const handleSent = (sentObj) => {
    setSent(sentObj);
  };

  const handleFilterChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setFilter({ ...filter, [field]: value });
  };

  const dispatch = useDispatch();

  const getCourseList = async () => {
    await dispatch(courseListAction());
  };


  useEffect(() => {
    getCourseList();
  }, []);

  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  // const courseList = useCourseList(sent.status ,{
  //   full_name : filter.fFullName,

  //   status : filter.fStatus
  // }, filter);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign={"right"}
          >
            ثبت دوره جدید
          </Text>
        </CardHeader>

        <CardBody>
          <CourseForm
            changeSent={handleSent}
            sent={sent}
            courses={courseList}
            statusData={statusData}
          />
        </CardBody>
      </Card>

      <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Accordion allowToggle>
              <AccordionItem>
                <Flex>
                  <Box>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {" "}
                          نمایش فیلتر ها{" "}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>{" "}
                  </Box>
                  <Spacer />
                  <Box>
                    <Text
                      fontSize="xl"
                      color={textColor}
                      fontWeight="bold"
                      textAlign={"right"}
                      my={"10px"}
                    >
                      لیست دوره ها{" "}
                    </Text>
                  </Box>
                </Flex>

                <AccordionPanel pb={4}>
                  <SimpleGrid
                    style={{ direction: "rtl" }}
                    columns={{ sm: 1, md: 3, xl: 3 }}
                    spacing="24px"
                    mb="20px"
                  >
                    <Box>
                      <Input
                        id="fFullName"
                        onChange={handleFilterChange}
                        focusBorderColor="purple.300"
                        textAlign="right"
                        variant="outline"
                        fontSize="sm"
                        ms="4px"
                        type="text"
                        placeholder="نام و نام خانوادگی را وارد کنید"
                        mb="10px"
                        size="md"
                      />
                    </Box>

                    <Box>
                      <CustomSelector
                        onChange={setFilter}
                        state={filter}
                        data={statusData}
                        fieldId={"fStatus"}
                        placeHolder={"وضعیت دوره را انتخاب کنید"}
                      />
                    </Box>
                  </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table
            style={{ direction: "rtl" }}
            variant="simple"
            color={textColor}
          >
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" borderColor={borderColor} color="gray.400">
                  نام دوره
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  دوره بعدی
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  وضعیت
                </Th>

                <Th borderColor={borderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {courseList.map((row, index, arr) => {
                return (
                  <TablesTableRow
                    name={row.name}
                    logo={row.image}
                    subdomain={"hi"}
                    domain={row.next_course.name}
                    status={"Online"} //{row.enable}
                    isLast={index === arr.length - 1 ? true : false}
                    key={row._id}
                    changeSent={handleSent}
                    sent={sent}
                    userId={row._id}
                    courses={courseList}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Courses;
