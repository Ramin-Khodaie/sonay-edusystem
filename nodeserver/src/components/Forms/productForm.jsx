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
    Select,
    Spacer,
    Grid,
    GridItem,
    InputGroup,
    InputRightElement,
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
  import { createCourseAction } from "redux/course/createCource/createCourseAction";
  import { courseListAction } from "redux/course/courseList/courseListAction";
  import CustomSelector from "components/Selectors/CustomSelector";
  import { useCourse } from "hooks/courses/useCourse";
  import { CheckIcon } from "@chakra-ui/icons";
  
  function ProductForm(props) {
    const { courses } = props;
    const notify = useNotify();
  
    const [formData, setFormData] = React.useState({
      _id: "",
      name: "",
      price: "",
      isMain: true,
      isActive: true,
      description: "",
      courses: [],
    });
  
    const handleOptionChange = (e) => {
      const newOpt = courses.find((f) => f._id === e.target.value);
      formData.courses.findIndex((itm) => itm._id == newOpt._id) === -1
        ? setFormData({ ...formData, courses: [...formData.courses, {'id' : newOpt._id,
      'name' : newOpt.name}] })
        : notify("این آیتم قبلا انتخاب شده است", true, "solid", "warning");
    };
  
    const handleDelete = (id) => (e) => {
      const cc = formData.courses.filter((element) => {
        return element._id !== id;
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
      await dispatch(createProductAction(newProduct));
      await dispatch(userListAction());
    };
  
    function handleSubmitform() {
      doSubmit();
    }
  
    const handleChange = (event) => {
      const field = event.target.id;
      const value = event.target.value;
      setFormData({ ...formData, [field]: value });
    };
  
  
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
                placeholder="large size"
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
                >
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="ریال"
                  />
                  <NumberInputField onChange={handleChange}
                  id="price"
                  value={formData.price} textAlign={"center"} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
  
  
            </Box>
  
            <Box>
              <SimpleGrid row={2} spacing={4}>
                <Checkbox size={"lg"} defaultChecked>
                  آیا این محصول فعال است؟
                </Checkbox>
                <Checkbox size={"lg"} defaultChecked>
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
          ثبت
          {/* {isLoading ? "در حال ثبت " : "ثبت "} */}
          {/* {true ? "در حال ثبت " : "ثبت "} */}
        </Button>
      </>
    );
  }
  
  export default ProductForm;