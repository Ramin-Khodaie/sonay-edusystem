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
  const { handleEnable, _id, isEnable,handleShowModal,show } = props;
  const {  onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleClick = () => {
    handleEnable(_id, !isEnable);
    handleShowModal(false)
    onClose;
  };


  const handleClose=()=>{
    handleShowModal(false)
    onClose
    
  }
  return (
    <>
  

     {show && <AlertDialog
        isOpen={show}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              اخطار
            </AlertDialogHeader>

            <AlertDialogBody>
              آیا از تغییر وضعیت کاربر به حالت {isEnable?"غیرفعال":"فعال"} مطمعن هستید؟{" "}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleClick} mx={"10px"} colorScheme="yellow">
                {isEnable ? "غیرفعال":"فعال"}
              </Button>
              <Button ref={cancelRef} onClick={handleClose}>
                لغو
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>}
    </>
  );
}

export default EnableConfirmModal;
