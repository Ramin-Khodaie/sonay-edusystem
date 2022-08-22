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
  Accordion,
  AccordionItem,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import UserForm from "components/Forms/userForm";
import Pagination from "components/Pagination/pagination";
import UserListSkleton from "components/Skleton/UserListSkleton/UserListSkleton";
import TablesTableRow from "components/Tables/TablesTableRow";
import UserListFilter from "components/Filter/UserListFilter";
import UserListTable from "components/Tables/UserListTable/UserListTable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseListAction } from "redux/course/courseList/courseListAction";
import { userListAction } from "redux/user/UserList/UserListAction";
const Users = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();

  const getList = async () => {
    await dispatch(userListAction());
    await dispatch(courseListAction());
  };
  useEffect(() => {
    getList();
    
  }, []);
const studentStatus = require('../../status.json');
  const { userList, errorMessage, isPending } = useSelector(
    (state) => state.userList
  );

  const { courseList } = useSelector((state) => state.courseList);

  const [state, setState] = useState([]);
  useEffect(() => {
    setState(userList);
  }, [isPending]);

  const [filter, setFilter] = React.useState({
    fFullName: "",
    fCourse: { id: "", name: "" },
    fStatus: { id: "", name: "" },
  });

  useEffect(() => {
    setState(userList);
    if (
      filter.fCourse !== "" ||
      filter.fFullName !== "" ||
      filter.fStatus !== ""
    ) {
      doSearch();
    }
  }, [filter.fCourse, filter.fFullName, filter.fStatus]);

  const doSearch = () => {
    let tmp = userList;
 

    if (filter.fFullName !== "") {

      tmp = tmp.filter((f) => f.full_name === filter.fFullName);
    }
    if (filter.fCourse.id !== "") {

      tmp = tmp.filter((f) => f.course.id === filter.fCourse.id);
    }
    if (filter.fStatus.id !== "") {

      tmp = tmp.filter((f) => f.status.id === filter.fStatus.id);
    }
    setState(tmp);
  };
  const handleChange = (f) => {
    setFilter(f);
  };

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
            ثبت کاربر جدید
          </Text>
        </CardHeader>

        <CardBody>
          <UserForm courses={courseList} />
        </CardBody>
      </Card>

      <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Accordion allowToggle>
              <AccordionItem>
                <UserListFilter
                  courses={courseList}
                  filter={filter}
                  onChange={handleChange}
                  selectChange={setFilter}
                  studentStatus={studentStatus}
                />
              </AccordionItem>
            </Accordion>
          </Flex>
        </CardHeader>

        {isPending ? (
          <UserListSkleton />
        ) : (
          <UserListTable data={state} courses={courseList} />
        )}
      </Card>
    </Flex>
  );
};

export default Users;
