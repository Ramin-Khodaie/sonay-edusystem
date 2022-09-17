import SliderWrapper from "components/SliderWrapper/SliderWrapper";
import CourseRecords from "components/CourseRecord/CourseRecords";
import { useState } from "react";
import WorkbookTable from "./WorkbookTable";
import { Box, Flex, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { lineChartData } from "variables/charts";
import { lineChartOptions } from "variables/charts";
import LineChart from "components/Charts/LineChart";
import Card from "components/Card/Card";
import BarChart from "components/Charts/BarChart";
import { barChartData } from "variables/charts";
import { barChartOptions } from "variables/charts";
import WorkbookChart from "./WorkbookChart";
import StudentFinaleState from "./StudentFinalState";
import PolarBasicChart from "components/Charts/PolarBasicChart";
import MultiBarchart from "components/Charts/MultiBarChart";
import TeacherMessage from "components/TeacherMessage/TeacherMessage";
const Karne = () => {
  const [selectedCourse, setSelectedCourse] = useState(undefined);
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };
  return (
    <Flex
      flexDirection="column"
      mt="60px"
      w="100%"
      h="100%"
      alignItems="center"
    >
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr " , lg: "1fr 1fr " }}
        templateRows={{ lg: "repeat(3, auto)" }}
        gap="20px"
        width="100%"
      >
        <GridItem rowSpan={1} colSpan={{ sm: 1, md:2, lg: 2 }} >
          <Card>
            <Text fontSize={'18px'} textAlign={'center'}>کارنامه اژدر رسولی کلاس هفتم</Text>
          </Card>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} >
          <WorkbookTable />
        </GridItem>

        <GridItem rowSpan={1}>
          <PolarBasicChart />
        </GridItem>
        <GridItem rowSpan={1} >
        <MultiBarchart />

        </GridItem>
        <GridItem >
        <TeacherMessage />
        </GridItem>
     
       
      </Grid>

      {/* <Flex justifyContent="space-between" alignSelf="flex-start" w="100%" flexWrap="wrap">
      </Flex> */}
    </Flex>
  );
};

export default Karne;
