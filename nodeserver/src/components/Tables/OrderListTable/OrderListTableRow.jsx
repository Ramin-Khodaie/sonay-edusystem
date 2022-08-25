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
  const { image, title, desc, count, price } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const dispatch = useDispatch();
  const handleDeleteItem = (id) => {
    dispatch(DeleteCartItem(id));
  };
  const handleRemoveOneItem = (id) => {
    dispatch(RemoveAnItem(id));
  };
  const handleAddOneItem = (id) => {
    dispatch(AddCartItems(id));
  };
  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        // borderBottom={isLast ? "none" : null}
      >
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={image} w="50px" borderRadius="12px" me="18px" />
          {/* <Flex direction="column">
            <Text
              fontSize="md"
              color={titleColor}
              fontWeight="bold"
              minWidth="100%"
            >{title}</Text>
          </Flex> */}
        </Flex>
      </Td>
      <Td
        borderColor={borderColor}
        //   borderBottom={isLast ? "none" : null}
      >
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {title}
          </Text>
          {/* <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {subdomain}
            </Text> */}
        </Flex>
      </Td>
      <Td
        borderColor={borderColor}
        //   borderBottom={isLast ? "none" : null}
      >
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {desc}
          </Text>
          {/* <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {subdomain}
            </Text> */}
        </Flex>
      </Td>
      <Td
        borderColor={borderColor}
        //   borderBottom={isLast ? "none" : null}
      >
        <Flex justifyContent="space-between" justifyItems="center">
          <Button
            size="sm"
            justifyItems="center"
            onClick={() => handleRemoveOneItem(props.id)}
          >
            -
          </Button>
          <Text alignSelf="center">{count}</Text>
          <Button
            size="sm"
            justifyItems="center"
            onClick={() => handleAddOneItem(props.id)}
          >
            +
          </Button>
        </Flex>
      </Td>

      <Td
        borderColor={borderColor}
        //    borderBottom={isLast ? "none" : null}
      >
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {price} ریال
        </Text>
      </Td>
      <Td
        borderColor={borderColor}
        //   borderBottom={isLast ? "none" : null}
      >
        <IconBox>
          <DeleteIcon onClick={() => handleDeleteItem(props.id)} />
        </IconBox>
        {/* <CourseEditModal
          courseId={courseId}
          courses={courses}
          statusData={statusData}
        /> */}
      </Td>
    </Tr>
  );
};
export default OrderListTableRow;

OrderListTableRow.PropTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  count: PropTypes.number,
  price: PropTypes.number,
};
