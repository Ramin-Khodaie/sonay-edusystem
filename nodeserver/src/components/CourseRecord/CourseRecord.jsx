import { DocumentIcon } from "components/Icons/Icons";
import {
  Avatar,
  Divider,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import IconBox from "components/Icons/IconBox";

import "./CourseRecord.css";

const CourseRecord = ({ courserecord }) => {
  const { courseName, endDate, image, startDate, teacherName } = courserecord;
  console.log(courserecord);
  return (
    <div className="record-card">
      <Card minH="150px" >
        <Flex flexDirection="column" justifyContent="space-between">
          <Flex
            flexDirection="row"
            align="center"
            justifyContent="space-between"
          >
            <Avatar
              name={courseName}
              src={image}
              borderRadius="12px"
              alignItems="center"
              width="50%"
              height="30%"
              objectFit="cover"
            />
            <Flex flexDirection="column" justifyContent="space-between">            
              <Text>{courseName}</Text>
              <Divider border="1px solid"></Divider>
              <Text mt="10px">{teacherName}</Text>
            </Flex>
          </Flex>          
        </Flex>
      </Card>
    </div>
  );
};
export default CourseRecord;
