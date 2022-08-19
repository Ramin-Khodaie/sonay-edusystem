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
    Box,
    Input,
    Select,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Spacer,
  } from "@chakra-ui/react";
  
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
import CourseForm from "components/Forms/courseForm";
  import UserForm from "components/Forms/userForm";
  import TablesTableRow from "components/Tables/TablesTableRow";
import { useCourseList } from "hooks/users/useCourseList";
  import { useUserList } from "hooks/users/useUserList";
  import React from "react";
  
  
  function Courses() {
  
  
    const courses = [
      { id: "1", name: "کلاس ۱" },
      { id: "2", name: "کلاس ۲" },
      { id: "3", name: "کلاس ۳" },
    ];
  
    const status = [
      { id: "onlinr", name: "آنلاین" },
      { id: "ofline", name: "آفلاین" },
    ];
  
    const [sent, setSent] = React.useState({
      status: false,
      sending: false,
    });
  
  
    const [filter, setFilter] = React.useState({
      fFullName : "",
      fCourse : "",
      fStatus : ""
    })
  
    const handleSent = (sentObj)=>{
      setSent(
        sentObj
      )
    }
  
    const handleFilterChange = (e)=>{
      const field = e.target.id;
      const value = e.target.value;
      setFilter({ ...filter, [field]: value });
    }
  
    
    
    
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const courseList = useCourseList(sent.status ,{
      full_name : filter.fFullName,

      status : filter.fStatus
    }, filter);
  
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
              ثبت دوره جدید
            </Text>
          </CardHeader>
  
          <CardBody>
  
            <CourseForm changeSent={handleSent} sent={sent} courses={courses} />
           
          </CardBody>
        </Card>
  
        <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex direction="column">
              <Accordion allowToggle>
                <AccordionItem>
                  <Flex>
                    <Box>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            {" "}
                            نمایش فیلتر ها{" "}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>{" "}
                    </Box>
                    <Spacer />
                    <Box>
                      <Text
                        fontSize="xl"
                        color={textColor}
                        fontWeight="bold"
                        textAlign={"right"}
                        my={"10px"}
                      >
                        لیست دوره ها{" "}
                      </Text>
                    </Box>
                  </Flex>
  
                  <AccordionPanel pb={4}>
                    <SimpleGrid
                      style={{ direction: "rtl" }}
                      columns={{ sm: 1, md: 3, xl: 3 }}
                      spacing="24px"
                      mb="20px"
                    >
                      <Box>
                        <Input
                        id="fFullName"
                        onChange={handleFilterChange}
                          focusBorderColor="purple.300"
                          textAlign="right"
                          variant="outline"
                          fontSize="sm"
                          ms="4px"
                          type="text"
                          placeholder="نام و نام خانوادگی را وارد کنید"
                          mb="10px"
                          size="md"
                        />
                      </Box>
  
                      <Box>
                        <Select
                          focusBorderColor="purple.300"
                          textAlign={"center"}
                          placeholder="وضعیت کاربر را انتخاب کنید"
  
                          id="fStatus"
                          onChange={handleFilterChange}
                        >
                          {
                            status.map((d)=>(
                              <option value={d.id}>{d.name}</option>
                            ))
                          }
                        </Select>
                      </Box>
                    </SimpleGrid>
                  </AccordionPanel>
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
                    نام دوره
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    دوره بعدی
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    وضعیت
                  </Th>
              
                  <Th borderColor={borderColor}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {courseList.map((row, index, arr) => {
                  console.log(courseList)
                  return (
                    <TablesTableRow
                    name={row.course_name}
                    logo={row.image}
                    subdomain={"hi"}
                    domain={row.next_course.name}
                    status={"Online"} //{row.enable}
            
                    isLast={index === arr.length - 1 ? true : false}
                    key={row._id}
                    changeSent={handleSent}
                    sent={sent}
                    userId={row._id}
                    courses={courses}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Flex>
    );
  }
  
  export default Courses;
  