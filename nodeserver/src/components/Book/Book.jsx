import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import IconBox from "components/Icons/IconBox";
import { CartIcon } from "components/Icons/Icons";
import { AddCartItems } from "redux/product/productReducer";
import { useDispatch } from "react-redux";

const Book = ({ item }) => {
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");

  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(AddCartItems(item));
  };
  return (
    <Card minH="125px">
      <Flex direction="column">
        <Flex
          flexDirection="row"
          align="center"
          justify="center"
          w="100%"
          mb="25px"
        >
          <Stat me="auto">
            <StatLabel
              fontSize="xl"
              color="gray.400"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {item.title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                {item.price} Rial
              </StatNumber>
            </Flex>
          </Stat>
          <IconBox
            style={{ cursor: "pointer" }}
            borderRadius="50%"
            as="box"
            h={"45px"}
            w={"45px"}
            bg={iconBlue}
          >
            <CartIcon
              h={"24px"}
              w={"24px"}
              color={iconBoxInside}
              onClick={handleCart}
            />
          </IconBox>
        </Flex>
        <img src={item.imageUrl} alt={item.title} />
        <Text color="gray.400" fontSize="sm" mt="5">
          {/* <Text as="span" color="green.400" fontWeight="bold">
            +8.12%{" "}
          </Text> */}
          {item.description}
        </Text>
      </Flex>
    </Card>
  );
};
export default Book;
