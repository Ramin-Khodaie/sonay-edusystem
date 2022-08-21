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
import CourseSelector from "components/Selectors/CourseSelector";
import StudentStatusSelector from "components/Selectors/StudentStatusSelector";
import UserNameInput from "components/Selectors/UserNameInput";
import React, { useEffect } from "react";
import { userListAction } from "redux/user/UserList/UserListAction";
import { connect, useDispatch, useSelector } from "react-redux";

const UserListFilter = (props) => {
  const {filter , onChange} = props
  const dispatch = useDispatch();



  const getUSerList = async () => {
    
    const filters = {

    full_name: filter.fFullName,
    course: filter.fCourse,
    status: filter.fStatus
    }
    await dispatch(userListAction(filters)); 
  };


useEffect(() => {
  getUSerList()
} , [])



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
              <UserNameInput
                onChange={onChange}
                filter={filter}
              />
              <CourseSelector
                onChange={onChange}
                filter={filter}
              />
              <StudentStatusSelector
                onChange={onChange}
                filter={filter}
              />
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default UserListFilter;
