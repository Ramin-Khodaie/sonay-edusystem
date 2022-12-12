import {
    Modal,
    ModalOverlay,
    ModalContent,  
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
  } from "@chakra-ui/react";
import ChangePasswordForm from "components/Forms/changePasswordForm";
import CourseForm from "components/Forms/courseForm";
  import UserForm from "components/Forms/userForm";
  
  import React, { useEffect } from "react";
import { useState } from "react";
  
  function ChangePasswordModal(props) {
  
    const {  onClose } = useDisclosure();
  
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
  
    const handleClose=()=>{
      handleShowModal(false)
      onClose
      
    }

    const [show, setShow] = useState(false);

    const handleShowModal = (st) => {
      setShow(st);
    };
  
  
    return (
      <>
                    <Button  onClick={() => handleShowModal(true)}  my={'5px'} colorScheme={'blue'}>تغییر رمز عبور</Button>

  {show &&
        <Modal
          size={"xl"}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={show}
          onClose={handleClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody pt={"50px"}>

                
             
<ChangePasswordForm onClose={handleClose} />



            </ModalBody>
          </ModalContent>
        </Modal>}
      </>
    );
  }
  
  export default ChangePasswordModal;
  