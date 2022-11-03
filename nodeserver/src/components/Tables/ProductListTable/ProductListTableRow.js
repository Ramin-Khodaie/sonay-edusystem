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
import { CheckIcon, CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import ProductEditModal from "components/Modal/productEdit";
import DeleteConfirmModal from "components/Modal/deleteConfirmModal";

function UserListTableRow(props) {
  const {
    logo,
    name,
    price,
    isMain,
    isActive,
    productCourse,
    isLast,
    key,
    productId,
    courses,
    productList,
     setProductList,
     handleDelete
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
            {price} ریال
          </Text>
          {/* <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {subdomain}
            </Text> */}
        </Flex>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Badge
          bg={isActive ? "green.400" : bgStatus}
          color={"white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {isActive ? "فعال" : "غیرفعال"}
        </Badge>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Badge
          color={isMain ? "green.400" : "red.400"}
          fontSize="24px"
          p="3px 10px"
          borderRadius="8px"
          bg={"no"}
        >
          {isMain ? <CheckIcon /> : <SmallCloseIcon />}
        </Badge>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        {productCourse.map((c) => (
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {c.name}
          </Text>
        ))}
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <ProductEditModal productList={productList} setProductList={setProductList} productId={productId} courses={courses} />
      </Td>
      <Td  mx={0} borderColor={borderColor} borderBottom={isLast ? "none" : null}>
  
  <DeleteConfirmModal handleDelete={handleDelete} _id={productId} />       </Td>
    </Tr>
  );
}

export default UserListTableRow;
