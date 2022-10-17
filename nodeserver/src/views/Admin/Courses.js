// Chakra imports
import { useColorModeValue, Flex, Text } from "@chakra-ui/react";

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
import AuthorizeProvider from "helpers/authorize/AuthorizeProvider";
import { CoursePop1 } from "components/PopOvers/CoursePopOver";
import { getCourseList } from "services/course";
import { getCourseBySearch } from "services/course";

function Courses() {
  const textColor = useColorModeValue("gray.700", "white");

  const statusData = [
    { _id: "active", name: "فعال" },
    { _id: "deactive", name: "غیرفعال" },
  ];


  const { courseList } = useSelector(
    (state) => state.courseList
  );




  const [state, setState] = useState([]);

const callData = async()=>{
await getCourseList().then((res)=>{

    setState(res.data.data);

})
}





  const [filter, setFilter] = React.useState({
    fFullName: "",
    fTeacher: {
      id: "",
      name: "",
    },
    fStatus: {
      id: "",
      name: "",
    },
  });



  const handleChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setFilter({ ...filter, [field]: value });
  };



  const doSearch = async() => {

   await getCourseBySearch(filter).then((res)=>{

    setState(res.data.data);
   })
    
  };

  useEffect(() => {

    if (
      filter.fTeacher !== "" ||
      filter.fFullName !== "" ||
      filter.fStatus !== ""
    ) {

      doSearch();
    }
  }, [filter.fTeacher, filter.fFullName, filter.fStatus]);

  useEffect(() => {
    callData()
  }, []);


  return (
    <AuthorizeProvider roles={["admin"]}>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex dir='rtl' >
             
              <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign={"right"}
            >
              ثبت دوره جدید
            </Text>
            <CoursePop1 />
            </Flex>
            
          </CardHeader>

          <CardBody>
            <CourseForm
              courses={courseList}
              statusData={statusData}
              callData={callData}
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
              teacher={[
                { _id: "5", name: "aysan eshraghi" },
                { _id: "6", name: "jafar jafari" },
              ]}
            />
          </CardHeader>
          <CardBody>
            <CourseListTable
              statusData={statusData}
              data={state}
              courses={courseList}
              callData={callData}
            />
          </CardBody>
        </Card>
      </Flex>
    </AuthorizeProvider>
  );
}

export default Courses;
