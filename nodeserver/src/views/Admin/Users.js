// Chakra imports
import {
  useColorModeValue,
  Flex,
  Text,

  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,

} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import UserForm from "components/Forms/userForm";
import UserListFilter from "components/Filter/UserListFilter";
import UserListTable from "components/Tables/UserListTable/UserListTable";
import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";

import AuthorizeProvider from "helpers/authorize/AuthorizeProvider";
import { getUserList } from "services/user";
import { UserPop1 } from "components/PopOvers/UserPopOver";
import { deleteUser } from "services/user";
import { enableUser } from "services/user";
const Users = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const studentStatus = [
    { _id: "admin", name: "ادمین" },
    { _id: "teacher", name: "دبیر" },
    { _id: "student", name: "زبان آموز" },
  ];

  const boxBg = useColorModeValue("gray.100", "navy.600");
  const { courseList } = useSelector((state) => state.courseList);

  const [userList, setUserList] = useState([]);

  const [filter, setFilter] = React.useState({
    fFullName: "",
    fCourse: { id: "", name: "" },
    fStatus: { id: "", name: "" },
    isEnable : false
  });

  useEffect(() => {
    setUserList(userList);
    if (
      filter.fCourse !== "" ||
      filter.fFullName !== "" ||
      filter.fStatus !== "" ||
      filter.isEnabled
    ) {
      doSearch();
    }
  }, [filter.fCourse, filter.fFullName, filter.fStatus , filter.isEnable]);

  const doSearch = async () => {
    await getUserList(filter).then((res) => {
      setUserList(res.data.data);
    });
  };
  const handleChange = (f) => {
    setFilter(f);
  };

  const handleDelete = (username) => {
    deleteUser(username).then((res) => {
      if (res.status === 200) {
        setUserList(userList.filter((user) => user.username !== username));
      }
    });
  };

  const handleEnable = (username, isEnable) => {
    enableUser(username, isEnable).then((res) => {
      if (res.status === 200) {
        setUserList(
          userList.map((item, key) => {
            return item.username === res.data.data.username
              ? res.data.data
              : item;
          })
        );

       
      } 
    });
  };
  const handleChckBoxChange = ()=>{
    setFilter({...filter , isEnable: !filter.isEnable})
  }

  return (
    <AuthorizeProvider roles={["admin"]}>
      <Flex direction="column" pt="75px">
        <Card 
        overflowX={{ sm: "scroll", xl: "hidden" }}
        overflowY={'hidden'}
         pb="20px">
         



        <Accordion defaultIndex={[1]} allowMultiple >
            <AccordionItem >
              <AccordionButton>
                <UserPop1 />

                <Box
                  fontWeight={"bold"}
                  fontSize={"20px"}
                  as="span"
                  flex="1"
                  textAlign="right"
                >
                  ثبت کاربر جدید
                </Box>

                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
           

              <CardBody>
            <UserForm
              userList={userList}
              setUserList={setUserList}
              courses={courseList}
            />
          </CardBody>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
       
        </Card>

        <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex direction="column">
              <Accordion allowToggle>
                <AccordionItem>
                  <UserListFilter
                  handleChckBoxChange={handleChckBoxChange}
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
              width={{ sm: "300px", md: "500px", lg: "500px" }}
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
              handleDelete={handleDelete}
              handleEnable={handleEnable}
            />
          )}
        </Card>
      </Flex>
    </AuthorizeProvider>
  );
};

export default Users;
