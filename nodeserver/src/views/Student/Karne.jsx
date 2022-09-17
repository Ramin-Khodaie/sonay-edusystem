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
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getSelectedMark } from "services/mark";
import { getCompareChartData } from "services/mark";
const Karne = () => {
  const { userInfo } = useSelector((state) => state.getUserInfo);
  const [selectedCourse, setSelectedCourse] = useState(userInfo.courses[0].id);
  const [selectedMark, setSelectedMark] = useState(undefined);
  const { seriesBarCart, setSeriesBarChart } = useEffect([]);
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const callSelectedMark = () => {
    getSelectedMark(selectedCourse, userInfo.username).then((res) => {
      setSelectedMark(res[0]);
    });
  };

  const callChartData = () => {
    getCompareChartData(selectedMark.course.id, userInfo.username).then(
      (res) => {
        // setSeriesBarChart(res)
      }
    );
  };

  //  console.log(seriesBarCart , 5151)



  useEffect(() => {
    callSelectedMark();
  }, []);
  console.log(selectedMark, 87);
  return (
    <Flex
      flexDirection="column"
      mt="60px"
      w="100%"
      h="100%"
      alignItems="center"
    >
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr ", lg: "1fr 1fr " }}
        templateRows={{ lg: "repeat(3, auto)" }}
        gap="20px"
        width="100%"
      >
        <GridItem rowSpan={1} colSpan={{ sm: 1, md: 2, lg: 2 }}>
          <Card>
            <Text fontSize={"18px"} textAlign={"center"}>
              کارنامه {selectedMark && selectedMark.student.name} دوره{" "}
              {selectedMark && selectedMark.course.name}
            </Text>
          </Card>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          {selectedMark && <WorkbookTable selectedMark={selectedMark} />}
        </GridItem>

        <GridItem rowSpan={1}>
          {selectedMark && <PolarBasicChart selectedMark={selectedMark} />}
        </GridItem>
        <GridItem rowSpan={1}>
          {/* {selectedMark && <MultiBarchart userName={userInfo.username} courseId={selectedMark.course.id} />} */}
        </GridItem>
        <GridItem>
          <TeacherMessage />
        </GridItem>
      </Grid>

      {/* <Flex justifyContent="space-between" alignSelf="flex-start" w="100%" flexWrap="wrap">
      </Flex> */}
    </Flex>
  );
};

export default Karne;
