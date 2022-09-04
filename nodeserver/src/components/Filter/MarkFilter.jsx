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
  Center,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Tooltip,
  SliderMark
} from "@chakra-ui/react";
import CustomSelector from "components/Selectors/CustomSelector";
import StudentStatusSelector from "components/Selectors/StudentStatusSelector";
import UserNameInput from "components/Selectors/UserNameInput";
import React, { useEffect } from "react";
import { userListAction } from "redux/user/UserList/UserListAction";
import { connect, useDispatch, useSelector } from "react-redux";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
const MarkListFilter = (props) => {
  const {
    filter,
    onChange,
    courses,
    selectChange,
    handleCheckBoxChange,
  } = props;
  const [sliderStartValue, setSliderStartValue] = React.useState(5);
  const [sliderEndValue, setSliderEndValue] = React.useState(5);
  const [showTooltip, setShowTooltip] = React.useState(false);


  const handleSliderChange = (v)=>{
    setSliderStartValue(v[0])
    setSliderEndValue(v[1])



  }

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
            <Box>
              <Text
                fontSize="xl"
                color={textColor}
                fontWeight="bold"
                textAlign={"right"}
                my={"10px"}
              >
                لیست نمرات وارد شده توسط شما{" "}
              </Text>
            </Box>
          </Flex>

          <AccordionPanel pb={4}>
            <SimpleGrid
              style={{ direction: "rtl" }}
              columns={{ sm: 1, md: 2, xl: 3 }}
              spacing="24px"
              mb="20px"
            >
              <Box>
                <Input
                  id="name"
                  onChange={onChange}
                  focusBorderColor="purple.300"
                  textAlign="right"
                  variant="outline"
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="نام کاربر را وارد کنید"
                  mb="10px"
                  size="md"
                />
                <CustomSelector
                  onChange={selectChange}
                  data={courses}
                  state={filter}
                  placeHolder={"دوره کاربر را انتخاب کنید"}
                  fieldId={"courses"}
                />
              </Box>

              <Box>
                <Flex>
                  <Text pl={"5px"}>از تاریخ:</Text>

                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    style={{ padding: "17px", width: "300px" }}
                  />
                </Flex>

                <Flex pt={"15px"}>
                  <Text pl={"5px"}>تا تاریخ:</Text>
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    style={{ padding: "17px", width: "300px" }}
                  />
                </Flex>
              </Box>

              <Box>
                <Text>بازه نمره</Text>

                <RangeSlider
                  aria-label={["min", "max"]}
                  defaultValue={[10, 30]}
                  onChange={(v) => handleSliderChange(v)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                   <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
        25%
      </SliderMark>
      <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
        50%
      </SliderMark>
      <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
        75%
      </SliderMark>
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <Tooltip
                    hasArrow
                    bg="teal.500"
                    color="white"
                    placement="top"
                    isOpen={showTooltip}
                    label={sliderStartValue}
                  >

 <RangeSliderThumb index={0} />
                    
                  </Tooltip>



                  <Tooltip
                    hasArrow
                    bg="teal.500"
                    color="white"
                    placement="top"
                    isOpen={showTooltip}
                    label={sliderEndValue}
                  >

 <RangeSliderThumb index={1} />
                    
                  </Tooltip>
                 
                </RangeSlider>
                <Box>
                  <Checkbox
                    onChange={handleCheckBoxChange}
                    id="isFailed"
                    size={"lg"}
                  >
                    فقط کارنامه مردود{" "}
                  </Checkbox>
                </Box>

                <Box>
                  <Checkbox
                    onChange={handleCheckBoxChange}
                    id="isPassed"
                    size={"lg"}
                  >
                    فقط کارنامه قبولین{" "}
                  </Checkbox>
                </Box>
              </Box>

              {/* <Checkbox onChange={handleCheckBoxChange} id="isMain" size={"lg"} >
فقط محصولات اصلی                </Checkbox> */}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default MarkListFilter;
