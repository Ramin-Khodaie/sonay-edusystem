import {
    Avatar,
    Badge,
    Box,
    Button,
    Flex,
    Spacer,
    Td,
    Text,
    Tr,
    useColorModeValue
  } from "@chakra-ui/react";
  import React from "react";
  import UserEditModal from "components/Modal/userEdit";
import DeleteConfirmModal from "components/Modal/deleteConfirmModal";
  
  function UserListTableRow(props) {
    const {userList,setUserList, handleDelete , logo, name, email, domain, role, date, isLast ,changeSent , sent , userId,username ,courses} = props;
    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    return (
      <Tr>
        <Td
          minWidth={{ sm: "250px" }}
          pl="0px"
          borderColor={borderColor}
          borderBottom={isLast ? "none" : null}
        >
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
            <Flex direction="column">
              <Text
                fontSize="md"
                color={titleColor}
                fontWeight="bold"
                minWidth="100%"
              >
                {name}
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {username}
              </Text>
            </Flex>
          </Flex>
        </Td>
  
        <Td  borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Flex minW={'200px'}  maxH={'100px'} overflowY={'scroll'} direction="column">
            {domain.map((itm,id)=>(
              <Text  fontSize="md" color={textColor} fontWeight="bold">
              {itm.name}
            </Text>
            ))}
      
          </Flex>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          
<Box >
<Badge
              bg={role.id === "student" ? "green.400" : 
              role.id === "teacher" ? "blue.400" :
              role.id === "admin" ? "yellow.400" : bgStatus}
              color={role.id === "Online" ? "white" : "white"}
              fontSize="16px"
              p="3px 10px"
              mx='5px'
              borderRadius="8px"
            >
              {role.name}
            </Badge>
</Box>


        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {date}
          </Text>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
  
          <UserEditModal userList={userList}  setUserList={setUserList}  changeSent={changeSent} sent={sent} userId={userId} courses={courses} />
          
        </Td>
        <Td  mx={0} borderColor={borderColor} borderBottom={isLast ? "none" : null}>
  
  <DeleteConfirmModal handleDelete={handleDelete} _id={username} />       </Td>
      </Tr>
    );
  }
  
  export default UserListTableRow;
  