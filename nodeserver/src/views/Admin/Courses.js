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
import React, { useEffect, useState } from "react";
import CourseListFilter from "components/Filter/CourseListFilter";
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


  const [sent, setSent] = React.useState({
    status: false,
    sending: false,
  });

  const [filter, setFilter] = React.useState({
    fFullName: "",
    fTeacher: {
      "id" : "",
      "name" : ""
    },
    fStatus: {
      "id" : "",
      "name" : ""
    },
  });

  const handleSent = (sentObj) => {
    setSent(sentObj);
  };

  const handleChange = (e) => {
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


  useEffect(() => {
    setState(courseList);
    if (
      filter.fTeacher !== "" ||
      filter.fFullName !== "" ||
      filter.fStatus !== ""
    ) {
      doSearch();
    }
  }, [filter.fTeacher, filter.fFullName, filter.fStatus]);

console.log(filter)
  const doSearch = () => {
    let tmp = courseList;
 

    if (filter.fFullName !== "") {
      console.log(1)

      tmp = tmp.filter((f) => f.name === filter.fFullName);
    }
    // if (filter.fTeacher.id !== "") {
    //   console.log(2)

    //   tmp = tmp.filter((f) => f.teacher.id === filter.fTeacher.id);
    // }
    if (filter.fStatus.id !== "") {
      console.log(3)

      tmp = tmp.filter((f) => f.status.id === filter.fStatus.id);
    }
    setState(tmp);
  };

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
          







          <CourseListFilter
          filter={filter}
          onChange={handleChange}
          courses={courseList}
          selectChange={setFilter}
          courseStatus={statusData}
          teacher={[{"_id" : "5",
        "name" : "aysan eshraghi"},
        {"_id" : "6",
        "name" : "jafar jafari"}]}


           />













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

                <Th borderColor={borderColor} color="gray.400">
                  دبیر
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  ویرایش
                </Th>

              </Tr>
            </Thead>
            <Tbody>
              {state.map((row, index, arr) => {
                return (
                  <TablesTableRow
                    name={row.name}
                    logo={row.image}
                    subdomain={"hi"}
                    domain={row.next_course.name}
                    status={"Online"} //{row.enable}
                    date={"اشراقی"}
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
