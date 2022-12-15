import {
  Avatar,
  Badge,
  Button,
  Flex,
  Icon,
  IconButton,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import CourseEditModal from "components/Modal/courseEdit";
import { CloseIcon } from "@chakra-ui/icons";
import DeleteConfirmModal from "components/Modal/deleteConfirmModal";
import { useState } from "react";
import { FaImage, FaPencilAlt } from "react-icons/fa";
import UploadModal from "components/Modal/uploadModal";

function CourseListTableRow(props) {
  const {
    name,
    imageId,
    prevCourse,
    status,
    teacher,
    teacherImage,
    callData,
    teacherUserName,
    price,
    isLast,
    key,
    courseId,
    courses,
    statusData,
    handleDelete,
  } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [state, setState] = useState({
    remove: false,
    edit: false,
    image: false,
  });
  const handleShowUploadModal = (st) => {
    setState({ ...state, image: st });
  };
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
            {prevCourse}
          </Text>
          {/* <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {subdomain}
            </Text> */}
        </Flex>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Badge
          bg={status === "active" ? "green.400" : bgStatus}
          color={"white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status === "active" ? "فعال" : "غیرفعال"}
        </Badge>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {teacher}
        </Text>
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {teacherUserName}
        </Text>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {price} ریال
        </Text>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
<Flex>
<IconButton
          background={"none"}
          icon={<FaPencilAlt />}
          onClick={() => handleShowEditModal(true)}
        ></IconButton>
        {state.edit && (
          <CourseEditModal
            courseId={courseId}
            courses={courses}
            statusData={statusData}
            callData={callData}
            handleShowModal={handleShowEditModal}
            show={state.edit}
          />
        )}
        <IconButton
          background={"none"}
          fontSize={"24px"}
          color="yellow"
          icon={<FaImage />}
          onClick={() => handleShowUploadModal(true)}
        />
        {state.image && (
          <UploadModal
            handleShowModal={handleShowUploadModal}
            show={state.image}
            imageId={imageId}
            _id={courseId}
          />
        )}{" "}
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
            _id={courseId}
          />
        )}{" "}
</Flex>
      </Td>
    </Tr>
  );
}

export default CourseListTableRow;
