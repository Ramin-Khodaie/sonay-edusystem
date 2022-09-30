// Chakra imports
import {
  Center,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";

import IconBox from "components/Icons/IconBox";
// Custom icons
import { WalletIcon } from "components/Icons/Icons.js";
import React, { useState } from "react";
import { useEffect } from "react";

import { getCounts } from "services/dashboard";

const Count = () => {
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");

  const [data, setData] = useState([]);

  const getCountData = async () => {
    await getCounts().then((res) => {
      setData(res.data.data);
    });
  };

  useEffect(() => {
    getCountData();
  }, []);

  return (
    <SimpleGrid columns={{ sm: 1, md: 4, xl: 4 }} spacing="24px" mb="20px">
      <Card maxH="115px">
        <Flex direction="column">
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            w="100%"
            mb="5px"
          >
            <Stat me="auto">
              <StatLabel
                textAlign={"center"}
                fontSize="s"
                color="gray.400"
                fontWeight="bold"
                textTransform="uppercase"
              >
                تعداد کل دبیران
              </StatLabel>

              <Text
                textAlign={"center"}
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
              >
                {data.length !== 0 && data[0].teachers.count}
              </Text>
            </Stat>
            <IconBox
              borderRadius="50%"
              as="box"
              h={"45px"}
              w={"45px"}
              bg={iconBlue}
            >
              <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
            </IconBox>
          </Flex>
          {data.length !== 0 && data[0].teachers.perc > 0 ? (
            <Flex>
              <Text textAlign={"center"} color="gray.400" fontSize="sm">
                افزایش از ماه قبل
              </Text>
              <Text
                textAlign={"center"}
                as="span"
                color="green.400"
                fontWeight="bold"
              >
                %{data.length !== 0 && data[0].teachers.perc}{" "}
              </Text>
            </Flex>
          ) : (
            <Flex>
              <Text color="gray.400" fontSize="sm">
                کاهش از ماه قبل
              </Text>
              <Text as="span" color="red.400" fontWeight="bold">
                %{data.length !== 0 && data[0].teachers.perc}{" "}
              </Text>
            </Flex>
          )}
        </Flex>
      </Card>
      <Card maxH="115px">
        <Flex direction="column">
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            w="100%"
            mb="5px"
          >
            <Stat me="auto">
              <StatLabel
                textAlign={"center"}
                fontSize="s"
                color="gray.400"
                fontWeight="bold"
                textTransform="uppercase"
              >
                تعداد کل دوره ها
              </StatLabel>

              <Text
                textAlign={"center"}
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
              >
                {data.length !== 0 && data[0].courses.count}
              </Text>
            </Stat>
            <IconBox
              borderRadius="50%"
              as="box"
              h={"45px"}
              w={"45px"}
              bg={iconBlue}
            >
              <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
            </IconBox>
          </Flex>
          {data.length !== 0 && data[0].courses.perc > 0 ? (
            <Flex>
              <Text textAlign={"center"} color="gray.400" fontSize="sm">
                افزایش از ماه قبل
              </Text>
              <Text
                textAlign={"center"}
                as="span"
                color="green.400"
                fontWeight="bold"
              >
                %{data.length !== 0 && data[0].courses.perc}{" "}
              </Text>
            </Flex>
          ) : (
            <Flex>
              <Text color="gray.400" fontSize="sm">
                کاهش از ماه قبل
              </Text>
              <Text as="span" color="red.400" fontWeight="bold">
                %{data.length !== 0 && data[0].courses.perc}{" "}
              </Text>
            </Flex>
          )}
        </Flex>
      </Card>

      <Card maxH="115px">
        <Flex direction="column">
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            w="100%"
            mb="5px"
          >
            <Stat me="auto">
              <StatLabel
                textAlign={"center"}
                fontSize="s"
                color="gray.400"
                fontWeight="bold"
                textTransform="uppercase"
              >
                مجموع پرداختی ماه جاری
              </StatLabel>
              <Center>
                <Text textAlign={"center"} color="gray.400" fontSize="sm">
                  ریال
                </Text>

                <Text
                  textAlign={"center"}
                  fontSize="lg"
                  color={textColor}
                  fontWeight="bold"
                >
                  {data.length !== 0 && data[0].purchases.count}
                </Text>
              </Center>
            </Stat>
            <IconBox
              borderRadius="50%"
              as="box"
              h={"45px"}
              w={"45px"}
              bg={iconBlue}
            >
              <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
            </IconBox>
          </Flex>
          {data.length !== 0 && data[0].purchases.perc > 0 ? (
            <Flex>
              <Text textAlign={"center"} color="gray.400" fontSize="sm">
                افزایش از ماه قبل
              </Text>
              <Text
                textAlign={"center"}
                as="span"
                color="green.400"
                fontWeight="bold"
              >
                %{data.length !== 0 && data[0].purchases.perc}{" "}
              </Text>
            </Flex>
          ) : (
            <Flex>
              <Text color="gray.400" fontSize="sm">
                کاهش از ماه قبل
              </Text>
              <Text as="span" color="red.400" fontWeight="bold">
                %{data.length !== 0 && data[0].purchases.perc}{" "}
              </Text>
            </Flex>
          )}
        </Flex>
      </Card>

      <Card maxH="115px">
        <Flex direction="column">
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            w="100%"
            mb="5px"
          >
            <Stat me="auto">
              <StatLabel
                textAlign={"center"}
                fontSize="s"
                color="gray.400"
                fontWeight="bold"
                textTransform="uppercase"
              >
                تعداد کل زبان آموزان
              </StatLabel>

              <Text
                textAlign={"center"}
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
              >
                {data.length !== 0 && data[0].students.count}
              </Text>
            </Stat>
            <IconBox
              borderRadius="50%"
              as="box"
              h={"45px"}
              w={"45px"}
              bg={iconBlue}
            >
              <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
            </IconBox>
          </Flex>
          {data.length !== 0 && data[0].students.perc > 0 ? (
            <Flex>
              <Text textAlign={"center"} color="gray.400" fontSize="sm">
                افزایش از ماه قبل
              </Text>
              <Text
                textAlign={"center"}
                as="span"
                color="green.400"
                fontWeight="bold"
              >
                %{data.length !== 0 && data[0].students.perc}{" "}
              </Text>
            </Flex>
          ) : (
            <Flex>
              <Text color="gray.400" fontSize="sm">
                کاهش از ماه قبل
              </Text>
              <Text as="span" color="red.400" fontWeight="bold">
                %{data.length !== 0 && data[0].students.perc}{" "}
              </Text>
            </Flex>
          )}
        </Flex>
      </Card>
    </SimpleGrid>
  );
};

export default Count;
