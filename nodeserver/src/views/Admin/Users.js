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
  Stack
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import UserForm from "components/Forms/userForm";
import Pagination from "components/Pagination/pagination";
import UserListSkleton from "components/Skleton/UserListSkleton/UserListSkleton";
import TablesTableRow from "components/Tables/TablesTableRow";
import UserListFilter from "components/UserListFilter/UserListFilter";
import UserListTable from "components/UserListTable/UserListTable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Users = () => {
 
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");


  const { userList, errorMessage, isPending } = useSelector(
    (state) => state.userList
  );

  const [state, setState] = useState([]);
  useEffect(() => {
    setState(userList);
  }, [isPending]);

  const [filter, setFilter] = React.useState({
    fFullName: "",
    fCourse: "",
    fStatus: "",
  });

  const courses = [
    { id: "0", name: "کلاس ۱" },
    { id: "2", name: "کلاس ۲" },
    { id: "3", name: "کلاس ۳" },
  ];


  useEffect(() => {
    setState(userList);
    if (
      filter.fCourse !== "" ||
      filter.fFullName !== "" ||
      filter.fStatus !== ""
    ) {
      doSearch();
    }
  }, [filter.fCourse, filter.fFullName , filter.fStatus]);


  const doSearch = () => {
    let tmp = userList;


    if (filter.fFullName !== "") {
      tmp = tmp.filter((f) => f.full_name === filter.fFullName);
    }
    if (filter.fCourse !== "") {
      tmp = tmp.filter((f) => f.course.id === filter.fCourse);
    }
    if (filter.fStatus !== "") {
      tmp = tmp.filter((f) => f.status.id === filter.fStatus);
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
          <UserForm courses={courses} />
        </CardBody>
      </Card>

      <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Accordion allowToggle>
              <AccordionItem>
                <UserListFilter filter={filter} onChange={handleChange} />
              </AccordionItem>
            </Accordion>
          </Flex>
        </CardHeader>



{
  isPending ? <UserListSkleton /> : <UserListTable data={state} courses={courses} />

}

     


      </Card>
    </Flex>
  );
};

export default Users;
