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
    const { courseId , courses , statusData , callData,handleShowModal,show } = props;
  
    const {  onClose } = useDisclosure();
  
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
  
    const handleClose=()=>{
      handleShowModal(false)
      onClose
      
    }
  
    return (
      <>
  {show &&
        <Modal
          size={"5xl"}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={show}
          onClose={handleClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody pt={"50px"}>
              <CourseForm courses={courses}
               modalClose={handleClose} mode="edit" courseId={courseId}
               statusData={statusData}
               callData={callData} />
            </ModalBody>
          </ModalContent>
        </Modal>}
      </>
    );
  }
  
  export default CourseEditModal;
  