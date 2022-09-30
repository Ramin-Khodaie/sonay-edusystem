import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";

import LineChart from "components/Charts/LineChart";

import React, { useState } from "react";
import { useEffect } from "react";
import { getYearCompare } from "services/dashboard";
import { lineChartOptions } from "variables/charts";
const DashboardLineChart = () => {
  const { colorMode } = useColorMode();

  const [compareyearData, setCompareyearData] = useState([]);

  const getYearCompareData = async () => {
    await getYearCompare().then((res) => {
      setCompareyearData(res.data.data);
    });
  };
  useEffect(() => {
    getYearCompareData();
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
        <Text color="#fff" fontSize="lg" fontWeight="bold" mb="6px">
          خلاصه درآمد سالیانه به تفکیک ماه
        </Text>
        {/* <Text color='#fff' fontSize='sm'>
          <Text as='span' color='green.400' fontWeight='bold'>
            (+5) more{" "}
          </Text>
          in 2022
        </Text> */}
      </Flex>
      <Box minH="300px">
        {compareyearData.length !== 0 && (
          <LineChart data={compareyearData} options={lineChartOptions} />
        )}
      </Box>
    </Card>
  );
};

export default DashboardLineChart;
