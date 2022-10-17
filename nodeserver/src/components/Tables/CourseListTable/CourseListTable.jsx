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
    const { data, courses ,statusData,callData } = props;
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
              دوره قبلی
            </Th>
            <Th borderColor={borderColor} color="gray.400">
              وضعیت
            </Th>

            <Th borderColor={borderColor} color="gray.400">
              دبیر
            </Th>
            <Th borderColor={borderColor} color="gray.400">
            شهریه
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
                prevCourse={row.prev_course.name}
                status={row.status.id} //{row.enable}
                teacher={ row.teacher.length === 0 ? "انتخاب نشده" : row.teacher[0].full_name}
                teacherUserName={ row.teacher.length === 0 ? "" : row.teacher[0].username}
                // teacherImage={row.teacher.image}
                // teacherUserName={row.teacher.username}
                price={row.price}
                isLast={index === arr.length - 1 ? true : false}
                key={row._id}
                courseId={row._id}
                courses={courses}
                statusData={statusData}
                callData={callData}
              />
            );
          })}
        </Tbody>
      </Table>


    );
  }
  
  export default CourseListTable;
  