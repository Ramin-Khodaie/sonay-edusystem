import { CloseIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
function DeleteConfirmModal(props) {
  const { handleDelete, _id, handleShowModal, show } = props;
  const { onClose } = useDisclosure();
  const cancelRef = useRef();
  const handleClose = () => {
    handleShowModal(false);

    onClose;
  };
  return (
    <>
      <AlertDialog
        isOpen={show}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              اخطار
            </AlertDialogHeader>

            <AlertDialogBody>آیا از حذف این مورد مطمعن هستید؟</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                onClick={() => {
                  handleDelete(_id);
                }}
                mx={"10px"}
                colorScheme="red"
              >
                حذف
              </Button>
              <Button ref={cancelRef} onClick={handleClose}>
                لغو
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteConfirmModal;
