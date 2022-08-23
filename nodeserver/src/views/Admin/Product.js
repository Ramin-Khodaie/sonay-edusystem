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
import ProductForm from "components/Forms/productForm";
  const Product = () => {

    const { courseList } = useSelector((state) => state.courseList);
    
    const textColor = useColorModeValue("gray.700", "white");

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
              ثبت محصول جدید
            </Text>
          </CardHeader>


  
          <CardBody>

<ProductForm courses={courseList} />
          </CardBody>
        </Card>
  
        <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex direction="column">
              <Accordion allowToggle>
                <AccordionItem>
                 

                </AccordionItem>
              </Accordion>
            </Flex>
          </CardHeader>
{/*   
          {isPending ? (
            <UserListSkleton />
          ) : (
            <UserListTable data={state} courses={courseList} />
          )} */}
        </Card>
      </Flex>
    );
  };
  
  export default Product;
  