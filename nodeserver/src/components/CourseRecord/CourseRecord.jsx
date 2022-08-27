import { DocumentIcon } from "components/Icons/Icons";
import { Flex, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";
import IconBox from "components/Icons/IconBox";

import "./CourseRecord.css";

const CourseRecord = () => {
  return (
    <div
      className="record-card"
     
    >
      <Card minH="125px">
        <Flex direction="column">
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            w="100%"
            mb="25px"
          >
            <Stat me="auto">
              <StatLabel
                fontSize="xs"
                color="gray.400"
                fontWeight="bold"
                textTransform="uppercase"
              >
                New Clients
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" fontWeight="bold">
                  +2,503
                </StatNumber>
              </Flex>
            </Stat>
            <IconBox borderRadius="50%" as="box" h={"45px"} w={"45px"}>
              <DocumentIcon h={"24px"} w={"24px"} />
            </IconBox>
          </Flex>
          <Text color="gray.400" fontSize="sm">
            <Text as="span" color="red.500" fontWeight="bold">
              -2.82%{" "}
            </Text>
            Since last month
          </Text>
        </Flex>
      </Card>
    </div>
  );
};
export default CourseRecord;
