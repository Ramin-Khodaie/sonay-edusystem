// Chakra imports
import {
  SimpleGrid,
  Flex,
  Text,
  Box,
  Textarea,
  Avatar,
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
  Select,
  Divider 
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
import CustomSelector from "components/Selectors/CustomSelector";
import { useState } from "react";
import { createMark } from "services/mark";

function MarkForm(props) {
  const { selectedCourse, selectedStudent } = props;
  const data = [
    { _id: "outstanding", name: "بسیار عالی" },
    { _id: "good", name: "عالی" },
    { _id: "satisfactory", name: "قابل قبول" },
    { _id: "weak", name: "ضعیف" },
  ];
  const notify = useNotify();

  const [formData, setFormData] = useState({
    _id: "",
    classActivity: 0,
    quiz: 0,
    extra: 0,
    midterm: 0,
    final: 0,
    sum: 0,
    homework: { id: "", name: "" },
    writing: { id: "", name: "" },
    reading: { id: "", name: "" },
    listening: { id: "", name: "" },
    speaking: { id: "", name: "" },

    activiy: { id: "", name: "" },
    message: "",
    student: selectedStudent,
    course: selectedCourse,

    teacher: { name: "مختار عمی", _id: "123456789" },
  });

  const handleChange = (event) => {
    const field = event.target.id;
    const value = event.target.value;
    console.log(typeof value);

    setFormData({ ...formData, [field]: value });
  };

  const handleNumbersChange = (event) => {
    const field = event.target.id;
    const value = event.target.value;

    setFormData({ ...formData, [field]: Number(value) });
  };

  function handleSubmitform() {
    createPost();
  }

  const createPost = async () => {
    const res = await createMark(formData);

    switch (res.result) {
      case "ok":
        notify("نمره با موفقیت ثبت شد", true, "solid", "success");
        break;
      case "empty_field":
        dispatch(createProductError("تمامی فیلدها تکمیل شوند."));
        break;
      case "not_unique":
        dispatch(createProductError("کاربر از قبل ثبت شده است."));
        break;
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      course: selectedCourse,
      student: selectedStudent,
    });
  }, [selectedCourse, selectedStudent]);

  useEffect(() => {
    let ss =
      formData.classActivity +
      formData.quiz +
      formData.extra +
      formData.midterm +
      formData.final;

    setFormData({
      ...formData,
      sum: ss,
    });
  }, [
    formData.classActivity,
    formData.quiz,
    formData.extra,
    formData.midterm,
    formData.final,
  ]);

  return (
    <>
      <SimpleGrid dir="rtl" columns={{ sm: 1, md: 2, xl: 3 }} spacing={15}>
      <Box>



        <Box textAlign={'center'}>
        <Avatar size="xl" name={selectedStudent.name} />
  
        <Text fontFamily={'Lalezar'} fontSize={'3xl'}>{selectedStudent.name}</Text>
        <Text  fontSize={'sm'}>{selectedCourse.name}</Text>
      <Divider mb={"10px"}  />





        </Box>





          <Box>
          <Flex>
            <FormLabel my="5px" fontSize="sm" fontWeight="normal">
              متن پیام به کاربر{" "}
            </FormLabel>
            <Spacer />
            <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
          </Flex>

          <Textarea
            id="message"
            onChange={handleChange}
            value={formData.message}
            resize={"none"}
            height={"220px"}
            mb={"15px"}
            placeholder="در این کادر متن پیام خود را برای کاربر بنویسید. این متن در انتهای کارنامه کاربر قابل مشاهده خواهد بود"
          />
          </Box>
        </Box>
        <Box>
          <Box>
            <Flex>
              <FormLabel my="5px" fontSize="sm" fontWeight="normal">
                فعالیت کلاسی
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <NumberInput size={"md"} dir="ltr">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              />
              <NumberInputField
                defaultValue={0}
                onChange={handleNumbersChange}
                id="classActivity"
                value={formData.classActivity}
                textAlign={"center"}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          <Box>
            <Flex>
              <FormLabel my="5px" fontSize="sm" fontWeight="normal">
                کوییز{" "}
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <NumberInput size={"md"} dir="ltr">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              />
              <NumberInputField
                defaultValue={0}
                onChange={handleNumbersChange}
                id="quiz"
                value={formData.quiz}
                textAlign={"center"}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          <Box>
            <Flex>
              <FormLabel my="5px" fontSize="sm" fontWeight="normal">
                نمره اضافی{" "}
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <NumberInput size={"md"} dir="ltr">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              />
              <NumberInputField
                defaultValue={0}
                onChange={handleNumbersChange}
                id="extra"
                value={formData.extra}
                textAlign={"center"}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          <Box>
            <Flex>
              <FormLabel my="5px" fontSize="sm" fontWeight="normal">
                میانترم{" "}
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <NumberInput size={"md"} dir="ltr">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              />
              <NumberInputField
                defaultValue={0}
                onChange={handleNumbersChange}
                id="midterm"
                value={formData.midterm}
                textAlign={"center"}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          <Box>
            <Flex>
              <FormLabel my="5px" fontSize="sm" fontWeight="normal">
                فاینال{" "}
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <NumberInput size={"md"} dir="ltr">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              />
              <NumberInputField
                defaultValue={0}
                onChange={handleNumbersChange}
                id="final"
                value={formData.final}
                textAlign={"center"}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          <Box>
            <Flex>
              <FormLabel my="5px" fontSize="sm" fontWeight="normal">
                نمره نهایی{" "}
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <NumberInput
              disabled
              size={"md"}
              dir="ltr"
              defaultValue={0}
              onChange={handleNumbersChange}
              id="sum"
              value={formData.sum}
              textAlign={"center"}
            >
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              />
              <NumberInputField textAlign={"center"} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </Box>
        <Box>
          <Box>
            <Flex>
              <FormLabel my="5px" fontSize="sm" fontWeight="normal">
                تکالیف{" "}
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <CustomSelector
              onChange={setFormData}
              data={data}
              state={formData}
              placeHolder={"انتخاب کنید"}
              fieldId={"homework"}
            />
          </Box>

          <Box>
            <Flex>
              <FormLabel my="5px" fontSize="sm" fontWeight="normal">
                مهارت نوشتن{" "}
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <CustomSelector
              onChange={setFormData}
              data={data}
              state={formData}
              placeHolder={"انتخاب کنید"}
              fieldId={"writing"}
            />
          </Box>

          <Box>
            <Flex>
              <FormLabel my="5px" fontSize="sm" fontWeight="normal">
                مهارت خواندن{" "}
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <CustomSelector
              onChange={setFormData}
              data={data}
              state={formData}
              placeHolder={"انتخاب کنید"}
              fieldId={"reading"}
            />
          </Box>

          <Box>
            <Flex>
              <FormLabel my="5px" fontSize="sm" fontWeight="normal">
                مهارت شنیدن{" "}
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <CustomSelector
              onChange={setFormData}
              data={data}
              state={formData}
              placeHolder={"انتخاب کنید"}
              fieldId={"listening"}
            />
          </Box>

          <Box>
            <Flex>
              <FormLabel my="5px" fontSize="sm" fontWeight="normal">
                مهارت مکالمه{" "}
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <CustomSelector
              onChange={setFormData}
              data={data}
              state={formData}
              placeHolder={"انتخاب کنید"}
              fieldId={"speaking"}
            />
          </Box>

          <Box>
            <Flex>
              <FormLabel my="5px" fontSize="sm" fontWeight="normal">
                فعالیت در کلاس{" "}
              </FormLabel>
              <Spacer />
              <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
            </Flex>

            <CustomSelector
              onChange={setFormData}
              data={data}
              state={formData}
              placeHolder={"انتخاب کنید"}
              fieldId={"activiy"}
            />
          </Box>
        </Box>
    
      </SimpleGrid>
      <Button
        onClick={handleSubmitform}
        style={{ right: "0px" }}
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

export default MarkForm;
