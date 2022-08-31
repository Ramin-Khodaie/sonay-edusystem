import { Box, Flex, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";
import BarChart from "components/Charts/BarChart";
import { workbookChartOptions } from "variables/charts";
import { workbookChartData } from "variables/charts";
import { barChartOptions } from "variables/charts";
import { barChartData } from "variables/charts";

const WorkbookChart = () => {
  return (
    <Card
    
      my="50px"
      maxW="50%"
      overflowX={{ sm: "scroll", xl: "hidden" }}
      pb="0px"
    >
      <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
        <Text color="gray.500" fontSize="sm" fontWeight="bold" mb="6px">
          PERFORMANCE IN CLASS
        </Text>
        
      </Flex>
      <Box minH="300px">
        <BarChart chartData={workbookChartData} chartOptions={workbookChartOptions} />
      </Box>
    </Card>
  );
};

export default WorkbookChart;
