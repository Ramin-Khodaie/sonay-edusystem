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
import UserForm from "components/Forms/userForm";
import TablesTableRow from "components/Tables/TablesTableRow";
import { useUserList } from "hooks/users/useUserList";
import React from "react";


function Tables() {

  const [sent, setSent] = React.useState({
    status: false,
    sending: false,
  });

  const handleSent = (sentObj)=>{
    setSent(
      sentObj
    )
  }

  
  
  
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const userList = useUserList(sent.status);

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

          <UserForm changeSent={handleSent} sent={sent} />
         
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
                      لیست کاربران{" "}
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
                        focusBorderColor="purple.300"
                        id="username"
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
                        placeholder="دوره کاربر را انتخاب کنید"
                      >
                        <option value="jk">"first"</option>
                        <option value="jk">"first"</option>
                        <option value="jk">"first"</option>
                        <option value="jk">"first"</option>
                      </Select>
                    </Box>

                    <Box>
                      <Select
                        focusBorderColor="purple.300"
                        textAlign={"center"}
                        placeholder="وضعیت کاربر را انتخاب کنید"
                      >
                        <option value="jk">"first"</option>
                        <option value="jk">"first"</option>
                        <option value="jk">"first"</option>
                        <option value="jk">"first"</option>
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
              {userList.map((row, index, arr) => {
                return (
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
                    changeSent={handleSent}
                    sent={sent}
                    userId={row._id}
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

export default Tables;
