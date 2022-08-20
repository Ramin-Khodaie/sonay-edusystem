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
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import UserForm from "components/Forms/userForm";
import TablesTableRow from "components/Tables/TablesTableRow";
import UserListFilter from "components/UserListFilter/UserListFilter";
import React from "react";
import { useDispatch, useSelector } from "react-redux";



const Users = () => {



const [filter, setFilter] = React.useState({
  fFullName: "",
  fCourse: "",
  fStatus: ""
})

  const courses = [
    { id: "0", name: "کلاس ۱" },
    { id: "2", name: "کلاس ۲" },
    { id: "3", name: "کلاس ۳" },
  ];

 
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const { userList ,errorMessage , isPending  } = useSelector(
    (state) => state.userList
  );
//  const filteredUserlist = userList.filter((i)=> i.full_name === filter.fFullName && i.course.id === filter.fCourse)
console.log(11, filter)
console.log(55,userList)
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

          <UserForm  courses={courses} />

        </CardBody>
      </Card>

      <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Accordion allowToggle>
              <AccordionItem>
                <UserListFilter filter={filter} setFilter={setFilter} />

              </AccordionItem>
            </Accordion>
          </Flex>
        </CardHeader>
        <CardBody>
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
            <Tbody>
              {
                userList.filter((filtered) => (filtered.full_name === filter.fFullName &&
                  filtered.course.id === filter.fCourse
                  )).map(
                  (row,index,arr) => <TablesTableRow
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
                )
              }
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Users;
