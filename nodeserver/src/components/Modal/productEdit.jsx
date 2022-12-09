import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,

} from "@chakra-ui/react";
import ProductForm from "components/Forms/productForm";

import React, {  useState } from "react";

function ProductEditModal(props) {
  const { productId, courses, productList, setProductList,handleShowModal,show } = props;

  const {   onClose } = useDisclosure();

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
