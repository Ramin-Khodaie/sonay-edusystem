// Chakra imports
import {
  useColorModeValue,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  Box,
  WrapItem,
  Tag,
  TagLabel,
  IconButton,
  Wrap,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

import AuthorizeProvider from "helpers/authorize/AuthorizeProvider";
import Card from "components/Card/Card";
import CustomSelector from "components/Selectors/CustomSelector";
import { useSelector } from "react-redux";
import { getCourseMembers } from "services/course";
import { CloseIcon } from "@chakra-ui/icons";
import { courseTransfer } from "services/course";
import useNotify from "helpers/notify/useNotify";

const Transfer = () => {
  const { courseList } = useSelector((state) => state.courseList);
  const [formData, setFormData] = useState({
    soCource: { id: "", name: "" },
    students: [],
    desCourse: { id: "", name: "" },
  });
  const [state, setState] = useState({
    isLoading: false,
  });
  const handleOptionCourseDelete = (id) => (e) => {

    const cc = formData.students.filter((element) => {
      return element._id !== id;
    });
    setFormData({ ...formData, students: cc });
  };
  const notify = useNotify();

  const handleSubmit = () => {
    setState({ ...state, isLoading: true });

    courseTransfer(formData).then((res) => {

      if (res.status && res.status === 200) {
        notify("کاربران با موفقیت انتقال یافتند", true, "solid", "success");
        setFormData({
          soCource: { id: "", name: "" },
          students: [],
          desCourse: { id: "", name: "" },
        });

        setState({ ...state, isLoading: false });
      } else if (res.status && res.status === 422){
        notify("دوره مقصد را انتخاب کنید", true, "solid", "error");
        setState({ ...state, isLoading: false });
      }
    });
  };
  const callCourseMembers = () => {
    getCourseMembers(formData.soCource.id).then((res) => {
      setFormData({ ...formData, students: res.data.data });
    });
  };

  useEffect(() => {
    if (formData.soCource.id !== "") {
      callCourseMembers();
    }
  }, [formData.soCource]);

  return (
    <AuthorizeProvider roles={["admin"]}>
      <Flex direction="column" pt="75px">
        <Card>
          <SimpleGrid dir="rtl"  columns={{sm : 1 , md : 2 , lg:2}} spacing={10}>
          <Box>
             
             <CustomSelector
               onChange={setFormData}
               data={courseList}
               state={formData}
               placeHolder={"دوره مبدا را انتخاب کنید"}
               fieldId={"soCource"}
             />

             <Box
               padding={"10px"}
               marginTop={"25px"}
               borderWidth="1px"
               borderRadius="lg"
               minH={"155px"}
               overflow="hidden"
             >
               <Wrap>
                 {formData.students.map((d) => {
                   return (
                     <WrapItem>
                       <Tag
                         size="lg"
                         key="lg"
                         borderRadius="full"
                         variant="solid"
                         colorScheme="blue"
                       >
                         <TagLabel my={"15px"}>{d.full_name}</TagLabel>
                         <IconButton
                           onClick={handleOptionCourseDelete(d._id)}
                           size={"sm"}
                           colorScheme="transparent"
                           aria-label="Search database"
                           icon={<CloseIcon />}
                         />
                       </Tag>
                     </WrapItem>
                   );
                 })}
               </Wrap>
             </Box>
           </Box>
            <Box>
           
              <CustomSelector
                onChange={setFormData}
                data={courseList}
                state={formData}
                placeHolder={"دوره مقصد را انتخاب کنید"}
                fieldId={"desCourse"}
              />
             
            </Box>
           
          </SimpleGrid>
          <Button
                disabled={state.isLoading}
                onClick={handleSubmit}
                colorScheme={"blue"}
                mt={"25px"}
                width={{'sm' : "100%" , "md" : "10%" , "lg" : "10%"}}
       
              >
                {state.isLoading ? "در حال ثبت" : "ثبت"}
              </Button>
        </Card>
      </Flex>
    </AuthorizeProvider>
  );
};

export default Transfer;
