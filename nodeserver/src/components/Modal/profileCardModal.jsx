import {
    Divider,
  Flex,
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

function ProfileCard({ handleShowModal, show }) {
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
  console.log("show", show);
  return (
    <>
      {show && (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={show}
          onClose={handleClose}
          size={"md"}
        >
          <ModalOverlay />
          <ModalContent h={"580px"} overflow={'scroll'} borderRadius={"20px"}>
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
                <Image   h={"145px"} src={bg} w="100%" borderRadius="20px" />
                <Flex  flexDirection="column" mb="20px">
                  <Image
                    src={avatar5}
                    border="5px solid red"
                    mx="auto"
                    borderColor={boxBg}
                    width="128px"
                    height="128px"
                    mt="-68px"
                    borderRadius="50%"
                  />
                  <Text
                    fontWeight="600"
                    color={mainText}
                    textAlign="center"
                    fontSize="xl"
                  >
                    Adela Parkson
                  </Text>
                  <Text
                    color={secondaryText}
                    textAlign="center"
                    fontSize="sm"
                    fontWeight="500"
                  >
                    Product Designer
                  </Text>
                </Flex>
                <Divider  />
                <Flex
                  dir="rtl"
                  flexDirection="column"
                  justify="space-between"
            
                  px="36px"
                >
                
                    <Text
                      fontFamily={"Lalezar"}
                      color={mainText}
                      fontSize={"20px"}
                      mt={"15px"}
                    >
                      درباره من:
                    </Text>
                    <Text textAlign={"justify"} fontWeight="500">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای
                      شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
                      صنعت چاپ،
                      و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای
                      صنعت چاپ،
                      و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای
                      
                    </Text>
                    <Text
                      fontFamily={"Lalezar"}
                      color={mainText}
                      fontSize={"20px"}
                      mt={"15px"}
                    >
                    دوره:
                   </Text>
                
                 
               
                    <Text fontWeight="500">
                      Family and friends
                    </Text>
                  
                    <Text
                      fontFamily={"Lalezar"}
                      color={mainText}
                      fontSize={"20px"}
                      mt={"15px"}
                    >
                    معدل کل:
                   </Text>
                    <Text  fontWeight="500">
                      83
                    </Text>

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
