import { Table, Tr, Td, TableCaption, Thead, Th, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";

const WorkbookTable = (props) => {
  const {selectedMark} = props
  // const workbook = {
  //   course: "IELTS",
  //   studentName: "jafar azhdari",
  //   totalWork: "out_standing",
  //   classActivity: "20.1",
  //   quizzes: "9.2",
  //   midterm: "4.5",
  //   final: "6.8",
  //   totalMark: "80",
  // };
  console.log(selectedMark , 1212)
  return (
    <Card
      alignSelf="flex-start"
      
    
      maxW="100%"
      
      height={'100%'}
      overflowX={{ sm: "scroll", xl: "hidden" }}

    >
      <Table mt={"15px"} dir='rtl'>
      <TableCaption>

{
  selectedMark.status === 'passed' ? 
  'زبان آموز با موفقیت این دوره را گذرانده و نمره قبولی را کسب کرده است'
  :
  'متاسفانه زبان آموز نمره قبولی برای گذراندن این ترم را کسب نکره است'
}

      </TableCaption>
        <Thead >
          <Th colSpan="2"  textAlign="center">
            <Text pb="15px" fontWeight="800" fontSize="2xl">
              کارنامه
            </Text>
          </Th>
        </Thead>
        <Tr fontSize={'20px'}>
          <Td>دوره</Td>
          <Td>{selectedMark.course.name}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>نام و نام خانوداگی</Td>
          <Td>{selectedMark.student.name}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>وضعیت کلی</Td>
          <Td>{selectedMark.status}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>فعالیت کلاسی</Td>
          <Td>{selectedMark.classActivity}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>کوییز</Td>
          <Td>{selectedMark.quiz}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>نمره اضافی</Td>
          <Td>{selectedMark.extra}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>میانترم</Td>
          <Td>{selectedMark.midterm}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>فاینال</Td>
          <Td>{selectedMark.final}</Td>
        </Tr>
        <Tr fontSize={'20px'}>
          <Td>نمره نهایی</Td>
          <Td>{selectedMark.sum}</Td>
        </Tr>
      </Table>
    </Card>
  );
};

export default WorkbookTable;
