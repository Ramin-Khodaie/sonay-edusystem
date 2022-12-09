import {
  Avatar,
  Badge,
  Button,
  Flex,
  IconButton,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

import MarkEditModal from "components/Modal/MarkEdit";
import DeleteConfirmModal from "components/Modal/deleteConfirmModal";
import { useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { FaPencilAlt } from "react-icons/fa";

function MarkListTableRow(props) {
  const {
    name,
    logo,
    sum,
    status,
    date,
    course,
    isLast,
    key,
    markId,
    selectedCourse,
    selectedStudent,
    markList,
    setMarkList,
    myStudents,
    setmyStudents,
    handleDelete,
  } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const [state, setState] = useState({
    remove: false,
    edit: false,
  });

  const handleShowRemoveModal = (st) => {
    setState({ ...state, remove: st });
  };
  const handleShowEditModal = (st) => {
    setState({ ...state, edit: st });
  };
  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : null}
      >
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={titleColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {sum}
          </Text>
          {/* <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {subdomain}
              </Text> */}
        </Flex>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Badge
          bg={status === "failed" ? "red.500" : "green.400"}
          color={"white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status === "failed" ? "مردود" : "قبول"}
        </Badge>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {date}
        </Text>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        {course.name}
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <IconButton
          background={"none"}
          icon={<FaPencilAlt />}
          onClick={() => handleShowEditModal(true)}
        ></IconButton>
        {state.edit && (
          <MarkEditModal
            markList={markList}
            setMarkList={setMarkList}
            selectedCourse={selectedCourse}
            selectedStudent={selectedStudent}
            markId={markId}
            myStudents={myStudents}
            setmyStudents={setmyStudents}
            handleDelete={handleDelete}
            handleShowModal={handleShowEditModal}
            show={state.edit}
          />
        )}
        <IconButton
          background={"none"}
          color="red"
          onClick={() => handleShowRemoveModal(true)}
          icon={<CloseIcon />}
        ></IconButton>
        {state.remove && (
          <DeleteConfirmModal
            show={state.remove}
            handleShowModal={handleShowRemoveModal}
            handleDelete={handleDelete}
            _id={markId}
          />
        )}{" "}
      </Td>
    </Tr>
  );
}

export default MarkListTableRow;
