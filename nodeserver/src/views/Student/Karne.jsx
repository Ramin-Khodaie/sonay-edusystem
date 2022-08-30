import SliderWrapper from "components/SliderWrapper/SliderWrapper";
import CourseRecords from "components/CourseRecord/CourseRecords";
import { useState } from "react";
import WorkbookTable from "./WorkbookTable";
import { Box, Flex, Text } from "@chakra-ui/react";
import { lineChartData } from "variables/charts";
import { lineChartOptions } from "variables/charts";
import LineChart from "components/Charts/LineChart";
import Card from "components/Card/Card";
import BarChart from "components/Charts/BarChart";
import { barChartData } from "variables/charts";
import { barChartOptions } from "variables/charts";
import WorkbookChart from "./WorkbookChart";
const Karne = () => {
  const [selectedCourse, setSelectedCourse] = useState(undefined);
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };
  console.log(66, selectedCourse);
  return (
    <Flex
      flexDirection="column"
      mt="60px"
      w="100%"
      h="100%"
      alignItems="center"
    >
      <SliderWrapper>
        <CourseRecords onSelectCourse={handleSelectCourse} />
      </SliderWrapper>
      <Flex justifyContent="space-between" alignSelf="flex-start" w="100%" flexWrap="wrap">
        <WorkbookTable />
        <WorkbookChart/>
      </Flex>
    </Flex>
  );
};

export default Karne;
