import { Button, Flex, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { CartIcon } from "components/Icons/Icons";
import OrderListTable from "components/Tables/OrderListTable/OrderListTable";
import AuthorizeProvider from "helpers/authorize/AuthorizeProvider";
import React from "react";
import { useSelector } from "react-redux";
const Checkout = () => {
  const { cartItems } = useSelector((state) => state.order);
  const totalPurchased = () => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
  };
  return (
    <AuthorizeProvider roles={["student"]}>
      <Card my="100px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardBody>
          <OrderListTable />
        </CardBody>
        <Flex justifyContent="space-around" margin="50px 0px">
          <Button
            disabled={cartItems.length === 0}
            variant="solid"
            _hover={{ background: "green.400" }}
            width="25%"
            color="gray.800"
            colorScheme="green"
            leftIcon={<CartIcon color="gray.600" fontSize="1.6rem" />}
          >
            ادامه فرآیند خرید
          </Button>
          <Flex flexDirection="row" justifyContent="space-around">
            <Text p="5px" fontWeight="bold">
              {totalPurchased()} ریال
            </Text>

            <Text p="5px">: مجموع خرید</Text>
          </Flex>
        </Flex>
      </Card>
    </AuthorizeProvider>
  );
};

export default Checkout;
