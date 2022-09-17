import { Table, Tr, Td, TableCaption, Thead, Th, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";

const WorkbookTable = () => {
  const workbook = {
    course: "IELTS",
    studentName: "jafar azhdari",
    totalWork: "out_standing",
    classActivity: "20.1",
    quizzes: "9.2",
    midterm: "4.5",
    final: "6.8",
    totalMark: "80",
  };
  return (
    <Card
      alignSelf="flex-start"
      
    
      maxW="100%"
      
      height={'100%'}
      overflowX={{ sm: "scroll", xl: "hidden" }}

    >
      <Table mt={"15px"} >
        <Thead >
          <Th colSpan="2"  textAlign="center">
            <Text pb="15px" fontWeight="800" fontSize="2xl">
              Workbook
            </Text>
          </Th>
        </Thead>
        <Tr fontSize={'20px'}>
          <Td>Course</Td>
          <Td>{workbook.course}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>Student Name</Td>
          <Td>{workbook.studentName}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>Total Work</Td>
          <Td>{workbook.totalWork}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>Class Activity</Td>
          <Td>{workbook.classActivity}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>Quizzes</Td>
          <Td>{workbook.quizzes}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>Midterm</Td>
          <Td>{workbook.midterm}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>Final</Td>
          <Td>{workbook.final}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>Total Mark</Td>
          <Td>{workbook.totalMark}</Td>
        </Tr>
      </Table>
    </Card>
  );
};

export default WorkbookTable;
