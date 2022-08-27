// Chakra imports
import { Flex, Box, Avatar, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";

import React, { useEffect, useState } from "react";

function AddMark() {
  return (
    <Flex justify={"center"} direction="row" pt={{ base: "120px", md: "75px" }}>
      <Box borderRadius={"2rem"} bg={"whiteSmoke"} p="4" m="4">
        <Flex  dir="rtl" direction={"row"}>
        <Avatar
          size={"lg"}
          name="blaaaah"
          src="https://bit.ly/dan-abramov"
          mx={"10px"}
        />
        <Text fontSize={"24px"} py={"15px"}>blaaaah</Text>
        </Flex>
      </Box>
    </Flex>
  );
}

export default AddMark;
