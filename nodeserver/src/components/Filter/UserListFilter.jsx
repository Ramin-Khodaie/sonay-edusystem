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
import { UserPop2 } from "components/PopOvers/UserPopOver";

const UserListFilter = (props) => {
  const { filter, onChange, courses ,selectChange , studentStatus } = props;








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
            <Flex >
            <UserPop2 />
              <Text
                fontSize="xl"
                color={textColor}
                fontWeight="bold"
                textAlign={"right"}
                my={"10px"}
              >
                لیست کاربران{" "}
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
              <UserNameInput onChange={onChange} filter={filter} />
              <CustomSelector
                onChange={selectChange}
                data={courses}
                state={filter}
                placeHolder={"دوره کاربر را انتخاب کنید"}
                fieldId={"fCourse"}
              />
              <CustomSelector
                onChange={selectChange}
                data={studentStatus}
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

export default UserListFilter;
