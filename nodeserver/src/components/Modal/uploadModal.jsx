import { CloseIcon, DeleteIcon, StarIcon } from "@chakra-ui/icons";
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
  Box,
  Text,
  Input,
  Center,
  Flex,
  VStack,
  StackDivider,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { uploadImage } from "services/media";
import { useDropzone } from "react-dropzone";
import { useMemo } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
const baseStyle = {
  flex: 1,
  minHeight: "170px",
  maxHeight: "170px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 4,
  borderRadius: 5,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function UploadModal(props) {
  const { _id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState([]);
  const data = new FormData();

  const handleFileChange = (f) => {
    if (f.length > 0) {
      setFile([...file, f[0]]);
    }
  };
  const handleUpload = () => {
    if (!file || file.length > 1) {
      return;
    }
    data.append("_id", _id);
    data.append("category", "product");
    data.append("file", file[0]);

    uploadImage(
      {
        "content-type": "multipart/form-data",
      },
      data
    ).then((res) => {
      console.log(res);
    });
  };
console.log(file,7878)
  const hiddenFileInput = useRef(null);

  const handleUploadClick = (event) => {
    hiddenFileInput.current.click();
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/*": [] },
      noClick: true,
      maxFiles:2,

      onDrop: handleFileChange,
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );


  const handleDocDelete = (num)=>{
    
    
    setFile(file.filter((elem , idx)=> idx !== num))

  }
  return (
  <>
        <Button onClick={onOpen}>ویرایش</Button>

    <Modal onClose={onClose} size={'4xl'} isOpen={isOpen}>
    <ModalOverlay />
    <ModalContent >
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody >
      <Flex  direction={"column"} align={"center"} p={"50px"}>
<Text pb={"10px"}>جهت بارگذاری تصویر</Text>
<Button mb={"10px"} onClick={handleUploadClick}>
  اینجا کلیک کنید
</Button>
<Text pb={"10px"}>و یا تصویر را در کادر زیر رها کنید.</Text>
<Input
  ref={hiddenFileInput}
  style={{
    border: "solid",
    display: "none",
    position: "relative",
    
  }}
  type="file"
  onChange={handleFileChange}
  onDrop={handleFileChange}
/>

<Box w={{sm:"400px" , md:"600px" , lg:"700px"}}   height={"870px"} {...getRootProps({ style })}>
  <Input  {...getInputProps()} />
  {file.length === 0 && (
    <Text textAlign={"center"}>فایل خود را اینجا رها کنید</Text>
  )}
  <VStack
  height={'170x'}
  w={{sm:"400px" , md:"600px" , lg:"700px"}}
    style={{overflow : "scroll"}}
    divider={<StackDivider borderColor="gray.200" />}
    spacing={1}
    align="stretch"
  >
    {file.map((f, num) => (
      <Flex px={'20px'} direction={'row'}>
              <Text>{f.name}</Text>
              <Spacer />
<IconButton  onClick={()=> handleDocDelete(num)} color={'red'} background={'none'} icon={<DeleteIcon />}></IconButton>
      </Flex>
    ))}
  </VStack>
</Box>
</Flex>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme={'green'} onClick={handleUpload}>آپلود</Button>
      </ModalFooter>
    </ModalContent>
  </Modal></>
    
  );
}

export default UploadModal;
