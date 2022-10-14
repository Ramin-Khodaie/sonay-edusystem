import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Input,
  SimpleGrid,
  Spacer,
  Text,
  Checkbox,
  useColorModeValue,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Tooltip,
} from "@chakra-ui/react";

import React from "react";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { ReportPop6 } from "components/PopOvers/ReportPopOver";
const MarkReportFilter = (props) => {
  const {
    filter,
    onChange,
    handleCheckBoxChange,
    handleSliderChange,
    slider,
    handleStartDateChange,
    handleEndDateChange,
  } = props;
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
            <Flex>
              <ReportPop6 />
              <Text
                fontSize="xl"
                color={textColor}
                fontWeight="bold"
                textAlign={"right"}
                my={"10px"}
              >
                سوابق تحصیلی{" "}
              </Text>
            </Flex>
          </Flex>

          <AccordionPanel pb={4}>
            <SimpleGrid
              style={{ direction: "rtl" }}
              columns={{ sm: 1, md: 2, xl: 3 }}
              spacing="24px"
              mb="20px"
            >
              <Box>
                <Box>
                  <Text>از تاریخ:</Text>

                  <DatePicker
                    placeholder="تاریخ شروع را وارد کنید"
                    calendar={persian}
                    locale={persian_fa}
                    style={{ padding: "17px", width: "300px" }}
                    selected={filter.startDate}
                    onChange={(v) => {
                      handleStartDateChange(v);
                    }}
                  />
                </Box>

                <Box>
                  <Text>تا تاریخ:</Text>
                  <DatePicker
                    placeholder="تاریخ پایان را وارد کنید"
                    calendar={persian}
                    locale={persian_fa}
                    style={{ padding: "17px", width: "300px" }}
                    selected={filter.endDate}
                    onChange={(v) => {
                      handleEndDateChange(v);
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <Box>
                  <Text>نام دوره:</Text>
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
                  <Checkbox
                    pt={"15px"}
                    id="isFailed"
                    size={"lg"}
                    onChange={handleCheckBoxChange}
                  >
                    فقط دوره های مردود{" "}
                  </Checkbox>
                </Box>
              </Box>

              <Box>
                <Text>بازه نمره</Text>

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
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default MarkReportFilter;
