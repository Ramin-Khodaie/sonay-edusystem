// Chakra imports
import {
  Box,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";

import React, { useState } from "react";
import { useEffect } from "react";

import { getRecentRegistration } from "services/dashboard";
import { getRecentMark } from "services/dashboard";
import { getTopStudent } from "services/dashboard";

const AdminRecentTables = (props) => {
  const {} = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");

  const [recentReg, setRecentReg] = useState([]);
  const [recentMark, setRecentMark] = useState([]);
  const [topStudent, setTopStudent] = useState([]);

  const getRecentReg = async () => {
    await getRecentRegistration().then((res) => {
      setRecentReg(res.data.data);
    });
  };

  const getRecentMarkData = async () => {
    await getRecentMark().then((res) => {
      setRecentMark(res.data.data);
    });
  };

  const getTopStudentData = async () => {
    await getTopStudent().then((res) => {
      setTopStudent(res.data.data);
    });
  };

  useEffect(() => {
    getRecentReg();
    getRecentMarkData();
    getTopStudentData();
  }, []);

  return (
    <SimpleGrid columns={{ sm: 1, md: 3, xl: 3 }} spacing="24px" mb="20px">
      <Card p="0px" maxW="100%">
        <Text
          p="22px"
          textAlign={"right"}
          fontSize="lg"
          color={textColor}
          fontWeight="bold"
        >
          آخرین پرداختی ها
        </Text>

        <Box overflow={{ sm: "scroll", lg: "hidden" }}>
          {recentReg.length !== 0 ? (
            <Table dir="rtl">
              <Thead>
                <Tr bg={tableRowColor}>
                  <Th color="gray.400" borderColor={borderColor}>
                    نام
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    جمع پرداختی
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentReg.map((el, index, arr) => {
                  return (
                    <Tr key={index}>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        fontWeight="bold"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        {el.student.full_name}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border={index === arr.length - 1 ? "none" : null}
                        borderColor={borderColor}
                      >
                        {el.price}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          ) : 
          
          
          
          
          
          (   <Text
            textAlign={"center"}
            fontSize={"18px"}
            mb={"50px"}
            fontWeight={"bold"}
          >
            اخیرا هیچ پرداختی صورت نگرفته است
          </Text>)
          
          
          }
        </Box>
      </Card>
      <Card p="0px" maxW="100%">
        <Text
          p="22px"
          textAlign={"right"}
          fontSize="lg"
          color={textColor}
          fontWeight="bold"
        >
          آخرین نمرات
        </Text>
        {/* <Button variant="primary" maxH="30px">
                  
                </Button> */}

        <Box overflow={{ sm: "scroll", lg: "hidden" }}>
          {recentMark.length !== 0 ? (
            <Table dir="rtl">
              <Thead>
                <Tr bg={tableRowColor}>
                  <Th color="gray.400" borderColor={borderColor}>
                    نام
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    کلاس
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    جمع نمره
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {recentMark.map((el, index, arr) => {
                  return (
                    <Tr key={index}>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        fontWeight="bold"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        {el.student.name}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        {el.course.name}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        {el.sum}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          ) : (
            <Text
              textAlign={"center"}
              fontSize={"18px"}
              mb={"50px"}
              fontWeight={"bold"}
            >
              اخیرا نمره ای ثبت نشده است
            </Text>
          )}
        </Box>
      </Card>
      <Card p="0px" maxW="100%">
        <Text
          p="22px"
          textAlign={"right"}
          fontSize="lg"
          color={textColor}
          fontWeight="bold"
        >
          زبان آموزان برتر
        </Text>
        {/* <Button variant="primary" maxH="30px">
                  SEE ALL
                </Button> */}

        <Box overflow={{ sm: "scroll", lg: "hidden" }}>
          {topStudent.length !== 0 ? (
            <Table dir="rtl">
              <Thead>
                <Tr bg={tableRowColor}>
                  <Th color="gray.400" borderColor={borderColor}>
                    نام
                  </Th>

                  <Th color="gray.400" borderColor={borderColor}>
                    کلاس
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    نمره
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {topStudent.map((el, index, arr) => {
                  return (
                    <Tr key={index}>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        fontWeight="bold"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        {el.student.name}
                      </Td>

                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        {el.course.name}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        {el.sum}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          ):
          (   <Text
            textAlign={"center"}
            fontSize={"18px"}
            mb={"50px"}
            fontWeight={"bold"}
          >
زبان آموزی یافت نشد          </Text>)}
        </Box>
      </Card>
    </SimpleGrid>
  );
};

export default AdminRecentTables;
