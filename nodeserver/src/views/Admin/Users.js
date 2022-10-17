// Chakra imports
import {
  useColorModeValue,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  Box,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Tag,
  Stack
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import UserForm from "components/Forms/userForm";
import UserListSkleton from "components/Skleton/UserListSkleton/UserListSkleton";
import UserListFilter from "components/Filter/UserListFilter";
import UserListTable from "components/Tables/UserListTable/UserListTable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseListAction } from "redux/course/courseList/courseListAction";
import { userListAction } from "redux/user/UserList/UserListAction";
import AuthorizeProvider from "helpers/authorize/AuthorizeProvider";
import { getUserList } from "services/user";
import { PhoneIcon, QuestionIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { UserPop1 } from "components/PopOvers/UserPopOver";
const Users = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const studentStatus = [
    {'_id' : 'admin','name' : 'ادمین'},
    {'_id' :'teacher','name' : 'دبیر'},
    {'_id' :'student','name' :'زبان آموز'}
  ]

  const boxBg = useColorModeValue("gray.100", "navy.600");
  const { courseList } = useSelector((state) => state.courseList);

  const [userList, setUserList] = useState([]);

  const [filter, setFilter] = React.useState({
    fFullName: "",
    fCourse: { id: "", name: "" },
    fStatus: { id: "", name: "" },
  });

  useEffect(() => {
    setUserList(userList);
    if (
      filter.fCourse !== "" ||
      filter.fFullName !== "" ||
      filter.fStatus !== ""
    ) {
      doSearch();
    }
  }, [filter.fCourse, filter.fFullName, filter.fStatus]);

  const doSearch = async () => {
    await getUserList(filter).then((res) => {
      setUserList(res.data.data);
    });
  };
  const handleChange = (f) => {
    setFilter(f);
  };


 
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
             
            >
              ثبت کاربر جدید
            </Text>

            <UserPop1 />


            </Flex>
            
          </CardHeader>

          <CardBody>
            <UserForm
              userList={userList}
              setUserList={setUserList}
              courses={courseList}
            />
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

          {userList.length === 0 ? (
            // <UserListSkleton />
            <Box
              mb={"30px"}
              borderRadius={"3rem"}
              alignSelf={"center"}
              width={"500px"}
              bg={boxBg}
            >
              <Text textAlign={"center"} my={"10px"}>
                کاربری یافت نشد
              </Text>
            </Box>
          ) : (
            <UserListTable
              userList={userList}
              setUserList={setUserList}
              data={userList}
              courses={courseList}
            />
          )}
        </Card>
      </Flex>
    </AuthorizeProvider>
  );
};

export default Users;
