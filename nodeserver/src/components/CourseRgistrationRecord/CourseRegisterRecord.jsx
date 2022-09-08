import { DocumentIcon } from "components/Icons/Icons";
import {
  Avatar,
  Divider,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Box,
  Button,
  SimpleGrid,
  Center,
  useColorModeValue,
  Grid,
  GridItem,
  Square,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import IconBox from "components/Icons/IconBox";
import { ArrowRightIcon, CheckIcon, CloseIcon, SpinnerIcon } from "@chakra-ui/icons";
import { FaMinus } from "react-icons/fa";

const CourseRegisterRecord = (props) => {
  const { data } = props;
  


  console.log(data,8787)
  

  let bgAttendedButton = useColorModeValue("green.300", "green.400");
  let bgCurrentButton = useColorModeValue("yellow.300", "yellow.400");
  let bgUpComingButton = useColorModeValue("gray.300", "gray.400");

  let bgAttendedDivider = useColorModeValue("green.300", "green.400");
  let bgCurrentDivider = useColorModeValue("yellow.300", "yellow.400");
  let bgUpComingDivider = useColorModeValue("gray.300", "gray.400");

  let bgAttendedIcon = useColorModeValue("green.300", "green.400");
  let bgCurrentIcon = useColorModeValue("yellow.300", "yellow.400");
  let bgUpComingIcon = useColorModeValue("gray.300", "gray.400");

  let bgButtonHover = useColorModeValue("white", "navy.900");

  let dividerColor = useColorModeValue("white", "navy.900");
  let textColor = useColorModeValue("white", "navy.900");

  return (
    <div className="record-card">
      <Grid
        h="110px"
        w={{sm : "120px" , "md" : "180px" , "lg" : "200px"}}
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={0}
      >
        <GridItem colSpan={1} rowSpan={2}>
          <Flex>
            <Divider
              borderColor={
                data.state === "attended"
                  ? bgAttendedDivider
                  : data.state === "upcoming"
                  ? bgUpComingDivider
                  : bgCurrentDivider
              }
              borderRadius={"50%"}
              borderBottomWidth={"3px"}
              mt={"50px"}
            />
          </Flex>
        </GridItem>
        <GridItem colSpan={1} rowSpan={2}>
          <Square>
            <Button
            disabled={
              data.state === "upcoming"
                ?             true
                : false
                        
            }
              borderRadius={"100%"}
              bg={
                data.state === "attended"
                  ? bgAttendedButton
                  : data.state === "upcoming"
                  ? bgUpComingButton
                  : bgCurrentButton
              }
              iconSpacing={"0px"}
              px={{sm : "15px" , md : "20px" , lg : "25px"}}
              py={{sm : "22px" , md : "27px" , lg : "32px"}}
              // px={"20%"}
              // py={"32%"}
              mt={{sm : "22px" , md : "18px" , lg : "13px"}}
            >


{
                data.state === "attended"
                  ?              <CheckIcon />
                  : data.state === "upcoming"
                  ?  <CloseIcon />
                  :    <SpinnerIcon />          
              }




            </Button>
          </Square>
        </GridItem>
        <GridItem colSpan={1} rowSpan={2}>
          <Flex>
            <Divider
              mt={"50px"}
              borderColor={
                data.state === "attended"
                  ? bgAttendedDivider
                  : data.state === "upcoming"
                  ? bgUpComingDivider
                  : bgCurrentDivider
              }
              borderBottomWidth={"3px"}
              borderRadius={"50%"}
            />

            <ArrowRightIcon
              color={
                data.state === "attended"
                  ? bgAttendedIcon
                  : data.state === "upcoming"
                  ? bgUpComingIcon
                  : bgCurrentIcon
              }
              mt={"43px"}
            />
          </Flex>
        </GridItem>
        <GridItem colSpan={3} rowSpan={1}>
          <Text
            overflow={"hidden"}
            maxW={{sm : "120px" , "md" : "180px" , "lg" : "200px"}}
            fontSize={"18px"}
            textAlign={"center"}
       
            mt={'5px'}
          >
            {" "}
        {data.name}
          </Text>
        </GridItem>
      </Grid>

      {/* <SimpleGrid w={"150px"} columns={2} spacing={0}>
        

      </SimpleGrid> */}
    </div>
  );
};
export default CourseRegisterRecord;
