// Chakra imports
import {
  SimpleGrid,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import UserForm from "components/Forms/userForm";
import Pagination from "components/Pagination/pagination";
import UserListSkleton from "components/Skleton/UserListSkleton/UserListSkleton";
import TablesTableRow from "components/Tables/TablesTableRow";
import UserListFilter from "components/Filter/UserListFilter";
import UserListTable from "components/Tables/UserListTable/UserListTable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseListAction } from "redux/course/courseList/courseListAction";
import { userListAction } from "redux/user/UserList/UserListAction";
import ProductForm from "components/Forms/productForm";
import ProductListFilter from "components/Filter/ProductListFilter";
import ProductListTable from "components/Tables/ProductListTable/ProductListTable";
import { productListAction } from "redux/product/productList/ProductListAction";
const Product = () => {
  const { productList, errorMessage, isPending } = useSelector(
    (state) => state.productList
  );
  const { courseList } = useSelector((state) => state.courseList);
  const dispatch = useDispatch();

  const textColor = useColorModeValue("gray.700", "white");
  const [filter, setFilter] = React.useState({
    name: "",
    isMain: false,
    isActive: false,
    courses: { id: "", name: "" },
  });

  const handleChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setFilter({ ...filter, [field]: value });
  };

  const handleCheckBoxChange = (event) => {
    const field = event.target.id;
    const value = event.target.checked;
    setFilter({ ...filter, [field]: value });
  };

  const [state, setState] = useState([]);

  useEffect(() => {
    setState(productList);

    if (
      filter.name !== "" ||
      filter.isActive ||
      filter.isMain ||
      filter.courses.id !== ""
    ) {
      doSearch();
    }
  }, [filter]);

  const doSearch = () => {
    let tmp = productList;
    console.log("here", filter, tmp, 80);

    if (filter.name !== "") {
      console.log(1);

      tmp = tmp.filter((f) => f.name === filter.name);
    }
    if (filter.courses.id !== "") {

      // here we filterr incoming data based on object inside an elemen in incoming data
      // so we map through array element and if any  element matches our condition we ruturn true

      tmp = tmp.filter((f) => {
        const arry = f.courses;
        let res = false;
        arry.map((itm, key) => {

          if (itm.id === filter.courses.id) {
            res = true;
          }
        });
        return res;
      });
    }
    if (filter.isActive) {
      console.log(3);

      tmp = tmp.filter((f) => f.is_active === filter.isActive);
    }

    if (filter.isMain) {
      console.log(4);

      tmp = tmp.filter((f) => f.is_main === filter.isMain);
    }
    setState(tmp);
  };

  const getList = async () => {
    await dispatch(productListAction());
    await dispatch(courseListAction());
  };
  useEffect(() => {
    getList();
    setState(productList);
  }, []);

  useEffect(() => {
    setState(productList);
  }, [isPending]);

  console.log(filter, 85);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign={"right"}
          >
            ثبت محصول جدید
          </Text>
        </CardHeader>

        <CardBody>
          <ProductForm courses={courseList} />
        </CardBody>
      </Card>

      <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Accordion allowToggle>
              <AccordionItem>
                <ProductListFilter
                  filter={filter}
                  onChange={handleChange}
                  courses={courseList}
                  selectChange={setFilter}
                  handleCheckBoxChange={handleCheckBoxChange}
                />
              </AccordionItem>
            </Accordion>
          </Flex>
        </CardHeader>

        <ProductListTable data={state} courses={courseList} />

        {/* {isPending ? (
            <UserListSkleton />
          ) : (
            <ProductListTable data={productList} courses={courseList} />
          )} */}
      </Card>
    </Flex>
  );
};

export default Product;
