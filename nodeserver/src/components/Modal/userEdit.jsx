import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Flex,
  Box,
  Spacer,
  Select,
  useUpdateEffect,
} from "@chakra-ui/react";
import UserForm from "components/Forms/userForm";
import { useUser } from "hooks/users/useUser";
import React, { useEffect } from "react";

function UserEditModal(props) {
  const { changeSent, sent , userId } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

 

  return (
    <>
      <Button onClick={onOpen}>ویرایش</Button>

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
          <ModalBody pt={"50px"}>
            <UserForm changeSent={changeSent} sent={sent} mode="edit" userId={userId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserEditModal;
