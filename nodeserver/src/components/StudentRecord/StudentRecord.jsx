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


const StudentRecord = ({ studentRecord, onSelect }) => {
  const { StudentName, endDate, image, startDate, teacherName } = studentRecord ;  
  return (
    <div className="record-card" onClick={()=>onSelect(StudentRecord)}>
      <Card minH="150px" >
        <Flex flexDirection="column" justifyContent="space-between">
          <Flex
            flexDirection="row"
            align="center"
            justifyContent="space-between"
          >
            <Avatar
              name={StudentName}
              src={image}
              borderRadius="12px"
              alignItems="center"
              width="50%"
              height="30%"
              objectFit="cover"
            />
            <Flex flexDirection="column" justifyContent="space-between">            
              <Text>{StudentName}</Text> 
              <Divider border="1px solid"></Divider>
              <Text mt="10px">{teacherName}</Text>
            </Flex>
          </Flex>          
        </Flex>
      </Card>
    </div>
  );
};
export default StudentRecord;
