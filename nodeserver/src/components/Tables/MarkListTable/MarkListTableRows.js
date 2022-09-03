import {
    Avatar,
    Badge,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React from "react";
  import UserEditModal from "components/Modal/userEdit";
  import { CheckIcon, CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
  import ProductEditModal from "components/Modal/productEdit";
import MarkEditModal from "components/Modal/MarkEdit";
  
  function MarkListTableRow(props) {
    const {
            name,
            logo,
            sum,
            status,
            date,
            course,
            isLast,
            key,
            markId,
            selectedCourse,
            selectedStudent
     
    } = props;
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
            </Flex>
          </Flex>
        </Td>
  
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {sum} 
            </Text>
            {/* <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {subdomain}
              </Text> */}
          </Flex>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Badge
            bg={status === 'failed' ? "red.500" : "green.400"}
            color={"white"}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            {status === 'failed' ? "مردود" : "قبول"}
          </Badge>
        </Td>
  
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="md" color={textColor} fontWeight="bold">
              {date} 
            </Text>
        </Td>
  
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          {course.name}
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          
          <MarkEditModal selectedCourse={selectedCourse} selectedStudent={selectedStudent} markId={markId} />
        </Td>
      </Tr>
    );
  }
  
  export default MarkListTableRow;
  