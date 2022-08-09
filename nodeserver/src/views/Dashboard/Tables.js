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
  Spacer,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesTableRow from "components/Tables/TablesTableRow";
import React from "react";
import { tablesTableData } from "variables/general";
import MultiSelect from "components/MultiSelect/MultiSelect";
import useNotify from "helpers/notify/useNotify";

function Tables() {
  const notify = useNotify();
  const data = [
    { id: "teacher", name: "دبیر" },
    { id: "student", name: "دانش آموز" },
    { id: "manager", name: "مدیر" },
  ];
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const [formData, setFormData] = React.useState({
    username: "",
    full_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    course: "",
    roles: [],
  });

  const handleChange = (event) => {
    const field = event.target.id;
    const value = event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleOptionChange = (e) => {
    const newOpt = data.find((f) => f.id === e.target.value);

    formData.roles.findIndex((itm) => itm.id == newOpt.id) === -1
      ? setFormData({ ...formData, roles: [...formData.roles, newOpt] })
      : notify("این آیتم قبلا انتخاب شده است", true, "solid", "warning");
  };

  const handleDelete = (id) => (e) => {
    const cc = formData.roles.filter((element) => {
      return element.id !== id;
    });
    setFormData({ ...formData, roles: cc });
  };

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
                    handleChange={handleChange}
                    focusBorderColor="purple.300"
                    id="username"
                    textAlign="right"
                    variant="filled"
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder="نام کاربری را وارد کنید"
                    mb="5px"
                    size="lg"
                  />
                </Box>
                <Box minH="80px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    نام و نام خانوادگی{" "}
                  </FormLabel>
                  <Input
                    handleChange={handleChange}
                    focusBorderColor="purple.300"
                    id="full_name"
                    textAlign="right"
                    variant="filled"
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder="نام و نام خانوادگی را وارد کنید"
                    mb="5px"
                    size="lg"
                  />
                </Box>

                <Box minH="80px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    شماره تماس{" "}
                  </FormLabel>
                  <Input
                    handleChange={handleChange}
                    focusBorderColor="purple.300"
                    id="phone"
                    textAlign="right"
                    variant="filled"
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder=" شماره تماس را وارد کنید"
                    mb="5px"
                    size="lg"
                  />
                </Box>

                <Box minH="80px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    دوره{" "}
                  </FormLabel>
                  <Select
                    handleChange={handleChange}
                    id="course"
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
                    handleChange={handleChange}
                    focusBorderColor="purple.300"
                    id="email"
                    textAlign="right"
                    variant="filled"
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder="‌ایمیل را وارد کنید"
                    mb="5px"
                    size="lg"
                  />
                </Box>
                <Box minH="80px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    رمز عبور{" "}
                  </FormLabel>
                  <Input
                    handleChange={handleChange}
                    focusBorderColor="purple.300"
                    id="password"
                    textAlign="right"
                    variant="filled"
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder="رمز عبور را وارد کنید"
                    mb="5px"
                    size="lg"
                  />
                </Box>
                <Box minH="80px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    تکرار رمز عبور{" "}
                  </FormLabel>
                  <Input
                    handleChange={handleChange}
                    focusBorderColor="purple.300"
                    id="username"
                    textAlign="right"
                    variant="filled"
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder="تکرار رمز را وارد کنید"
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
                  <MultiSelect
                    handleChange={handleOptionChange}
                    handleDelete={handleDelete}
                    data={data}
                    options={formData.roles}
                  />
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
                        mb="5px"
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
