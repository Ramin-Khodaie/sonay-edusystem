// Chakra imports
import {
    SimpleGrid,
    Flex,
    Text,
    Box,
    Textarea,
    FormControl,
    Input,
    FormLabel,
    Button,
    Spacer,
    InputLeftElement,
    Checkbox,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from "@chakra-ui/react";
  // Custom components
  
  import React from "react";
  import MultiSelect from "components/MultiSelect/MultiSelect";
  
  import useNotify from "helpers/notify/useNotify";
  import { useEffect } from "react";
  import { bixios } from "services/main";
  import { useDispatch, useSelector } from "react-redux";
import { createProductAction } from "redux/product/productCreate/productCreateAction";
import { productListAction } from "redux/product/productList/ProductListAction";
import { useProduct } from "hooks/products/useProduct";
import { isConstTypeReference } from "typescript";
import { createProduct } from "services/product";

  function ProductForm(props) {
    const { courses,productList, setProductList,onClose,productId="-1"  } = props;
    const notify = useNotify();

  
    const currentProduct = useProduct(productId)


    const [formData, setFormData] = React.useState({
      _id: "",
      name: "",
      price: "",
      isMain: true,
      isActive: true,
      description: "",
      courses: [],
    });

    const [isLoading, setIsLoading] = React.useState(false);

  
    const handleOptionChange = (e) => {
      const newOpt = courses.find((f) => f._id === e.target.value);
      formData.courses.findIndex((itm) => itm._id == newOpt._id) === -1
        ? setFormData({ ...formData, courses: [...formData.courses, {'id' : newOpt._id,
      'name' : newOpt.name}] })
        : notify("این آیتم قبلا انتخاب شده است", true, "solid", "warning");
    };
  
    const handleDelete = (id) => (e) => {
      const cc = formData.courses.filter((element) => {
        return element.id !== id;
      });
      setFormData({ ...formData, courses: cc });
    };
 
    const doSubmit = async () => {
      const newProduct = {
        _id: formData._id,
        name: formData.name,
        price: formData.price,
        isMain: formData.isMain,
        isActive: formData.isActive,
        description: formData.description,
        courses: formData.courses,
      };
      setIsLoading(true);



      await createProduct(newProduct).then((res) => {
        switch (res.result) {
          case "ok":
            if(productId === '-1'){
              // insert mode
              setIsLoading(false);
  
            setProductList([...productList, res.data]);
            notify("محصول با موفقیت ثبت شد", true, "solid", "success");
  
            break;
            }else{
              // edit mode
              
              setProductList(productList.map((item , key)=>{
                return item._id === res.data._id ? res.data : item
              }))
              notify("محصول با موفقیت ویرایش شد", true, "solid", "success");
              setIsLoading(false);
              onClose()
  
              break
            }
          case "empty_field":
            setIsLoading(false);
  
            notify("تمامی فیلدها تکمیل شوند", true, "solid", "error");
            break;
          case "not_unique":
            setIsLoading(false);
            notify("محصول از قبل ثبت شده است", true, "solid", "error");
            break;
        }
      });
    };
  
    function handleSubmitform() {
      doSubmit();
    }
  
    const handleChange = (event) => {
      const field = event.target.id;
      const value = event.target.value;
      setFormData({ ...formData, [field]: value });
    };

    const handleCheckBoxChange = (event) => {
      const field = event.target.id;
      const value = event.target.checked;
      setFormData({ ...formData, [field]: value });
    }




  useEffect(() => {
    if (currentProduct.length != 0) {
      setFormData({
        ...formData,
        _id: currentProduct[0]._id,
        name: currentProduct[0].name,
        price: currentProduct[0].price,
        isMain: currentProduct[0].is_main,
        isActive: currentProduct[0].is_active,
        description: currentProduct[0].description,
        courses: currentProduct[0].courses,
      });
    }
  }, [currentProduct]);


    return (
      <>
        <SimpleGrid
          dir="rtl"
          pb={"20px"}
          // templateRows="repeat(3, 1fr)"
          // templateColumns="repeat(12, 1fr)"
          gap={3}
          columns={{ sm: 1, md: 1, xl: 3 }}
        >
          <Box>
            <Box mb={"10px"}>
              <Flex>
                <FormLabel mb="5px" fontSize="sm" fontWeight="normal">
                  نام محصول{" "}
                </FormLabel>
                <Spacer />
                <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
              </Flex>
  
              <Input
                onChange={handleChange}
                id="name"
                value={formData.name}
                placeholder="نام محصول را وارد نمایید"
                size="lg"
                
              />
            </Box>
            <Box mb={"15px"}>
              <Flex>
                <FormLabel mb="5px" fontSize="sm" fontWeight="normal">
                  قیمت محصول{" "}
                </FormLabel>
                <Spacer />
                <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
              </Flex>
  
              <NumberInput
                  
                  size={"lg"}
                  dir="ltr"
                  defaultValue={0}
                  value={formData.price}

                >
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="ریال"
                  />
                  <NumberInputField 
                   onChange={handleChange}
                  id="price"
                   textAlign={"center"} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
  
  
            </Box>
  
            <Box>
              <SimpleGrid row={2} spacing={4}>
                <Checkbox 
                onChange={handleCheckBoxChange} 
                id="isActive" 
                size={"lg"}
                isChecked= {formData.isActive ? true : false}
                
                 >
                  آیا این محصول فعال است؟
                </Checkbox>
                <Checkbox onChange={handleCheckBoxChange} id="isMain" size={"lg"} 
                        isChecked= {formData.isMain ? true : false}>
                  آیا این محصول اصلی تلقی می شود؟
                </Checkbox>
              </SimpleGrid>
            </Box>
          </Box>
  
          <Box>
            <Box rowSpan={3} colSpan={4}>
              <Flex>
                <FormLabel mb="5px" fontSize="sm" fontWeight="normal">
                  توضیحات محصول{" "}
                </FormLabel>
                <Spacer />
                <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
              </Flex>
              <Textarea
                onChange={handleChange}
                id="description"
                value={formData.description}
                resize={"none"}
                height={"220px"}
                placeholder="محصول خود را با چند جمله توصیف کنید"
              />
            </Box>
          </Box>
  
          <Box>
            <Box>
              <Flex>
                <FormLabel mb="5px" fontSize="sm" fontWeight="normal">
                  دوره های محصول{" "}
                </FormLabel>
                <Spacer />
                <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
              </Flex>
              <MultiSelect
                handleChange={handleOptionChange}
                handleDelete={handleDelete}
                data={courses}
                options={formData.courses}
                placeholder="دوره محصول را انتخاب کنید"
              />
            </Box>
          </Box>
        </SimpleGrid>
  
        <Button
          style={{ right: "0px" }}
          onClick={handleSubmitform}
          color={"white"}
          fontSize="20px"
          fontFamily="Lalezar"
          bg="blue.400"
          fontWeight="bold"
          h="45"
          w={{ sm: "100%", md: "15%", lg: "15%" }}
          mb={"20px"}
          type={"submit"}
        >
  
          {isLoading ? "در حال ثبت " : "ثبت "}
          {/* {true ? "در حال ثبت " : "ثبت "} */}
        </Button>
      </>
    );
  }
  
  export default ProductForm;