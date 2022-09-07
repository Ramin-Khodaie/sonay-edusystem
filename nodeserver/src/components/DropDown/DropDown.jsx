import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { CartIcon } from "components/Icons/Icons";
import { useSelector } from "react-redux";
import { ProductContent } from "components/Menu/ProductContent";
import {useHistory} from "react-router-dom"
const DropDown = () => {
  const iconBoxInside = useColorModeValue("white", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const { cartItems } = useSelector((state) => state.order);
  const history = useHistory()
  const handleClick = () => {
    history.push('/student/checkout')
  };
  return (
    <Menu>
      <MenuButton>
        <div className="carticon" as="box" h={"45px"} w={"45px"}>
         {cartItems.length > 0 && <span>{cartItems.length}</span>}
          <CartIcon h={"24px"} w={"24px"} color={iconBoxInside}  />

        </div>
      </MenuButton>
      <MenuList p="16px 4px" bg={menuBg} justifyContent="center">
        {cartItems.length > 0 ? (
          <Flex flexDirection="column">
            {cartItems.map((item) => (
              <MenuItem borderRadius="8px" mb="10px">
                <ProductContent
                  desc={item.description}
                  title={item.title}
                  aName={item.title}
                  aSrc={item.imageUrl}
                  price={item.price}
                  count={item.quantity}
                />
              </MenuItem>
            ))}
            <Button disabled={cartItems.length === 0} onClick={handleClick}>
              Go to Checkout
            </Button>
          </Flex>
        ) : (
          <Flex height="250px" justifyContent="center" alignItems="center">
            Cart is empty
          </Flex>
        )}
      </MenuList>
    </Menu>
  );
};

export default DropDown;
