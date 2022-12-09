import { CloseIcon } from '@chakra-ui/icons'
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
  } from '@chakra-ui/react'
import { useRef } from 'react'
function DeleteConfirmModal(props) {
    const {handleDelete , _id} = props
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
  
    return (
      <>
        <IconButton background={'none'} color='red' onClick={onOpen} icon={<CloseIcon /> }>
        </IconButton>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent dir='rtl'>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                اخطار
              </AlertDialogHeader>
  
              <AlertDialogBody>
آیا از حذف این مورد مطمعن هستید؟
              </AlertDialogBody>
  
              <AlertDialogFooter>
                
                <Button onClick={()=>{handleDelete(_id)}} mx={'10px'} colorScheme='red'>حذف</Button>
                <Button ref={cancelRef} onClick={onClose}>
                  لغو
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }


  export default DeleteConfirmModal