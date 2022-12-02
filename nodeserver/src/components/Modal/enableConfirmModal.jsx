import { CloseIcon, RepeatIcon } from "@chakra-ui/icons";
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
function EnableConfirmModal(props) {
  const { handleEnable, _id, isEnable } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleClick = () => {
    handleEnable(_id, !isEnable);

    onClose();
  };
  return (
    <>
      <Button colorScheme={isEnable ? "gray" : "yellow"} onClick={onOpen}>
        {isEnable ? "غیرفعال" : "فعال"}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              اخطار
            </AlertDialogHeader>

            <AlertDialogBody>
              آیا از تغییر وضعیت کاربر مطمعن هستید؟{" "}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleClick} mx={"10px"} colorScheme="yellow">
                تغییر
              </Button>
              <Button ref={cancelRef} onClick={onClose}>
                لغو
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default EnableConfirmModal;
