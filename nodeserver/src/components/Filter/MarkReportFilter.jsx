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
  const MarkReportFilter = (props) => {


    const {
      filter,
      onChange,
      selectChange,
      handleCheckBoxChange,
      handleSliderChange,
      slider,
      handleStartDateChange,
      handleEndDateChange
    } = props
    const [showTooltip, setShowTooltip] = React.useState(false);



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
سوابق تحصیلی                </Text>
              </Box>
            </Flex>
  
            <AccordionPanel pb={4}>
              <SimpleGrid
                style={{ direction: "rtl" }}
                columns={{ sm: 1, md: 2, xl: 3}}
                spacing="24px"
                mb="20px"
              >
                <Box>
                 <Box>
                 <Text>
                    نام دوره:
                  </Text>
                  <Input
                  onChange={onChange}
                    id="course"
                    focusBorderColor="purple.300"
                    textAlign="right"
                    variant="outline"
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder="نام دوره را وارد کنید"
                    size="md"
                  />


                 </Box>

                 <Box>
                                   



<Text >بازه نمره</Text>
  
  <RangeSlider
    aria-label={["min", "max"]}
    defaultValue={[5, 90]}
    onChangeEnd={(v) => handleSliderChange(v)}
    onMouseEnter={() => setShowTooltip(true)}
    onMouseLeave={() => setShowTooltip(false)}
    my={"20px"}
   
  >
    
    <RangeSliderTrack>
      <RangeSliderFilledTrack />
    </RangeSliderTrack>
    <Tooltip
      hasArrow
      bg="teal.500"
      color="white"
      placement="top"
      isOpen={showTooltip}
      label={slider[0]}
    >

<RangeSliderThumb index={0} />
      
    </Tooltip>



    <Tooltip
      hasArrow
      bg="teal.500"
      color="white"
      placement="top"
      isOpen={showTooltip}
      label={slider[1]}
    >

<RangeSliderThumb index={1} />
      
    </Tooltip>
   
  </RangeSlider>
                 </Box>



      
           
                </Box>
  
        
                  <Box>

                    <Box>
                    <Text >از تاریخ:</Text>
  
  <DatePicker
  placeholder="تاریخ شروع را وارد کنید"
    calendar={persian}
    locale={persian_fa}
    style={{ padding: "17px", width: "300px" }}
    selected={filter.startDate}
   
    onChange={(v)=>{handleStartDateChange(v)}}
  />


                    </Box>


                    <Box>
                    <Checkbox
                    pt={'35px'}
                      id="isFailed"
                      size={"lg"}
                      onChange={handleCheckBoxChange}
                    >
                      فقط دوره های مردود{" "}
                    </Checkbox>
                  </Box>
            
                    
                
                  </Box>
  
         
                  <Box >
                    <Text  >تا تاریخ:</Text>
                    <DatePicker
                    placeholder="تاریخ پایان را وارد کنید"
                      calendar={persian}
                      locale={persian_fa}
                      style={{ padding: "17px", width: "300px" }}
                  
                      selected={filter.endDate}
  
                      onChange={(v)=>{handleEndDateChange(v)}}
                    />
                  </Box>

          
  
  
         
     
     
  
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    );
  };
  
  export default MarkReportFilter;
  