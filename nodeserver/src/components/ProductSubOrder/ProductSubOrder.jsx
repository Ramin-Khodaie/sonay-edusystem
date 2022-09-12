import {
  Radio,
  RadioGroup,
  Stack,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import avatar6 from "assets/img/avatars/avatar6.png";
import { CheckIcon } from "@chakra-ui/icons";
import { FaCartPlus, FaRegCheckCircle, FaTrashAlt } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AddCartItems } from "redux/product/orderReducer";
import IconBox from "components/Icons/IconBox";
import { CartIcon } from "components/Icons/Icons";
import { DeleteCartItem } from "redux/product/orderReducer";

function ProductSubOrder(props) {
  const { cartItems, books } = props;
  const iconBlue = useColorModeValue("blue", "white");
  const iconBoxInside = useColorModeValue("white", "white");

  const [value, setValue] = useState("1");
  const [added, setAdded] = useState([]);

  const dispatch = useDispatch();
  const handleCart = (item) => {
    const isFound = cartItems.some((element) => {
      if (element.id === item.id) {
        return true;
      }

      return false;
    });
    if (!isFound) {
      dispatch(AddCartItems(item));
      if (!added.includes(item.id)) {
        setAdded((oldArray) => [...oldArray, item.id]);
      }
    }
  };

  const handleDeleteItem = (item) => {
    dispatch(DeleteCartItem(item));

    setAdded((current) =>
      current.filter((element) => {
        return element !== item.id;
      })
    );
  };

  return (
    <>
      <RadioGroup mt="15px" onChange={setValue} value={value}>
        <Stack direction="row">
          <Radio value="1">عدم سفارش کتاب</Radio>
          <Radio value="2">سفارش کتاب</Radio>
        </Stack>
      </RadioGroup>

      {value === "2" ? (
        <TableContainer>
          <Table mt="15px" variant="simple">
            <TableCaption>لیست کتاب های تعریف شده برای این دوره</TableCaption>
            <Thead>
              <Tr>
                <Th>نام محصول</Th>
                <Th>قیمت</Th>
                <Th> </Th>
              </Tr>
            </Thead>
            <Tbody>
              {books.map((itm, key) => (
                <Tr>
                  <Td overflow={"hidden"} maxW={"40px"}>
                    {itm.name}
                  </Td>
                  <Td>{itm.price}</Td>
                  <Td>
                    {!added.includes(itm.id) ? (
                      <FaCartPlus
                        cursor={"pointer"}
                        fontSize={"24px"}
                        color={iconBlue}
                        onClick={(e) => handleCart(itm)}
                      />
                    ) : (
                      <FaTrashAlt
                        cursor={"pointer"}
                        fontSize={"24px"}
                        color={"red"}
                        onClick={(e) => handleDeleteItem(itm)}
                      />
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </>
  );
}

export default ProductSubOrder;
