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
import CounterCard from "../CounterCard";

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
      {data.length !== 0 && (
        <>
          <CounterCard
            name={"تعداد کل دبیران"}
            data={data[0].teachers.count}
            perc={data[0].teachers.perc}
          />
          <CounterCard
            name={"تعداد کل دوره ها"}
            data={data[0].courses.count}
            perc={data[0].courses.perc}
          />
          <CounterCard
            name={"مجموع پرداختی ماه جاری"}
            data={data[0].purchases.count}
            perc={data[0].purchases.perc}
            unit={'ریال'}
          />
          <CounterCard
            name={" تعداد کل زبان آموزان"}
            data={data[0].students.count}
            perc={data[0].students.perc}
          />
        </>
      )}

    </SimpleGrid>
  );
};

export default Count;
