import { Table, Tr, Td, TableCaption, Thead, Th, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";

const WorkbookTable = () => {
  const workbook = {
    course: "IELTS",
    studentName: "jafar azhdari",
    totalWork: "out_standing",
    classActiviy: "20.1",
    quizzes: "9.2",
    midterm: "4.5",
    final: "6.8",
    totalMark: "80",
  };
  return (
    <Card
      alignSelf="flex-start"
      
      my="50px"
      maxW="45%"
      overflowX={{ sm: "scroll", xl: "hidden" }}
      pb="0px"
    >
      <Table>
        <Thead>
          <Th colSpan="2" p="5" textAlign="center">
            <Text fontWeight="800" fontSize="2xl">
              Workbook
            </Text>
          </Th>
        </Thead>
        <Tr>
          <Td>Course</Td>
          <Td>{workbook.course}</Td>
        </Tr>
        <Tr>
          <Td>Student Name</Td>
          <Td>{workbook.studentName}</Td>
        </Tr>
        <Tr>
          <Td>Total Work</Td>
          <Td>{workbook.totalWork}</Td>
        </Tr>
        <Tr>
          <Td>Class Activity</Td>
          <Td>{workbook.classActiviy}</Td>
        </Tr>
        <Tr>
          <Td>Quizzes</Td>
          <Td>{workbook.quizzes}</Td>
        </Tr>
        <Tr>
          <Td>Midterm</Td>
          <Td>{workbook.midterm}</Td>
        </Tr>
        <Tr>
          <Td>Final</Td>
          <Td>{workbook.final}</Td>
        </Tr>
        <Tr>
          <Td>Total Mark</Td>
          <Td>{workbook.totalMark}</Td>
        </Tr>
      </Table>
    </Card>
  );
};

export default WorkbookTable;
