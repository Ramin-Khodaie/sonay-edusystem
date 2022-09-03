import { DocumentIcon } from "components/Icons/Icons";
import {
  Avatar,
  Divider,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Spacer,
  Box,
  useColorMode,
  Grid,
  Badge,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import IconBox from "components/Icons/IconBox";
import { StarIcon } from "@chakra-ui/icons";

const StudentRecord = ({ studentRecord, onSelect }) => {
  const { StudentName, endDate, image, startDate, teacherName } = studentRecord;
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };
  const { colorMode } = useColorMode();

  return (
    <div className="record-card" onClick={() => onSelect(StudentRecord)}>

<SimpleGrid  w={{ sm: "180px", md: "250px", lg: "320px" }}
        h="120px"
        borderWidth="1px"
        borderRadius="2rem"
        overflow="hidden"
        bg={colorMode === "light" ? "white" : "navy.700"}
        _hover={colorMode === "light" ? 
        {
          background: "gray.200",
          color: "black",
          transition:"0.5s"
        }
      :
      {
        background: "navy.300",
        color: "navy.600",
        transition:"0.5s"
      }
      } spacing={0} columns={3}>
  <Box   >
    

<Avatar
          my={"20px"}
          ml={"10px"}
          size="lg"
          name="Prosper Otemuyiwa"
          src="https://bit.ly/prosper-baba"
        />
  </Box>


  <Box  textAlign={"center"}>
    <Text fontFamily={"Lalezar"} pt={"5px"} fontSize={"xl"}>این یک تست برای </Text>
    <Divider />
    <Text textAlign={"center"} fontSize={"sm"} >family friends</Text>
    <Badge colorScheme='purple'>New</Badge>
    <Text fontSize={"sm"}>معدل کل : 98.5</Text>


  </Box>

</SimpleGrid>
       


    </div>
  );
};
export default StudentRecord;
