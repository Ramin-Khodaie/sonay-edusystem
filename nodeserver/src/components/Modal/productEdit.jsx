import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
} from "@chakra-ui/react";
import ProductForm from "components/Forms/productForm";
import UserForm from "components/Forms/userForm";

import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

function ProductEditModal(props) {
  const { productId, courses, productList, setProductList } = props;

  const {  onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [isOpen , setIsOpen] = useState(false)
const handleOpen=()=>{
  onOpen
  setIsOpen(true)
}

const handleClose=()=>{
  onClose
  setIsOpen(false)
}

  return (
    <>
      <IconButton  background={'none'} icon={<FaPencilAlt />} onClick={handleOpen}></IconButton>

      {isOpen && <Modal
        size={"5xl"}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pt={"50px"}>
            <ProductForm
            onClose={onClose}
              productList={productList}
              setProductList={setProductList}
              courses={courses}
              productId={productId}
            />
          </ModalBody>
        </ModalContent>
      </Modal>}
    </>
  );
}

export default ProductEditModal;
