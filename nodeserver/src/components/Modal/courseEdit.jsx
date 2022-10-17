import {
    Modal,
    ModalOverlay,
    ModalContent,  
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
  } from "@chakra-ui/react";
import CourseForm from "components/Forms/courseForm";
  import UserForm from "components/Forms/userForm";
  
  import React, { useEffect } from "react";
  
  function CourseEditModal(props) {
    const { courseId , courses , statusData , callData } = props;
  
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
              <CourseForm courses={courses}
               modalClose={onClose} mode="edit" courseId={courseId}
               statusData={statusData}
               callData={callData} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default CourseEditModal;
  