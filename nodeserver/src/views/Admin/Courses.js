// Chakra imports
import {
  useColorModeValue,
  Flex,
  Text,

} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CourseForm from "components/Forms/courseForm";
import React, { useEffect, useState } from "react";
import CourseListFilter from "components/Filter/CourseListFilter";
import { useDispatch, useSelector } from "react-redux";
import { courseListAction } from "redux/course/courseList/courseListAction";
import CourseListTable from "components/Tables/CourseListTable/CourseListTable";

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

  const doSearch = () => {
    let tmp = courseList;
 

    if (filter.fFullName !== "") {

      tmp = tmp.filter((f) => f.name === filter.fFullName);
    }
    // if (filter.fTeacher.id !== "") {

    //   tmp = tmp.filter((f) => f.teacher.id === filter.fTeacher.id);
    // }
    if (filter.fStatus.id !== "") {

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
         <CourseListTable statusData={statusData} data={state} courses={courseList}  />
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Courses;
