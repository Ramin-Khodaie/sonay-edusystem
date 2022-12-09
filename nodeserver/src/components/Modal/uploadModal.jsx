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
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { uploadProductImage } from "services/media";
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
import { Buffer } from "buffer";
import { loadImage } from "services/media";

import noProduct from "assets/img/noProduct.png";
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
  const { _id, imageId, show, handleShowModal } = props;
  const { onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState([]);
  const data = new FormData();
  const dndBG = useColorModeValue("gray.200", "gray.800");

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

    uploadProductImage(
      {
        "content-type": "multipart/form-data",
      },
      data
    ).then((res) => {
      console.log(res);
    });
  };
  console.log(file, 7878);
  const hiddenFileInput = useRef(null);

  const handleUploadClick = (event) => {
    hiddenFileInput.current.click();
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/*": [] },
      noClick: true,
      maxFiles: 2,

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
  const [image, setImage] = useState(undefined);
  const getThumnail = () => {
    loadImage(imageId).then((res) => {
      let cc = Buffer.from(res, "binary").toString("base64");
      console.log(cc, 1212);
      setImage(cc);
    });
  };

  // const [isOpen , setIsOpen] = useState(true)
  const handleOpen = () => {
    onOpen;
  };

  const handleClose = () => {
    console.log("sdf");
    console.log(show);
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
                {imageId || imageId !== "" ? (
                  <Image
                    h={{ sm: "150px", md: "300px", lg: "320px" }}
                    maxW={{ sm: "200px", md: "300px", lg: "320px" }}
                    src={`${process.env.REACT_APP_API}/api/media/loadimage?doc_id=${imageId}`}
                    alt="casptcha"
                    borderRadius={"3rem"}
                  ></Image>
                ) : (
                  <Image
                    src={noProduct}
                    alt="casptcha"
                    h={{ sm: "150px", md: "300px", lg: "320px" }}
                    maxW={{ sm: "200px", md: "300px", lg: "320px" }}
                  ></Image>
                )}
              </GridItem>
              <GridItem colSpan={{ sm: 4, md: 3, lg: 3 }}>
                <Flex direction={"column"} align={"center"}>
                  <Text pb={"20px"}>جهت بارگذاری تصویر</Text>
                  <Button mb={"20px"} onClick={handleUploadClick}>
                    اینجا کلیک کنید
                  </Button>
                  <Text pb={"20px"}>و یا تصویر را در کادر زیر رها کنید</Text>
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
                        فایل خود را اینجا رها کنید
                      </Text>
                    )}
                    <VStack
                      height={"170x"}
                      // w={{ sm: "400px", md: "600px", lg: "700px" }}
                      style={{ overflow: "scroll" }}
                      divider={<StackDivider borderColor="gray.200" />}
                      spacing={1}
                      align="stretch"
                    >
                      {file.map((f, num) => (
                        <Flex px={"20px"} direction={"row"}>
                          <Text>{f.name}</Text>
                          <Spacer />
                          <IconButton
                            onClick={() => handleDocDelete(num)}
                            color={"red"}
                            background={"none"}
                            icon={<DeleteIcon />}
                          ></IconButton>
                        </Flex>
                      ))}
                    </VStack>
                  </Box>
                </Flex>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter dir={"rtl"}>
            <Button mx={"10px"} colorScheme={"red"} onClick={handleClose}>
              لغو
            </Button>
            <Button mx={"10px"} colorScheme={"green"} onClick={handleUpload}>
              آپلود
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UploadModal;
