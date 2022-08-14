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
} from "@chakra-ui/react";
import React from "react";

const UserListFilter = () => {
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
                placeholder="دوره کاربر را انتخاب کنید"
                id="fCourse"
                onChange={handleFilterChange}
              >
                {courses.map((d) => (
                  <option value={d.id}>{d.name}</option>
                ))}
              </Select>
            </Box>

            <Box>
              <Select
                focusBorderColor="purple.300"
                textAlign={"center"}
                placeholder="وضعیت کاربر را انتخاب کنید"
                id="fStatus"
                onChange={handleFilterChange}
              >
                {status.map((d) => (
                  <option value={d.id}>{d.name}</option>
                ))}
              </Select>
            </Box>
          </SimpleGrid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </Flex>;
};

export default UserListFilter;