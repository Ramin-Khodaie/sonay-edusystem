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
  import TablesTableRow from "components/Tables/TablesTableRow";
  import UserListFilter from "components/Filter/UserListFilter";
  import React, { useEffect, useState } from "react";
  import UserListTableRow from "components/Tables/UserListTable/UserListTableRow";
import CourseListTableRow from "./CourseListTableRow";
  function CourseListTable(props) {
    const { data, courses ,statusData } = props;
  
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
  
    return (
    

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
          {data.map((row, index, arr) => {
            return (
              <CourseListTableRow
                name={row.name}
                logo={row.image}
                subdomain={"hi"}
                domain={row.next_course.name}
                status={"Online"} //{row.enable}
                date={"اشراقی"}
                isLast={index === arr.length - 1 ? true : false}
                key={row._id}
                courseId={row._id}
                courses={courses}
                statusData={statusData}
              />
            );
          })}
        </Tbody>
      </Table>


    );
  }
  
  export default CourseListTable;
  