import SliderWrapper from "components/SliderWrapper/SliderWrapper";
import CourseRecords from "components/CourseRecord/CourseRecords";
import { useState } from "react";
import WorkbookTable from "./WorkbookTable";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
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
import ReportMarkTable from "components/Tables/ReportMarkTable/ReportMarkTable";
import { getMarkHistory } from "services/mark";
import CardHeader from "components/Card/CardHeader";
import MarkReportFilter from "components/Filter/MarkReportFilter";
import { markBySearch } from "services/mark";
import AuthorizeProvider from "helpers/authorize/AuthorizeProvider";
const Karne = () => {
  const { userInfo } = useSelector((state) => state.getUserInfo);
  const [selectedCourse, setSelectedCourse] = useState(userInfo.courses[0].id);
  const [selectedMark, setSelectedMark] = useState(undefined);
  const [seriesBarCart, setSeriesBarChart] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [filter, setFilter] = useState({
    course: "",
    isFailed: false,
    isPassed: false,
    startDate: "",
    endDate: "",
    startMark: "",
    endMark: "",
  });

  const handleCheckBoxChange = (event) => {
    const field = event.target.id;
    const value = event.target.checked;
    setFilter({ ...filter, [field]: value });
  };
  const handleFilterChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setFilter({ ...filter, [field]: value });
  };

  const doSearch = async () => {
    const tmp = await markBySearch(filter);
    setTableData(tmp);
  };

  useEffect(() => {
    setTableData(tableData);

    if (
      filter.course !== "" ||
      filter.isFailed ||
      filter.isPassed ||
      filter.startDate !== "" ||
      filter.endDate !== "" ||
      filter.startMark !== "" ||
      filter.endMark !== ""
    ) {
      doSearch();
    }
  }, [filter]);

  const [slider, setSlider] = useState([0, 100]);

  const handleSliderChange = (v) => {
    setSlider(v);
    setFilter({ ...filter, startMark: v[0], endMark: v[1] });
  };

  const handleStartDateChange = (v) => {
    setFilter({ ...filter, startDate: `${v.year}/${v.month}/${v.day}` });
  };

  const handleEndDateChange = (v) => {
    setFilter({ ...filter, endDate: `${v.year}/${v.month}/${v.day}` });
  };

  const handleMarkChange = (course) => {
    setSelectedCourse(course);
  };

  const callSelectedMark = () => {
    getSelectedMark(selectedCourse, userInfo.username).then((res) => {
      setSelectedMark(res[0]);
    });
  };

  const callBarChartData = () => {
    getCompareChartData(selectedCourse, userInfo.username).then((res) => {
      setSeriesBarChart(res);
    });
  };

  const callMarkHistory = () => {
    getMarkHistory().then((res) => {
      setTableData(res);
    });
  };

  const callPageData = () => {
    callMarkHistory();
    callSelectedMark();
    callBarChartData();
  };

  useEffect(() => {
    callPageData();
  }, [selectedCourse]);

  return (
    <AuthorizeProvider roles={["student"]}>
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
          <GridItem
            overflowX={{ sm: "scroll", xl: "hidden" }}
            rowSpan={1}
            colSpan={{ sm: 1, md: 2, lg: 2 }}
          >
            <Center>
              <Card>
                <Center>
                  <Text
                    textAlign={"center"}
                    fontSize={{ sm: "18px", md: "22px", lg: "25px" }}
                    fontWeight={"bold"}
                  >
                    کارنامه زبان آموز{" "}
                    {selectedMark && selectedMark.student.name} برای دوره{" "}
                    {selectedMark && selectedMark.course.name} در تاریخ{" "}
                    {selectedMark && selectedMark.date}{" "}
                  </Text>
                </Center>

                {/* <Text fontSize={"18px"} textAlign={"center"}>
              کارنامه {selectedMark && selectedMark.student.name} دوره{" "}
              {selectedMark && selectedMark.course.name}
            </Text> */}
              </Card>
            </Center>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            {selectedMark && <WorkbookTable selectedMark={selectedMark} />}
          </GridItem>

          <GridItem rowSpan={1}>
            {selectedMark && <PolarBasicChart selectedMark={selectedMark} />}
          </GridItem>
          <GridItem rowSpan={1}>
            {seriesBarCart.length === 2 && (
              <MultiBarchart series={seriesBarCart} />
            )}
          </GridItem>
          <GridItem pb={"30px"}>
            {selectedMark && (
              <TeacherMessage description={selectedMark.message} />
            )}
          </GridItem>
        </Grid>
      </Flex>

      <Card my="22px" pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <MarkReportFilter
            filter={filter}
            onChange={handleFilterChange}
            selectChange={setFilter}
            handleCheckBoxChange={handleCheckBoxChange}
            handleSliderChange={handleSliderChange}
            slider={slider}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
          />
        </CardHeader>

        <ReportMarkTable handleMarkChange={handleMarkChange} data={tableData} />
      </Card>
    </AuthorizeProvider>
  );
};

export default Karne;
