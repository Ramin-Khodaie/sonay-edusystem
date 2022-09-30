// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import BarChart from "components/Charts/BarChart";
import { useEffect } from "react";
import { useState } from "react";
import { getTeacherAvg } from "services/dashboard";
import {

  barChartOptions,

} from "variables/charts";

const DashboardBarChart = () => {


  const textColor = useColorModeValue("gray.700", "white");
  const [teacherAvg, setTeacherAvg] = useState([]);
  const [teacherAvgOpt, setTeacherAvgOpt] = useState(undefined);
  
  const getTeacherAvgData = async () => {
    await getTeacherAvg().then((res) => {
      setTeacherAvg([{ name: "", data: res.data.data.data }]);
      setTeacherAvgOpt({
        ...barChartOptions,
        xaxis: {
          categories: res.data.data.axis,
          labels: {
            style: {
              colors: "#A0AEC0",
              fontSize: "12px",
            },
          },
          show: true,
          axisBorder: {
            show: false,
          },
        },
      });
    });
  };
  useEffect(() => {

    getTeacherAvgData();

  }, []);
  return (
    <Card p="0px" maxW="100%">
      <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
        <Text color="gray.400" fontSize="sm" fontWeight="bold" mb="6px">
          عملکرد دبیران
        </Text>
        <Text color={textColor} fontSize="lg" fontWeight="bold">
          میانگین نمرات
        </Text>
      </Flex>
      <Box minH="300px">
        {teacherAvg.length !== 0 && teacherAvgOpt && (
          <BarChart chartData={teacherAvg} chartOptions={teacherAvgOpt} />
        )}
      </Box>
    </Card>
  );
};

export default DashboardBarChart;
