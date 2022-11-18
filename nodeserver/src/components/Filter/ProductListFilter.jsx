import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Input,
    Select,
    SimpleGrid,
    Spacer,
    Text,
    Checkbox,
    useColorModeValue,
  } from "@chakra-ui/react";
  import CustomSelector from "components/Selectors/CustomSelector";
  import StudentStatusSelector from "components/Selectors/StudentStatusSelector";
  import UserNameInput from "components/Selectors/UserNameInput";
  import React, { useEffect } from "react";
  import { userListAction } from "redux/user/UserList/UserListAction";
  import { connect, useDispatch, useSelector } from "react-redux";
import { ProductPop2 } from "components/PopOvers/ProductPopOver";
  
  const ProductListFilter = (props) => {
    const { filter, onChange, courses ,selectChange , handleCheckBoxChange   } = props;
  
    const textColor = useColorModeValue("gray.700", "white");

    return (
      <Flex direction="column">
        <Accordion allowToggle>
          <AccordionItem>
            <Flex>
              <Box>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {" "}
                      نمایش فیلتر ها{" "}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>{" "}
              </Box>
              <Spacer />
              <Flex>
              <ProductPop2 />
              
                <Text
                  fontSize="xl"
                  color={textColor}
                  fontWeight="bold"
                  textAlign={"right"}
                  my={"10px"}
                >
                  لیست محصولات{" "}
                </Text>
               
              </Flex>
            </Flex>
  
            <AccordionPanel pb={4}>
              <SimpleGrid
                style={{ direction: "rtl" }}
                columns={{ sm: 1, md: 2, xl: 4 }}
                spacing="24px"
                mb="20px"
     
              >


                
                <Input
                id="name"
                onChange={onChange}
                focusBorderColor="purple.300"
                textAlign="right"
                variant="outline"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="نام محصول را وارد کنید"
                mb="10px"
                size="md"
            />
                <CustomSelector
                  onChange={selectChange}
                  data={courses}
                  state={filter}
                  placeHolder={"دوره محصول را انتخاب کنید"}
                  fieldId={"courses"}
                />


<CustomSelector
                  onChange={selectChange}
                  data={[{"_id" : 'active' , 'name' : "فعال"},{"_id" : 'deactive' , 'name' : "غیرفعال"}]}
                  state={filter}
                  placeHolder={"وضعیت محصول را انتخاب کنید"}
                  fieldId={"isActive"}
                />



<CustomSelector
                  onChange={selectChange}
                  data={[{"_id" : 'main' , 'name' : "اصلی"},{"_id" : 'not_main' , 'name' : "جانبی"}]}
                  state={filter}
                  placeHolder={"نوع محصول را انتخاب کنید"}
                  fieldId={"isMain"}
                />



                


              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    );
  };
  
  export default ProductListFilter;
  