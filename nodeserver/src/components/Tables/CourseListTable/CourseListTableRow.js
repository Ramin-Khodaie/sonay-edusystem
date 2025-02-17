import {
    Avatar,
    Badge,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue
  } from "@chakra-ui/react";
  import React from "react";
  import UserEditModal from "components/Modal/userEdit";
import CourseEditModal from "components/Modal/courseEdit";
  
  function CourseListTableRow(props) {
    const { name , logo , nextCourse , status , teacher , teacherImage , teacherUserName, price , isLast , key ,courseId , courses , statusData} = props;
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
              {nextCourse}
            </Text>
            {/* <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {subdomain}
            </Text> */}
          </Flex>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Badge
            bg={status === "active" ? "green.400" : bgStatus}
            color={"white"}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            {status === "active" ? "فعال" : "غیرفعال"}
          </Badge>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
{teacher}
          </Text>
           <Text fontSize="sm" color="gray.400" fontWeight="normal">
{teacherUserName}
            </Text>
        </Td>

        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {price}  ریال  

          </Text>

        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
  
          <CourseEditModal 
          
          courseId={courseId} courses={courses} statusData={statusData} />
          
        </Td>
      </Tr>
    );
  }
  
  export default CourseListTableRow;
  