// Chakra imports
import {
  useColorModeValue,
  Flex,
  Text,
  Accordion,
  AccordionItem,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseListAction } from "redux/course/courseList/courseListAction";
import ProductForm from "components/Forms/productForm";
import ProductListFilter from "components/Filter/ProductListFilter";
import ProductListTable from "components/Tables/ProductListTable/ProductListTable";
import { productListAction } from "redux/product/productList/ProductListAction";
import AuthorizeProvider from "helpers/authorize/AuthorizeProvider";
import { getProductList } from "services/product";
const Product = () => {

  const { courseList } = useSelector((state) => state.courseList);
  

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

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(productList);

    if (
      filter.name !== "" ||
      filter.isActive ||
      filter.isMain ||
      filter.courses.id !== ""
    ) {
      callData();
    }
  }, [filter]);


const callData = async()=>{
  await getProductList(filter).then((res)=>{
    setProductList(res.data.data)
  })



}

  useEffect(() => {
    callData()
  }, []);

  return (
    <AuthorizeProvider roles={["admin"]}>
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
            <ProductForm productList={productList} setProductList={setProductList} courses={courseList} />
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

          <ProductListTable productList={productList} setProductList={setProductList}  courses={courseList} />

          {/* {isPending ? (
            <UserListSkleton />
          ) : (
            <ProductListTable data={productList} courses={courseList} />
          )} */}
        </Card>
      </Flex>
    </AuthorizeProvider>
  );
};

export default Product;
