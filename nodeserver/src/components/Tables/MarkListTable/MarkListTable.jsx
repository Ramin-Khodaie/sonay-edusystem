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
import CardBody from "components/Card/CardBody.js";

import React, { useEffect, useState } from "react";
import MarkListTableRow from "./MarkListTableRows";
function MarkListTable(props) {
  const { data , markList , setMarkList , myStudents , setmyStudents ,handleDelete  } = props;

  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <CardBody style={{ direction: "rtl" }} maxW={"100%"} overflowX={{ sm: "scroll", xl: "hidden" }}>
      <Table style={{ direction: "rtl" }} variant="simple" color={textColor}>
        <Thead>
          <Tr my=".8rem" pl="0px" color="gray.400">
            <Th pl="0px" borderColor={borderColor} color="gray.400">
              نام کاربر
            </Th>
            <Th borderColor={borderColor} color="gray.400">
              نمره نهایی{" "}
            </Th>
            <Th borderColor={borderColor} color="gray.400">
              وضعیت
            </Th>


            <Th borderColor={borderColor} color="gray.400">
              تاریخ{" "}
            </Th>
            <Th borderColor={borderColor} color="gray.400">
              کلاس{" "}
            </Th>
            <Th borderColor={borderColor}>ویرایش</Th>
          </Tr>
        </Thead>

        <Tbody>
          {data
            // filter((filtered) => (filter.fFullName !== "" ? filtered.full_name === filter.fFullName ||
            //   filtered.course.id === filter.fCourse : filtered
            //   )).
            .map((row, index, arr) => (
              <MarkListTableRow
              markList={markList}
              setMarkList={setMarkList}
              myStudents={myStudents}
              setmyStudents={setmyStudents}
                name={row.student.name}
                logo={row.image}
                sum={row.sum}
                status={row.status}
                date={row.date}
                course={row.course}
                isLast={index === arr.length - 1 ? true : false}
                key={row._id}
                markId={row._id}
                selectedCourse={{"id" : row.course._id , "name" : row.course.name}}
                selectedStudent={{"id" : row.student._id , "name" : row.student.name}}
                handleDelete={handleDelete}
              />
            ))}
        </Tbody>
      </Table>
    </CardBody>
  );
}

export default MarkListTable;
