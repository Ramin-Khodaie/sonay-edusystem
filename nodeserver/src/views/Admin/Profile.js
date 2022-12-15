// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Link,
  Switch,
  Text,
  Textarea,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import ImageArchitect1 from "assets/img/ImageArchitect1.png";
import ImageArchitect2 from "assets/img/ImageArchitect2.png";
import ImageArchitect3 from "assets/img/ImageArchitect3.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import ProfileEditForm from "components/Forms/ProfileEditForm";
import ChangePasswordModal from "components/Modal/changePasswordModal";
import UploadModal from "components/Modal/uploadModal";
import useNotify from "helpers/notify/useNotify";
import React, { useEffect, useState } from "react";
import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPenFancy,
  FaPlus,
  FaTwitter,
} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getProfileInfo } from "services/user";
import { studentByCourse } from "services/user";

function Profile() {
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    bio: "",
    address: "",
  });
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("blue.500", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const emailColor = useColorModeValue("gray.400", "gray.300");
  const { userInfo } = useSelector((state) => state.getUserInfo);

  const handleChange = (event) => {
    const field = event.target.id;
    const value = event.target.value;
    setFormData({ ...formData, [field]: value });
  };


const notify = useNotify()
  const handleSwitchChange= ()=>{
    notify("این قابلیت در آپدیت بعدی اعمال خواهد شد", true, "solid", "warning");

  }
  const [state, setState] = useState({

    image: false,
    imageId:'',
    userId :''
  });
  const handleShowUploadModal = (st) => {
    setState({ ...state, image: st });
  };




  
  const callProfileInfo = ()=>{
    getProfileInfo().then((res)=>{
        if (res.status === 200){
            setFormData({
                
            bio:res.data.data[0].bio ? res.data.data[0].bio : "",          
            address :res.data.data[0].address ? res.data.data[0].address : "" ,
            full_name:res.data.data[0].full_name ? res.data.data[0].full_name : "" ,
            email:res.data.data[0].email ? res.data.data[0].email : ""
            })
            setState({...state , imageId : res.data.data[0].image ,userId :  res.data.data[0]._id  })
        }
    })
  }

  useEffect(()=>{

    callProfileInfo()
  },[])
  

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px", lg: "100px" }}>
      <Flex
        direction={{ sm: "column", md: "row" }}
        mb='24px'
        maxH='330px'
        justifyContent={{ sm: "center", md: "space-between" }}
        align='center'
        backdropFilter='blur(21px)'
        boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
        border='1.5px solid'
        borderColor={borderProfileColor}
        bg={bgProfile}
        p='24px'
        borderRadius='20px'>
        <Flex
          align='center'
          mb={{ sm: "10px", md: "0px" }}
          direction={{ sm: "column", md: "row" }}
          w={{ sm: "100%" }}
          textAlign={{ sm: "center", md: "start" }}>
          <Avatar
            me={{ md: "22px" }}
            src={`${process.env.REACT_APP_API}/api/media/loadimage?doc_id=${state.imageId}`}
            w='80px'
            h='80px'
            borderRadius='15px'
            bg={'none'}
          />
          <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
            <Text
              fontSize={{ sm: "lg", lg: "xl" }}
              color={textColor}
              fontWeight='bold'
              ms={{ sm: "8px", md: "0px" }}>
                           {userInfo.full_name}

            </Text>
            <Text
              fontSize={{ sm: "sm", md: "md" }}
              color={emailColor}
              fontWeight='semibold'>
              {userInfo.courses[0].name}

            </Text>
          </Flex>
        </Flex>
        <Flex
          direction={{ sm: "column", lg: "row" }}
          w={{ sm: "100%", md: "50%", lg: "auto" }}>
          {/* <Button p='0px' bg='transparent' variant='no-effects'>
            <Flex
              align='center'
              w={{ sm: "100%", lg: "135px" }}
              bg={colorMode === "dark" ? "navy.900" : "#fff"}
              borderRadius='8px'
              justifyContent='center'
              py='10px'
              boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.06)'
              cursor='pointer'>
              <Icon color={textColor} as={FaCube} me='6px' />
              <Text fontSize='xs' color={textColor} fontWeight='bold'>
                OVERVIEW
              </Text>
            </Flex>
          </Button> */}

        </Flex>
      </Flex>

      <Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap='22px'>
        <Card dir='rtl' p='16px'>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              تنظیمات
            </Text>
          </CardHeader>
          <CardBody  px='5px'>
            <Flex direction='column'>
              <Text fontSize='sm' color='gray.400' fontWeight='600' mb='20px'>
          کاربر
              </Text>
              <Flex align='center' mb='20px'>
                <Switch onChange={handleSwitchChange} colorScheme='blue' me='10px' />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                   ارسال ایمیل موقع دریافت نمره
                </Text>
              </Flex>
              <Flex align='center' mb='20px'>
                <Switch onChange={handleSwitchChange} colorScheme='blue' me='10px' />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                   ارسال پیامک موقع دریافت نمره
                </Text>
              </Flex>
              <Flex align='center' mb='20px'>
                <Switch onChange={handleSwitchChange} colorScheme='blue' me='10px' />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                عضویت در مجله خبری آموزشگاه
                </Text>
              </Flex>
              <Text
                fontSize='sm'
                color='gray.400'
                fontWeight='600'
                m='6px 0px 20px 0px'>
                امنیت
              </Text>
              <Flex align='center' mb='20px'>
                <Switch onChange={handleSwitchChange} colorScheme='blue' me='10px' />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  نمایش اطلاعات تماس در صفحه پروفایل
                </Text>
              </Flex>
              <Flex align='center' mb='20px'>
                <Switch onChange={handleSwitchChange} colorScheme='blue' me='10px' />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                 نمایش آخرین بازدید
                </Text>
              </Flex>
              <ChangePasswordModal />
              <Button onClick={() => handleShowUploadModal(true)} colorScheme={'yellow'}>تغییر تصویر پروفایل</Button>

              <Button my={'5px'} colorScheme={'red'} disabled={true}>درخواست لغو عضویت در سامانه</Button>
             
            </Flex>
            {state.image && (
            <UploadModal
              handleShowModal={handleShowUploadModal}
              show={state.image}
              imageId={state.imageId}
              _id={state.userId}
              category={'user'}
            />
          )}{" "}
          </CardBody>
        </Card>
        <ProfileEditForm formData={formData} onChange={handleChange} />
        
        {/* <Card p='16px'>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              Conversations
            </Text>
          </CardHeader>
          <CardBody px='5px'>
            <Flex direction='column' w='100%'>
              <Flex justifyContent='space-between' mb='21px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar2}
                    w='50px'
                    h='50px'
                    borderRadius='15px'
                    me='10px'
                  />
                  <Flex direction='column'>
                    <Text fontSize='sm' color={textColor} fontWeight='bold'>
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize='xs' color='gray.400' fontWeight='400'>
                      Hi! I need more information...
                    </Text>
                  </Flex>
                </Flex>
                <Button p='0px' bg='transparent' variant='no-effects'>
                  <Text
                    fontSize='10px'
                    fontWeight='700'
                    color={iconColor}
                    alignSelf='center'>
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent='space-between' mb='21px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar3}
                    w='50px'
                    h='50px'
                    borderRadius='15px'
                    me='10px'
                  />
                  <Flex direction='column'>
                    <Text fontSize='sm' color={textColor} fontWeight='bold'>
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize='xs' color='gray.400' fontWeight='400'>
                      Awesome work, can you change...
                    </Text>
                  </Flex>
                </Flex>
                <Button p='0px' bg='transparent' variant='no-effects'>
                  <Text
                    fontSize='10px'
                    fontWeight='700'
                    color={iconColor}
                    alignSelf='center'>
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent='space-between' mb='21px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar4}
                    w='50px'
                    h='50px'
                    borderRadius='15px'
                    me='10px'
                  />
                  <Flex direction='column'>
                    <Text fontSize='sm' color={textColor} fontWeight='bold'>
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize='xs' color='gray.400' fontWeight='400'>
                      Have a great afternoon...
                    </Text>
                  </Flex>
                </Flex>
                <Button p='0px' bg='transparent' variant='no-effects'>
                  <Text
                    fontSize='10px'
                    fontWeight='700'
                    color={iconColor}
                    alignSelf='center'>
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent='space-between' mb='21px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar5}
                    w='50px'
                    h='50px'
                    borderRadius='15px'
                    me='10px'
                  />
                  <Flex direction='column'>
                    <Text fontSize='sm' color={textColor} fontWeight='bold'>
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize='xs' color='gray.400' fontWeight='400'>
                      About files I can...
                    </Text>
                  </Flex>
                </Flex>
                <Button p='0px' bg='transparent' variant='no-effects'>
                  <Text
                    fontSize='10px'
                    fontWeight='700'
                    color={iconColor}
                    alignSelf='center'>
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent='space-between' mb='21px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar6}
                    w='50px'
                    h='50px'
                    borderRadius='15px'
                    me='10px'
                  />
                  <Flex direction='column'>
                    <Text fontSize='sm' color={textColor} fontWeight='bold'>
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize='xs' color='gray.400' fontWeight='400'>
                      About files I can...
                    </Text>
                  </Flex>
                </Flex>
                <Button p='0px' bg='transparent' variant='no-effects'>
                  <Text
                    fontSize='10px'
                    fontWeight='700'
                    color={iconColor}
                    alignSelf='center'>
                    REPLY
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card> */}
      </Grid>
      {/* <Card p='16px' my='24px'>
        <CardHeader p='12px 5px' mb='12px'>
          <Flex direction='column'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              Projects
            </Text>
            <Text fontSize='sm' color='gray.400' fontWeight='400'>
              Architects design houses
            </Text>
          </Flex>
        </CardHeader>
        <CardBody px='5px'>
          <Grid
            templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
            templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
            gap='24px'>
            <Flex direction='column'>
              <Box mb='20px' position='relative' borderRadius='15px'>
                <Image src={ImageArchitect1} borderRadius='15px' />
                <Box
                  w='100%'
                  h='100%'
                  position='absolute'
                  top='0'
                  borderRadius='15px'
                  bg='linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)'></Box>
              </Box>
              <Flex direction='column'>
                <Text fontSize='md' color='gray.400' fontWeight='600' mb='10px'>
                  Project #1
                </Text>
                <Text
                  fontSize='xl'
                  color={textColor}
                  fontWeight='bold'
                  mb='10px'>
                  Modern
                </Text>
                <Text fontSize='md' color='gray.400' fontWeight='400' mb='20px'>
                  As Uber works through a huge amount of internal management
                  turmoil.
                </Text>
                <Flex justifyContent='space-between'>
                  <Button variant='dark' minW='110px' h='36px'>
                    VIEW ALL
                  </Button>
                  <AvatarGroup size='xs'>
                    <Avatar name='Ryan Florence' src={avatar6} />
                    <Avatar name='Segun Adebayo' src={avatar2} />
                    <Avatar name='Kent Dodds' src={avatar3} />
                    <Avatar name='Prosper Otemuyiwa' src={avatar4} />
                  </AvatarGroup>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction='column'>
              <Box mb='20px' position='relative' borderRadius='15px'>
                <Image src={ImageArchitect2} borderRadius='15px' />
                <Box
                  w='100%'
                  h='100%'
                  position='absolute'
                  top='0'
                  borderRadius='15px'
                  bg='linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)'></Box>
              </Box>
              <Flex direction='column'>
                <Text fontSize='md' color='gray.400' fontWeight='600' mb='10px'>
                  Project #2
                </Text>
                <Text
                  fontSize='xl'
                  color={textColor}
                  fontWeight='bold'
                  mb='10px'>
                  Scandinavian
                </Text>
                <Text fontSize='md' color='gray.400' fontWeight='400' mb='20px'>
                  Music is something that every person has his or her own
                  specific opinion about.
                </Text>
                <Flex justifyContent='space-between'>
                  <Button variant='dark' minW='110px' h='36px'>
                    VIEW ALL
                  </Button>
                  <AvatarGroup size='xs'>
                    <Avatar name='Ryan Florence' src={avatar6} />
                    <Avatar name='Segun Adebayo' src={avatar2} />
                    <Avatar name='Kent Dodds' src={avatar3} />
                    <Avatar name='Prosper Otemuyiwa' src={avatar4} />
                  </AvatarGroup>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction='column'>
              <Box mb='20px' position='relative' borderRadius='15px'>
                <Image src={ImageArchitect3} borderRadius='15px' />
                <Box
                  w='100%'
                  h='100%'
                  position='absolute'
                  top='0'
                  borderRadius='15px'
                  bg='linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)'></Box>
              </Box>
              <Flex direction='column'>
                <Text fontSize='md' color='gray.400' fontWeight='600' mb='10px'>
                  Project #3
                </Text>
                <Text
                  fontSize='xl'
                  color={textColor}
                  fontWeight='bold'
                  mb='10px'>
                  Minimalist
                </Text>
                <Text fontSize='md' color='gray.400' fontWeight='400' mb='20px'>
                  Different people have different taste, especially various
                  types of music.
                </Text>
                <Flex justifyContent='space-between'>
                  <Button variant='dark' minW='110px' h='36px'>
                    VIEW ALL
                  </Button>
                  <AvatarGroup size='xs'>
                    <Avatar name='Ryan Florence' src={avatar6} />
                    <Avatar name='Segun Adebayo' src={avatar2} />
                    <Avatar name='Kent Dodds' src={avatar3} />
                    <Avatar name='Prosper Otemuyiwa' src={avatar4} />
                  </AvatarGroup>
                </Flex>
              </Flex>
            </Flex>
            <Button
              p='0px'
              bg='transparent'
              border='1px solid lightgray'
              borderRadius='15px'
              minHeight={{ sm: "200px", md: "100%" }}>
              <Flex direction='column' justifyContent='center' align='center'>
                <Icon as={FaPlus} color={textColor} fontSize='lg' mb='12px' />
                <Text fontSize='lg' color={textColor} fontWeight='bold'>
                  Create a New Project
                </Text>
              </Flex>
            </Button>
          </Grid>
        </CardBody>
      </Card> */}
    </Flex>
  );
}

export default Profile;
