import { useState } from "react";
import { useEffect } from "react";
import { lineChartOptions } from "variables/charts";
import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";

import LineChart from "components/Charts/LineChart";
const { getCompareStudentMark } = require("services/dashboard");

const StudentlineChart = (props) => {
  const [studentCompareData, setStudentCompareData] = useState([]);
  const [studentCompareOpt, setStudentCompareOpt] = useState(undefined);
  const { colorMode } = useColorMode();
  const getData = async () => {
    await getCompareStudentMark().then((res) => {
      setStudentCompareData(res.data.data.data);
      setStudentCompareOpt({
        
        ...lineChartOptions,
        xaxis: {
   
          categories: res.data.data.axis,
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#fff",
              fontSize: "12px",
            },
          },
        },
      });
    });
  };
  useEffect(() => {
    getData();
  }, []);




  return (
    <Card
      bg={
        colorMode === "dark"
          ? "navy.800"
          : "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
      }
      p="0px"
      maxW="100%"
    >
      <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
        <Text pr={'20px'} textAlign={'right'} color="#fff" fontSize="lg" fontWeight="bold" mb="6px">
          
          مقایسه نمرات با میانگین کلاسی
                  </Text>
        {/* <Text color='#fff' fontSize='sm'>
          <Text as='span' color='green.400' fontWeight='bold'>
            (+5) more{" "}
          </Text>
          in 2022
        </Text> */}
      </Flex>
      <Box maxH={"300px"} minH="300px">
        {studentCompareData.length !== 0 && studentCompareOpt && (
          <LineChart data={studentCompareData} options={studentCompareOpt} />
        )}{" "}
        x
      </Box>
    </Card>
  );
};

export default StudentlineChart;
