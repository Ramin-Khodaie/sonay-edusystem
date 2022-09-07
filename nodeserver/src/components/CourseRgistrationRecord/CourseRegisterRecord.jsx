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
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import IconBox from "components/Icons/IconBox";
import { ArrowRightIcon, CheckIcon } from "@chakra-ui/icons";

const CourseRegisterRecord = (props) => {
  const { data } = props;

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
      <SimpleGrid w={"150px"} columns={2} spacing={0}>
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
            mt={"35px"}
          />

          <ArrowRightIcon
            color={
              data.state === "attended"
                ? bgAttendedIcon
                : data.state === "upcoming"
                ? bgUpComingIcon
                : bgCurrentIcon
            }
            mt={"28px"}
          />

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
            mt={"35px"}
          />
        </Flex>

        <Flex>
          <Center h={"100px"} w="80px">
            <Box>
              <Button
                borderRadius={"100%"}
                bg={
                  data.state === "attended"
                    ? bgAttendedButton
                    : data.state === "upcoming"
                    ? bgUpComingButton
                    : bgCurrentButton
                }
                iconSpacing={"0px"}
                padding={"25px"}
              >
                <CheckIcon />
              </Button>

              <Text fontSize={"18px"} textAlign={"center"}>
                {" "}
                b h blah
              </Text>
            </Box>
          </Center>
        </Flex>

      </SimpleGrid>
    </div>
  );
};
export default CourseRegisterRecord;
