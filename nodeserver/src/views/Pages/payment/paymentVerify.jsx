import {
  Spinner,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  SimpleGrid,
  Grid,
  GridItem,
  Image,
  Center,
} from "@chakra-ui/react";
import { useQuery } from "hooks/useQuery";
import React, { useEffect, useState } from "react";
import { useParams, use, useLocation, useHistory } from "react-router-dom";
import { verifyRegistration } from "services/purchase";
import paymentSuccess from "assets/img/paymentSuccess.jpg";
import paymentError from "assets/img/paymentError.jpg";
import { FaRegCheckCircle, FaTimes } from "react-icons/fa";
import { userInfoAction } from "redux/user/UserInfo/UserInfoAction";
import { useDispatch } from "react-redux";
import PaymentSuccess from "./paymentSuccess";
import PaymentError from "./paymentError";
function PaymentVerify(props) {
  let query = useQuery();

  const paymentStatus = query.get("Status");
  const [status, setStatus] = useState(paymentStatus);


  return <> {status === "OK" ? <PaymentSuccess /> : <PaymentError />} </>;
}

export default PaymentVerify;
