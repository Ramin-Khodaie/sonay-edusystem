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
  Box,
} from "@chakra-ui/react";

// Custom components

import React from "react";
import { useState } from "react";
import CourseListTableRow from "./CourseListTableRow";
function CourseListTable(props) {
  const { data, courses, statusData, callData, handleDelete } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [show, setShow] = useState(false);
  const handleShowModal = (st) => {
    setShow(st);
  };
  return (
    <Box style={{ direction: "rtl" }} maxW={"100%"} overflowX={{ sm: "scroll", xl: "hidden" }}>
      <Table style={{ direction: "rtl" }} variant="simple" color={textColor}>
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
            <Th borderColor={borderColor} color="gray.400">
              حذف
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
                teacher={
                  row.teacher.length === 0
                    ? "انتخاب نشده"
                    : row.teacher[0].full_name
                }
                teacherUserName={
                  row.teacher.length === 0 ? "" : row.teacher[0].username
                }
                // teacherImage={row.teacher.image}
                // teacherUserName={row.teacher.username}
                price={row.price}
                isLast={index === arr.length - 1 ? true : false}
                key={row._id}
                courseId={row._id}
                courses={courses}
                statusData={statusData}
                callData={callData}
                handleDelete={handleDelete}
              />
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

export default CourseListTable;
