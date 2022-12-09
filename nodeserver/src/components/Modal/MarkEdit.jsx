import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  
} from "@chakra-ui/react";
import MarkForm from "components/Forms/markForm";

import React, { useEffect } from "react";

function MarkEditModal(props) {
  const {
    selectedCourse,
    selectedStudent,
    markId,
    markList,
    setMarkList,
    myStudents , setmyStudents,handleShowModal,show
  } = props;

  const { onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const handleClose=()=>{
    handleShowModal(false)
    onClose
    
  }
  return (
    <>

      {show && <Modal
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
            <MarkForm
              markList={markList}
              setMarkList={setMarkList}
              onClose={handleClose}
              selectedCourse={selectedCourse}
              selectedStudent={selectedStudent}
              markId={markId}
              myStudents={myStudents}
              setmyStudents={setmyStudents}
            />
          </ModalBody>
        </ModalContent>
      </Modal>}
    </>
  );
}

export default MarkEditModal;
