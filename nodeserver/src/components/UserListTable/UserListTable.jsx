
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
  import TablesTableRow from "components/Tables/TablesTableRow";
  import UserListFilter from "components/Filter/UserListFilter";
  import React, { useEffect, useState } from "react";
  function UserListTable(props) {
    const {data , courses} = props

    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
  

  
    return (
        <CardBody >
        <Table
          style={{ direction: "rtl" }}
          variant="simple"
          color={textColor}
        >
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              <Th pl="0px" borderColor={borderColor} color="gray.400">
                کاربر
              </Th>
              <Th borderColor={borderColor} color="gray.400">
                دوره فعلی
              </Th>
              <Th borderColor={borderColor} color="gray.400">
                وضعیت
              </Th>
              <Th borderColor={borderColor} color="gray.400">
                شماره تماس
              </Th>
              <Th borderColor={borderColor}></Th>
            </Tr>
          </Thead>
        

          <Tbody  >



            {data
              // filter((filtered) => (filter.fFullName !== "" ? filtered.full_name === filter.fFullName ||
              //   filtered.course.id === filter.fCourse : filtered
              //   )).
              .map((row, index, arr) => (
             


<TablesTableRow
                  name={row.full_name}
                  logo={row.image}
                  email={row.email}
                  subdomain={row.course.id}
                  domain={row.course.name}
                  status={"Online"} //{row.enable}
                  date={row.phone}
                  isLast={index === arr.length - 1 ? true : false}
                  key={row._id}
                  userId={row._id}
                  courses={courses}
                />

       
              ))}
          </Tbody>
        
        </Table>
      </CardBody>
    );
  }
  
  export default UserListTable;
  