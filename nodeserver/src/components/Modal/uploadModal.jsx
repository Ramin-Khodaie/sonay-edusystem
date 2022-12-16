import { CloseIcon, DeleteIcon, StarIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  IconButton,
  Button,
  Box,
  Text,
  Input,
  Flex,
  VStack,
  StackDivider,
  Spacer,
  Image,
  Avatar,
  Grid,
  GridItem,
  useColorModeValue,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { loadImage } from "services/media";

import noProduct from "assets/img/noProduct.png";
import noUser from "assets/img/noUser.png";
import { FaBook, FaChalkboardTeacher, FaUserAlt } from "react-icons/fa";
const baseStyle = {
  flex: 1,
  minHeight: "170px",
  maxHeight: "170px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 3,
  borderRadius: "2rem",
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  // backgroundColor: "#fafafa",
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
  const { _id, imageId, show, handleShowModal,category } = props;
  const {  onClose } = useDisclosure();
  const [file, setFile] = useState([]);
  const [img, setImg] = useState('');
  const [state, setState] = useState({
    isUploading : false
  });
  const data = new FormData();
  const dndBG = useColorModeValue("gray.200", "gray.800");

  const handleFileChange = (f) => {
    if (f.length > 0) {
      setFile([f[0]]);
    }
  };
  const handleUpload = () => {
    setState({...state , isUploading : true})
    if (!file || file.length > 1) {
      return;
    }
    data.append("_id", _id);
    data.append("category", category);
    data.append("file", file[0]);

    uploadImage(
      {
        "content-type": "multipart/form-data",
      },
      data
    ).then((res) => {
      setImg(res.data)
      setFile([])
      setState({...state , isUploading : false})

    });
  };
  const hiddenFileInput = useRef(null);


  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/*": [] },
      noClick: true,
      maxFiles:1,

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

  const handleDocDelete = (num) => {
    setFile(file.filter((elem, idx) => idx !== num));
  };
  // const [image, setImage] = useState(undefined);
  // const getThumnail = () => {
  //   loadImage(imageId).then((res) => {
  //     let cc = Buffer.from(res, "binary").toString("base64");
  //     console.log(cc, 1212);
  //     setImage(cc);
  //   });
  // };

const fs ={'sm':"200px",'md':"200px",'lg':'280px'}
  const handleClose = () => {
 
    handleShowModal(false);

    onClose;
  };
  return (
    <>
      <Modal onClose={handleClose} size={"4xl"} isOpen={show}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pr={"60px"} dir="rtl">
            بارگذاری تصویر
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid height={"400px"} templateColumns="repeat(5, 1fr) " gap={1}>
              <GridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
                {img !== ''  ? (
                  <Image
                    h={{ sm: "150px", md: "300px", lg: "320px" }}
                    maxW={{ sm: "200px", md: "300px", lg: "320px" }}
                    src={`${process.env.REACT_APP_API}/api/media/loadimage?doc_id=${img}`}
                    alt="casptcha"
                    borderRadius={"3rem"}
                  ></Image>
                ) :
                imageId || imageId !== ""?
                (
                  <Image
                    h={{ sm: "150px", md: "300px", lg: "320px" }}
                    maxW={{ sm: "200px", md: "300px", lg: "320px" }}
                    src={`${process.env.REACT_APP_API}/api/media/loadimage?doc_id=${imageId}`}
                    alt="casptcha"
                    borderRadius={"3rem"}
                  ></Image>
                ) :


              //  if no image available according to its category we show diffrent images as anonymous avatar
                


                category == 'user' ? 
    
                 <Icon as={FaUserAlt} 
                //  boxSize={{sm:"30",md:"50",lg:'60'}}
                h={{ sm: "150px", md: "300px", lg: "320px" }}
                w={{ sm: "200px", md: "300px", lg: "320px" }}
                  />
               
                
                
                : category == 'product' ? 
                <Icon as={FaBook} 
                //  boxSize={{sm:"30",md:"50",lg:'60'}}
                h={{ sm: "150px", md: "300px", lg: "320px" }}
                w={{ sm: "200px", md: "300px", lg: "320px" }}
                  />
                  
                  :


                  category == 'course' ?
                  <Icon as={FaChalkboardTeacher} 
                //  boxSize={{sm:"30",md:"50",lg:'60'}}
                h={{ sm: "150px", md: "300px", lg: "320px" }}
                w={{ sm: "200px", md: "300px", lg: "320px" }}
                  />
                   :



                  <Image
                    h={{ sm: "150px", md: "300px", lg: "320px" }}
                    maxW={{ sm: "200px", md: "300px", lg: "320px" }}
                    src={""}
                    alt="casptcha"
                    borderRadius={"3rem"}
                  ></Image>
                
                
                
                
                
                }
              </GridItem>
              <GridItem colSpan={{ sm: 4, md: 3, lg: 3 }}>
                <Flex direction={"column"} align={"center"}>
                  <Text pb={"20px"}>جهت بارگذاری تصویر</Text>
                  
                  <Text pb={"20px"}>روی کادر زیر کلیک کنید یا آن را در کادر زیر رها کنید</Text>
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

                  <Box
                    bg={dndBG}
                    width={"100%"}
                    // w={{ sm: "400px", md: "600px", lg: "700px" }}
                    height={"870px"}
                    {...getRootProps({ style })}
                  >
                    <Input {...getInputProps()} />
                    {file.length === 0 && (
                      <Text textAlign={"center"}>
کلیک کنید یا فایل را اینجا رها کنید                      </Text>
                    )}
                        { file.length !== 0 &&
                        <Flex dir={'rtl'}  w={'100%'} direction={"column"}>
                      {file.map((f, num) => (
             
        
                    
                          <Flex align={'center'}>
                          <Text>{f.name}</Text>
                     
                          <IconButton
                            onClick={() => handleDocDelete(num)}
                            color={"red"}
                            background={"none"}
                            icon={<DeleteIcon />}
                          ></IconButton></Flex>
                   
                      ))}
                    </Flex>
                    }

                  </Box>
                    { state.isUploading && <Spinner mt={'30px'} />
}

                </Flex>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter dir={"rtl"}>
            <Button mx={"10px"} colorScheme={"red"} onClick={handleClose}>
              لغو
            </Button>
            <Button disabled={state.isUploading} mx={"10px"} colorScheme={"green"} onClick={handleUpload}>
              {state.isUploading ? "در حال بارگذاری" : "آپلود"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UploadModal;
