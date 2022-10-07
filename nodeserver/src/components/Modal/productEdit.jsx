import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import ProductForm from "components/Forms/productForm";
import UserForm from "components/Forms/userForm";

import React, { useEffect } from "react";

function ProductEditModal(props) {
  const { productId, courses, productList, setProductList } = props;

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
            <ProductForm
            onClose={onClose}
              productList={productList}
              setProductList={setProductList}
              courses={courses}
              productId={productId}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProductEditModal;
