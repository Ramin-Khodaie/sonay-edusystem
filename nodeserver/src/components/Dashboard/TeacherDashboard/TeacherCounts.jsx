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




const TecherCounts = (props)=>{
return(
    <SimpleGrid pt={'75px'} columns={{ sm: 1, md: 3, xl: 3 }} spacing="24px" mb="20px">
      
        <>
          <CounterCard
            name={"تعداد کل زبان آموزان"}
            data={2}
            
          />
          <CounterCard
            name={"تعداد کل دوره ها"}
            data={3}
          />
          <CounterCard
            name={"تعداد اعتراضات فعال"}
            data={0}
            
     
          />
         
        </>
     

    </SimpleGrid>
)
}


export default TecherCounts 