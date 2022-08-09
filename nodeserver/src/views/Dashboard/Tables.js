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
  FormControl,
  Input,
  FormLabel,
  Button,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import IconBox from "components/Icons/IconBox";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import React from "react";
import { tablesProjectData, tablesTableData } from "variables/general";
import MultiSelect from "components/MultiSelect/MultiSelect";

function Tables() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [value, setValue] = React.useState("");

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
          <FormControl>
            <SimpleGrid
              style={{ direction: "rtl" }}
              columns={{ sm: 1, md: 3, xl: 3 }}
              spacing="24px"
              mb="20px"
            >
              <Box>
                <Box minH="80px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    نام کاربری
                  </FormLabel>
                  <Input
                    focusBorderColor="purple.300"
                    id="username"
                    textAlign="right"
                    variant="filled"
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder="نام کاربری خود را وارد کنید"
                    mb="5px"
                    size="lg"
                  />
                </Box>
                <Box minH="80px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    نام و نام خانوادگی{" "}
                  </FormLabel>
                  <Input
                    focusBorderColor="purple.300"
                    id="username"
                    textAlign="right"
                    variant="filled"
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder="نام کاربری خود را وارد کنید"
                    mb="5px"
                    size="lg"
                  />
                </Box>

                <Box minH="80px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    شماره تماس{" "}
                  </FormLabel>
                  <Input
                    focusBorderColor="purple.300"
                    id="username"
                    textAlign="right"
                    variant="filled"
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder="نام کاربری خود را وارد کنید"
                    mb="5px"
                    size="lg"
                  />
                </Box>

                <Box minH="80px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    دوره{" "}
                  </FormLabel>
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
              </Box>

              <Box>
                <Box minH="80px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    ایمیل{" "}
                  </FormLabel>
                  <Input
                    focusBorderColor="purple.300"
                    id="username"
                    textAlign="right"
                    variant="filled"
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder="نام کاربری خود را وارد کنید"
                    mb="5px"
                    size="lg"
                  />
                </Box>
                <Box minH="80px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    رمز عبور{" "}
                  </FormLabel>
                  <Input
                    focusBorderColor="purple.300"
                    id="username"
                    textAlign="right"
                    variant="filled"
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder="نام کاربری خود را وارد کنید"
                    mb="5px"
                    size="lg"
                  />
                </Box>
                <Box minH="80px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    تکرار رمز عبور{" "}
                  </FormLabel>
                  <Input
                    focusBorderColor="purple.300"
                    id="username"
                    textAlign="right"
                    variant="filled"
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder="نام کاربری خود را وارد کنید"
                    mb="5px"
                    size="lg"
                  />
                </Box>
              </Box>

              <Box>
                <Box minH="80px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    نقش ها{" "}
                  </FormLabel>
                  <MultiSelect />
                </Box>
              </Box>
            </SimpleGrid>
            <Button
              color={"white"}
              fontSize="20px"
              fontFamily="Lalezar"
              bg="blue.400"
              fontWeight="bold"
              h="45"
              w={{ sm: "100%", md: "15%", lg: "15%" }}
              mb={"20px"}
              type={"submit"}
            >
              ثبت
            </Button>
          </FormControl>
        </CardBody>
      </Card>

      <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Accordion
              style={{ direction: "rtl" }}
              defaultIndex={[0]}
              allowMultiple
            >
              <AccordionItem >
                <h2>
                  <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }} aria-expanded="true">
                    <Box flex="1" textAlign="left">
                      نمایش فیلتر
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>

                <Text
                  fontSize="lg"
                  color={textColor}
                  fontWeight="bold"
                  pb=".5rem"
                  my={"20px"}
                >
                  لیست کاربران
                </Text>

                <AccordionPanel pb={4}>
                  <SimpleGrid
                    style={{ direction: "rtl" }}
                    columns={{ sm: 1, md: 3, xl: 3 }}
                    spacing="24px"
                    mb="20px"
                  >
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

                    <Box></Box>
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
                  تاریخ ثبت نام
                </Th>
                <Th borderColor={borderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tablesTableData.map((row, index, arr) => {
                return (
                  <TablesTableRow
                    name={row.name}
                    logo={row.logo}
                    email={row.email}
                    subdomain={row.subdomain}
                    domain={row.domain}
                    status={row.status}
                    date={row.date}
                    isLast={index === arr.length - 1 ? true : false}
                    key={index}
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
