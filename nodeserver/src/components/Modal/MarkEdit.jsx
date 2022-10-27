import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import MarkForm from "components/Forms/markForm";
import ProductForm from "components/Forms/productForm";
import UserForm from "components/Forms/userForm";

import React, { useEffect } from "react";

function MarkEditModal(props) {
  const {
    selectedCourse,
    selectedStudent,
    markId,
    markList,
    setMarkList,
    myStudents , setmyStudents
  } = props;

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
            <MarkForm
              markList={markList}
              setMarkList={setMarkList}
              onClose={onClose}
              selectedCourse={selectedCourse}
              selectedStudent={selectedStudent}
              markId={markId}
              myStudents={myStudents}
              setmyStudents={setmyStudents}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MarkEditModal;
