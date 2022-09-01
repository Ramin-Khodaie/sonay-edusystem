import PieChart from "components/Charts/PieChart";

const { Flex, Text } = require("@chakra-ui/react");
const { default: Card } = require("components/Card/Card");

const StudentFinaleState = () => {
  return (
    <Card
      gridColumnStart="1"
      gridColumnEnd="3"
      my="10px"
      maxW="100%"
      // overflowX={{ sm: "scroll", xl: "hidden" }}
    >
      <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
        <Text color="gray.500" fontSize="xl" fontWeight="bold" mb="6px">
         Final Status
        </Text>
        <PieChart/>
      </Flex>
    </Card>
  );
};

export default StudentFinaleState;
