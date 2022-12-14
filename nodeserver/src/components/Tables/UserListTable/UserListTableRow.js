import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  IconButton,
  Spacer,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UserEditModal from "components/Modal/userEdit";
import DeleteConfirmModal from "components/Modal/deleteConfirmModal";
import EnableConfirmModal from "components/Modal/enableConfirmModal";
import { CloseIcon } from "@chakra-ui/icons";
import { FaImage, FaPencilAlt, FaUserCheck, FaUserMinus } from "react-icons/fa";
import UploadModal from "components/Modal/uploadModal";
import ProfileCard from "components/Modal/profileCardModal";

function UserListTableRow(props) {
  const {
    userList,
    setUserList,
    handleDelete,
    handleEnable,
    imageId,
    name,
    email,
    domain,
    role,
    date,
    isLast,
    changeSent,
    sent,
    userId,
    username,
    courses,
    isEnable,
  } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [state, setState] = useState({
    remove: false,
    edit: false,
    image: false,
    enable: false,
    profile : false
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

  const handleShowEnableModal = (st) => {
    setState({ ...state, enable: st });
  };

  const handleShowProfileModal = (st) => {
    console.log("dsfsdf")
    setState({ ...state, profile: st });
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
              onClick={() => handleShowProfileModal(true)}
              
            >
              {name}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {username}
            </Text>


            {state.profile && <ProfileCard 
          
          handleShowModal={handleShowEditModal}
          show={state.profile}
        />}

          </Flex>
        </Flex>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Flex
          minW={"200px"}
          maxH={"100px"}
          overflowY={"scroll"}
          direction="column"
        >
          {domain.map((itm, id) => (
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {itm.name}
            </Text>
          ))}
        </Flex>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Box>
          <Badge
            bg={
              role.id === "student"
                ? "green.400"
                : role.id === "teacher"
                ? "blue.400"
                : role.id === "admin"
                ? "yellow.400"
                : bgStatus
            }
            color={role.id === "Online" ? "white" : "white"}
            fontSize="16px"
            p="3px 10px"
            mx="5px"
            borderRadius="8px"
          >
            {role.name}
          </Badge>
        </Box>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {date}
        </Text>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
      <IconButton  background={'none'} icon={<FaPencilAlt />} onClick={() => handleShowEditModal(true)}></IconButton>

       {state.edit && <UserEditModal
          userList={userList}
          setUserList={setUserList}
          changeSent={changeSent}
          sent={sent}
          userId={userId}
          courses={courses}
          handleShowModal={handleShowEditModal}
            show={state.edit}
        />}




        

<IconButton
fontSize={'24px'}
            background={"none"}
            color="yellow"
            icon={<FaImage />}
            onClick={() => handleShowUploadModal(true)}
          />
          {state.image && (
            <UploadModal
              handleShowModal={handleShowUploadModal}
              show={state.image}
              imageId={imageId}
              _id={userId}
            />
          )}{" "}



{
          isEnable ? 
          <IconButton
          fontSize={'24px'}
            background={"none"}
            color="green"
            icon={<FaUserCheck />}
            onClick={() => handleShowEnableModal(true)}
          />:
          <IconButton
          fontSize={'24px'}
            background={"none"}
            color="red"
            icon={<FaUserMinus />}
            onClick={() => handleShowEnableModal(true)}
          />
        }
{state.enable && <EnableConfirmModal
          handleEnable={handleEnable}
          _id={username}
          isEnable={isEnable}
          show={state.enable}
          handleShowModal={handleShowEnableModal}
        />}



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
            _id={username}
          />
        )}{" "}
      </Td>

 
    </Tr>
  );
}

export default UserListTableRow;
