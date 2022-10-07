import {
  Modal,
  ModalOverlay,
  ModalContent,  
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import UserForm from "components/Forms/userForm";

import React, { useEffect } from "react";

function UserEditModal(props) {
  const { userList,setUserList, changeSent, sent , userId , courses } = props;

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
            <UserForm onClose={onClose} userList={userList} setUserList={setUserList} changeSent={changeSent} sent={sent} courses={courses} modalClose={onClose} mode="edit" userId={userId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserEditModal;
