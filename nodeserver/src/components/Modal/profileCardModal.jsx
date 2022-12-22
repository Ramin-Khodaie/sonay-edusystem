import {
  Avatar,
  Divider,
  Flex,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { useRef } from "react";
import darkBg from "assets/img/BackgroundCard1.png";
import lightBg from "assets/img/admin-background.jpg";
import avatar5 from "assets/img/avatars/avatar5.png";
import { useEffect } from "react";
import { useState } from "react";
import { getProfileInfo } from "services/user";
import { FaUserAlt } from "react-icons/fa";

function ProfileCard({ handleShowModal, show, username }) {
  let boxBg = useColorModeValue("white !important", "#111c44 !important");
  let mainText = useColorModeValue("gray.800", "white");
  let secondaryText = useColorModeValue("gray.400", "gray.400");
  let bg = useColorModeValue(lightBg, darkBg);

  const { onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleClose = () => {
    handleShowModal(false);
    onClose;
  };

  const [data, setData] = useState([]);

  const callProfileInfo = () => {
    getProfileInfo(username).then((res) => {
      if (res.status === 200) {
        setData(res.data.data[0]);
      }
    });
  };
  useEffect(() => {
    callProfileInfo();
  }, []);

  console.log(data, 7878);

  return (
    <>
      {show && (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={show}
          onClose={handleClose}
        >
          <ModalOverlay backdropFilter={"blur(10px)"} />
          <ModalContent
            maxW={{ sm: "500px", md: "700px", lg: "900px" }}
            h={"580px"}
            overflow={"scroll"}
            borderRadius={"20px"}
          >
            <ModalCloseButton mr={"25px"} mt={"25px"} />
            <ModalBody>
              <Flex
                borderRadius="20px"
                pt={"10px"}
                h="345px"
                // w={{ base: "315px", md: "345px" }}
                alignItems="center"
                direction="column"
              >
                <Image h={"145px"} src={bg} w="100%" borderRadius="20px" />
                <Flex flexDirection="column" mb="20px">
                  {data.image !== "" ? (
                    <Image
                      src={`${process.env.REACT_APP_API}/api/media/loadimage?doc_id=${data.image}`}
                      border="5px solid red"
                      mx="auto"
                      borderColor={boxBg}
                      width="128px"
                      height="128px"
                      mt="-68px"
                      borderRadius="50%"
                    />
                  ) : (
                    <Avatar
                      border="5px solid red"
                      //  boxSize={{sm:"30",md:"50",lg:'60'}}
                      size={"xl"}
                      mt="-50px"
                      mx="auto"
                      borderColor={boxBg}
                      width="128px"
                      height="128px"
                    />
                  )}

                  <Text
                    fontWeight="600"
                    color={mainText}
                    textAlign="center"
                    fontSize="xl"
                  >
                    {data.full_name && data.full_name}
                  </Text>
                  <Text
                    color={secondaryText}
                    textAlign="center"
                    fontSize="sm"
                    fontWeight="500"
                  >
                    آخرین بازدید{" "}
                    {data.last_seen ? (
                      <>
                        {" "}
                        {data.last_seen} {data.last_seen_h}:{data.last_seen_m}
                      </>
                    ) : (
                      <>خیلی وقت پیش</>
                    )}
                  </Text>
                </Flex>
                <Divider />
                <Flex
                  dir="rtl"
                  flexDirection="column"
                  justify={"space-between"}
                  w={"100%"}
                  px="36px"
                >
                  {data.bio && (
                    <>
                      {" "}
                      <Text
                        fontFamily={"Lalezar"}
                        color={mainText}
                        fontSize={"20px"}
                        mt={"15px"}
                      >
                        درباره من:
                      </Text>
                      <Text textAlign={"justify"} fontWeight="500">
                        {data.bio}
                      </Text>
                    </>
                  )}
                  <Text
                    fontFamily={"Lalezar"}
                    color={mainText}
                    fontSize={"20px"}
                    mt={"15px"}
                  >
                    دوره:
                  </Text>

                  <Text fontWeight="500">
                    {data.courses &&
                      data.courses.length !== 0 &&
                      data.courses[0]["name"]}
                  </Text>

                  <Text
                    fontFamily={"Lalezar"}
                    color={mainText}
                    fontSize={"20px"}
                    mt={"15px"}
                  >
                    معدل کل:
                  </Text>
                  <Text fontWeight="500">83</Text>

                  <Text
                    fontFamily={"Lalezar"}
                    color={mainText}
                    fontSize={"20px"}
                    mt={"15px"}
                  >
                    دستاورد ها:
                  </Text>
                  <Text mb={"50px"} fontWeight="500">
                    هنوز هیچ دستاوردی کسب نکرده است
                  </Text>
                </Flex>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default ProfileCard;
