import { DocumentIcon } from "components/Icons/Icons";
import {
  Avatar,
  Divider,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Spacer,
  Box,
  useColorMode,
  Grid,
  Badge,
  useDisclosure,
  GridItem,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import Card from "components/Card/Card";
import IconBox from "components/Icons/IconBox";
import { StarIcon } from "@chakra-ui/icons";
import MarkEditModal from "components/Modal/MarkEdit";
import MarkForm from "components/Forms/markForm";
// onClick={()=>handleStudentSelect(_id, full_name)}
const StudentRecord = ({
  studentRecord,
  handleStudentSelect,
  selectedItems,
  markList,
  setMarkList,
  myStudents,
  setmyStudents
}) => {
  const { full_name, _id, courses ,average_mark } = studentRecord;

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleOpenCard = () => {
    handleStudentSelect(_id, full_name);
    onOpen();
  };

  const { colorMode } = useColorMode();
  return (
    <div className="record-card" onClick={handleOpenCard}>
      <SimpleGrid
        w={{ sm: "250px", md: "250px", lg: "320px" }}
        h="120px"
        borderWidth="1px"
        borderRadius="2rem"
        overflow="hidden"
        bg={colorMode === "light" ? "white" : "navy.700"}
        _hover={
          colorMode === "light"
            ? {
                background: "gray.200",
                color: "black",
                transition: "0.5s",
              }
            : {
                background: "navy.300",
                color: "navy.600",
                transition: "0.5s",
              }
        }
        spacing={0}
        columns={3}
      >
        <Box>
          <Avatar my={"20px"} ml={"10px"} size="lg" name={full_name} />
        </Box>

        <Box textAlign={"center"}>
          <Text fontFamily={"Lalezar"} pt={"5px"} fontSize={"xl"}>
            {full_name}
          </Text>
          <Divider />
          <Text textAlign={"center"} fontSize={"sm"}>
            {courses[0].name}
          </Text>
          {average_mark > 95 &&
          <Badge colorScheme="purple">شاگرد ممتاز</Badge>}
          <Text fontSize={"sm"}>معدل کل : {average_mark}</Text>
        </Box>
      </SimpleGrid>

      <Modal
        size={"5xl"}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pt={"25px"}>
            <MarkForm
              markList={markList}
              setMarkList={setMarkList}
              myStudents={myStudents}
              setmyStudents={setmyStudents}
              selectedCourse={selectedItems.course}
              selectedStudent={selectedItems.student}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default StudentRecord;
