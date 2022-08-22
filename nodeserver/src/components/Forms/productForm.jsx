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
} from "@chakra-ui/react";
// Custom components

import React from "react";
import MultiSelect from "components/MultiSelect/MultiSelect";

import useNotify from "helpers/notify/useNotify";
import { useUser } from "hooks/users/useUser";
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

  const [formData, setFormData] = React.useState({
    _id: "",
    name: "",
    price: 0,
    isMain: true,
    isActive: true,
    description: "",
    courses: [],
  });

  const handleOptionChange = (e) => {
    const newOpt = courses.find((f) => f._id === e.target.value);
    formData.courses.findIndex((itm) => itm._id == newOpt._id) === -1
      ? setFormData({ ...formData, courses: [...formData.courses, newOpt] })
      : notify("این آیتم قبلا انتخاب شده است", true, "solid", "warning");
  };

  const handleDelete = (id) => (e) => {
    const cc = formData.courses.filter((element) => {
      return element._id !== id;
    });
    setFormData({ ...formData, courses: cc });
  };

  return (
    <>
      <Grid
        pb={"20px"}
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(12, 1fr)"
        gap={3}
      >
        <GridItem dir="rtl" rowSpan={3} colSpan={4}>
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
          />
        </GridItem>

        <GridItem dir="rtl" rowSpan={3} colSpan={4}>
          <Flex>
            <FormLabel mb="5px" fontSize="sm" fontWeight="normal">
              توضیحات محصول{" "}
            </FormLabel>
            <Spacer />
            <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
          </Flex>
          <Textarea
            resize={"none"}
            height={"220px"}
            placeholder="محصول خود را با چند جمله توصیف کنید"
          />
        </GridItem>
        <GridItem dir="rtl" rowSpan={1} colSpan={4}>
          <Flex>
            <FormLabel mb="5px" fontSize="sm" fontWeight="normal">
              نام محصول{" "}
            </FormLabel>
            <Spacer />
            <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
          </Flex>

          <Input placeholder="large size" size="lg" />
        </GridItem>
        <GridItem dir="rtl" rowSpan={1} colSpan={4}>
          <Flex>
            <FormLabel mb="5px" fontSize="sm" fontWeight="normal">
              توضیحات محصول{" "}
            </FormLabel>
            <Spacer />
            <Text textAlign={"end"} color={"red"} fontSize={"14px"}></Text>
          </Flex>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="ریال"
            />
            <Input size={"lg"} placeholder="Enter amount" />
            <InputRightElement
              children={<CheckIcon fontSize={"24px"} color="green.500" />}
            />
          </InputGroup>
        </GridItem>

        <GridItem dir="rtl" rowSpan={1} colSpan={4}>
          <SimpleGrid row={2} spacing={4}>
            <Checkbox size={"lg"} defaultChecked>
              آیا این محصول فعال است؟
            </Checkbox>
            <Checkbox size={"lg"} defaultChecked>
              آیا این محصول اصلی تلقی می شود؟
            </Checkbox>
          </SimpleGrid>
        </GridItem>
      </Grid>
    </>
  );
}

export default ProductForm;
