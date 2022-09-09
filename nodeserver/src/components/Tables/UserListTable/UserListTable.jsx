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
import React from "react";
import UserListTableRow from "components/Tables/UserListTable/UserListTableRow";
function UserListTable(props) {
  const { data, courses } = props;

  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  console.log(data,544)
  return (
    <CardBody>
      <Table style={{ direction: "rtl" }} variant="simple" color={textColor}>
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

        <Tbody>
          {data
            // filter((filtered) => (filter.fFullName !== "" ? filtered.full_name === filter.fFullName ||
            //   filtered.course.id === filter.fCourse : filtered
            //   )).
            .map((row, index, arr) => (
              <UserListTableRow
                name={row.full_name}
                logo={row.image}
                email={row.email}
              
                domain={row.courses}
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
