import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Divider,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Input,
  SimpleGrid,
  Spacer,
  Checkbox,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { getRecentOrder } from "services/AdminReport";
import { getRecentRegistration } from "services/AdminReport";
import { getRecentRegistrationFilter } from "services/AdminReport";
import { getCourseDetailReport } from "services/AdminReport";
import CustomSelector from "components/Selectors/CustomSelector";
import { getTeacherList } from "services/user";
import { getCourseDetailFilter } from "services/AdminReport";

const CourseDetail = () => {
  const [data, setData] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    teacher : {"id" : "" , "name" : ""},
    deActive : false
  });

  const callData = () => {
    getCourseDetailReport().then((res) => {
      setData(res.data.data);
    });


    getTeacherList().then((teacher)=>{
        setTeacher(teacher.data.data[0])
    })
  };
  useEffect(() => {
    callData();
  }, []);

  const doSearch = async () => {
      const tmp = await getCourseDetailFilter(filter)
      setData(tmp.data.data)
  };

  const handleCheckBoxChange = (event) => {
    const field = event.target.id;
    const value = event.target.checked;
    setFilter({ ...filter, [field]: value });
  };

  useEffect(() => {
    setData(data);

    if (
      filter.name !== "" ||
      filter.teacher.id !== "" ||
      filter.deActive 
    ) {
      doSearch();
    }else{
      callData()
    }
  }, [filter]);

  
  const handleFilterChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setFilter({ ...filter, [field]: value });
  };

  return (
    <>
      <Card mt={"100px"}>
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
                    fontWeight="bold"
                    textAlign={"right"}
                    my={"10px"}
                  >
                    لیست ثبت نام های اخیر ثبت شده در سامانه{" "}
                  </Text>
                </Box>
              </Flex>

              <AccordionPanel pb={4}>
                <SimpleGrid
                  style={{ direction: "rtl" }}
                  columns={{ sm: 1, md: 2, xl: 3 }}
                  spacing="24px"
                  mb="20px"
                >
                  <Box>
                    <Text>نام کاربر:</Text>
                    <Input
                      id="name"
                      onChange={handleFilterChange}
                      focusBorderColor="purple.300"
                      textAlign="right"
                      variant="outline"
                      fontSize="sm"
                      ms="4px"
                      type="text"
                      placeholder="نام کاربر را وارد کنید"
                      size="md"
                    />
                  </Box>

                  <Box>
                  <Text>
                 دبیر دوره:
                </Text>
                <CustomSelector
                  onChange={setFilter}
                  data={teacher}
                  state={filter}
                  placeHolder={"دبیر دوره را انتخاب کنید"}
                  fieldId={"teacher"}
                />
                  </Box>

                  <Box>
                   
                  <Checkbox
                    onChange={handleCheckBoxChange}
                    id="deActive"
                    size={"lg"}
                  >
                فقط دوره های غیر فعال{" "}
                  </Checkbox>



                  </Box>

                  {/* <Checkbox onChange={handleCheckBoxChange} id="isMain" size={"lg"} >
  فقط محصولات اصلی                </Checkbox> */}
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Card>

      <Card mt={"30px"}>
        <TableContainer>
          <Table dir="rtl" variant="striped" colorScheme="gray">
            <TableCaption>لیست ثبت نام های اخیر</TableCaption>
            <Thead>
              <Tr>
                <Th>نام دوره</Th>
                <Th>نام زبان آموز</Th>
                <Th>قیمت </Th>
                <Th>دبیر</Th>
                <Th>دوره فعال است؟</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((itm, id) => (
                <Tr>
                  <Td>{itm.name}</Td>
                  <Td>
                    {itm.student.map((st, index, arr) => (
                      <>
                        <Text py={"5px"}>{st.full_name}</Text>

                        {index !== arr.length - 1 && (
                          <hr style={{ color: "gray" }}></hr>
                        )}
                      </>
                    ))}
                  </Td>
                  <Td>{itm.price}ریال</Td>
                  <Td>
                    {itm.teacher.length !== 0 && itm.teacher[0].full_name}
                  </Td>
                  <Td>{itm.status.id === "active" ? "هست" : "نیست"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};
export default CourseDetail;
