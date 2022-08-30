import {
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import OrderListTableRow from "./OrderListTableRow";
import { useSelector } from "react-redux";
import { CartIcon } from "components/Icons/Icons";

const OrderListTable = (props) => {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const { cartItems } = useSelector((state) => state.order);
  console.log(cartItems);
  return (
    <Table style={{ direction: "rtl" }} variant="simple" color={textColor}>
      <Thead verticalAlign={true}>
        <Tr my=".8rem" pl="0px" color="gray.400">
          <Th pl="0px" borderColor={borderColor} color="gray.400"></Th>
          <Th borderColor={borderColor} color="gray.400" textAlign="center">
            عنوان کتاب
          </Th>
          <Th borderColor={borderColor} color="gray.400" textAlign="center">
            توضیحات
          </Th>

          <Th borderColor={borderColor} color="gray.400" textAlign="center">
            تعداد
          </Th>
          <Th borderColor={borderColor} color="gray.400" textAlign="center">
            قیمت هر واحد
          </Th>
          <Th borderColor={borderColor} color="gray.400" textAlign="center">
            حذف
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {cartItems.length > 0 ? (
          cartItems.map((item, idx) => {
            return (
              <OrderListTableRow
                cartitem={item}
                key={item.id}
                
              />
            );
          })
        ) : (
          <Td colSpan="6">
            <Flex
              flexDirection="column"
              height="200"
              justifyContent="center"
              alignItems="center"
            >
              <CartIcon fontSize="3xl" mb="15px" />
              <Text fontSize="2xl">سبد خرید خالی میباشد</Text>
            </Flex>
          </Td>
        )}
      </Tbody>
    </Table>
  );
};

export default OrderListTable;
