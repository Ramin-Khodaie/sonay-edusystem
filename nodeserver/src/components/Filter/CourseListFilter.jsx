import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Input,
    Select,
    SimpleGrid,
    Spacer,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import CustomSelector from "components/Selectors/CustomSelector";
  import StudentStatusSelector from "components/Selectors/StudentStatusSelector";
  import UserNameInput from "components/Selectors/UserNameInput";
  import React, { useEffect } from "react";
  import { userListAction } from "redux/user/UserList/UserListAction";
  import { connect, useDispatch, useSelector } from "react-redux";
import { CoursePop2 } from "components/PopOvers/CoursePopOver";
  
  const CourseListFilter = (props) => {
    const { filter, onChange, courses ,selectChange , courseStatus , teacher } = props;
  
    const textColor = useColorModeValue("gray.700", "white");
  
    return (
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
              <Flex>
              <CoursePop2 />
                <Text
                  fontSize="xl"
                  color={textColor}
                  fontWeight="bold"
                  textAlign={"right"}
                  my={"10px"}
                >
                  لیست دوره ها{" "}
                </Text>
     
              </Flex>
            </Flex>
  
            <AccordionPanel pb={4}>
              <SimpleGrid
                style={{ direction: "rtl" }}
                columns={{ sm: 1, md: 3, xl: 3 }}
                spacing="24px"
                mb="20px"
              >
                <Input
                id="fFullName"
                onChange={onChange}
                focusBorderColor="purple.300"
                textAlign="right"
                variant="outline"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="نام دوره را وارد کنید"
                mb="10px"
                size="md"
            />
                <CustomSelector
                  onChange={selectChange}
                  data={teacher}
                  state={filter}
                  placeHolder={"دبیر دوره را انتخاب کنید"}
                  fieldId={"fTeacher"}
                />
                <CustomSelector
                  onChange={selectChange}
                  data={courseStatus}
                  state={filter}
                  placeHolder={"وضعیت کاربر را انتخاب کنید"}
                  fieldId={"fStatus"}
                />
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    );
  };
  
  export default CourseListFilter;
  