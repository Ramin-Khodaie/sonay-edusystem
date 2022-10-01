import {
  Center,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/Card/Card";
import IconBox from "components/Icons/IconBox";
import { WalletIcon } from "components/Icons/Icons";

const CounterCard = (props) => {
  const { name, data, perc, unit } = props;

  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  return (
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
              {name}
            </StatLabel>

            <Center>
              {unit && (
                <Text textAlign={"center"} color="gray.400" fontSize="sm">
                  {unit}
                </Text>
              )}

              <Text
                textAlign={"center"}
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
              >
                {data}
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
        {perc && perc > 0 && 
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
              %{perc}{" "}
            </Text>
          </Flex>
        }


        {
          perc && perc <0 &&  
          <Flex>
            <Text color="gray.400" fontSize="sm">
              کاهش از ماه قبل
            </Text>
            <Text as="span" color="red.400" fontWeight="bold">
              %{perc}{" "}
            </Text>
          </Flex>
        }
      </Flex>
    </Card>
  );
};

export default CounterCard;
