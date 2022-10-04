import { SimpleGrid, useColorModeValue } from "@chakra-ui/react";
// Custom components

// Custom icons
import React from "react";
import { FaEnvelopeOpenText, FaUser, FaUsers } from "react-icons/fa";

import CounterCard from "../CounterCard";

const TecherCounts = (props) => {
  const iconBoxInside = useColorModeValue("white", "white");

  const { st, cr } = props;
  return (
    <SimpleGrid
      dir="rtl"
      pt={"75px"}
      columns={{ sm: 1, md: 3, xl: 3 }}
      spacing="24px"
      mb="20px"
    >
      <>
        <CounterCard
          name={"تعداد کل زبان آموزان"}
          data={st}
          icon={<FaUser size={"30px"} color={iconBoxInside} />}
        />
        <CounterCard
          name={"تعداد کل دوره ها"}
          data={cr}
          icon={<FaUsers size={"30px"} color={iconBoxInside} />}
        />
        <CounterCard
          name={"تعداد اعتراضات فعال"}
          data={0}
          icon={<FaEnvelopeOpenText size={"30px"} color={iconBoxInside} />}
        />
      </>
    </SimpleGrid>
  );
};

export default TecherCounts;
