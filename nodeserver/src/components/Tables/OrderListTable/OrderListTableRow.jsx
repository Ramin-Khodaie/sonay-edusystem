const {
  Tr,
  Td,
  Flex,
  Avatar,
  Text,
  Badge,
  useColorModeValue,
  Button,
} = require("@chakra-ui/react");
import { DeleteIcon } from "@chakra-ui/icons";
import IconBox from "components/Icons/IconBox";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { AddCartItems } from "redux/product/orderReducer";
import { RemoveAnItem } from "redux/product/orderReducer";
import { DeleteCartItem } from "redux/product/orderReducer";

const OrderListTableRow = (props) => {
  const { imageUrl, title, desc, quantity, price } = props.cartitem;
  const textColor = useColorModeValue("gray.700", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const dispatch = useDispatch();
  const handleDeleteItem = () => {
    dispatch(DeleteCartItem(props.cartitem));
  };
  const handleRemoveOneItem = () => {
    dispatch(RemoveAnItem(props.cartitem));
  };
  const handleAddOneItem = (id) => {
    dispatch(AddCartItems(props.cartitem));
  };

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px" borderColor={borderColor} >
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={imageUrl} w="50px" borderRadius="12px" me="18px" />
        </Flex>
      </Td>
      <Td borderColor={borderColor} textAlign="center">
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold" >
            {title}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {desc}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor}>
        <Flex justifyContent="space-between" justifyItems="center">
          <Button colorScheme="whatsapp" color="blackAlpha.900" size="sm" justifyItems="center" onClick={handleRemoveOneItem}>
            -
          </Button>
          <Text alignSelf="center">{quantity}</Text>
          <Button colorScheme="whatsapp" color="blackAlpha.900" size="sm" justifyItems="center" onClick={handleAddOneItem}>
            +
          </Button>
        </Flex>
      </Td>

      <Td borderColor={borderColor} textAlign="center">
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {price} ریال
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <IconBox>
          <DeleteIcon onClick={handleDeleteItem} color="red.500"/>
        </IconBox>
      </Td>
    </Tr>
  );
};
export default OrderListTableRow;

