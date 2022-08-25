// chakra imports
import { Avatar, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export function ProductContent(props) {
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const notificationColor = useColorModeValue("gray.700", "white");
  const spacing = " ";
  return (
    <Flex flexDirection="column">
      <Avatar
        name={props.aName}
        src={props.aSrc}
        borderRadius="12px"
        alignItems="center"
        me="16px"
        width="210px"
        height="150px"
        objectFit="cover"
      />
      <Flex flexDirection="column" alignItem="center" mt="5">
        <Text fontSize="14px" mb="5px" color={notificationColor}>
          <Text fontWeight="bold" fontSize="14px" as="span">
            {props.title}
            {spacing}
          </Text>
        </Text>
        <Flex alignItems="center">
          <Text
            fontSize="s"
            fontWeight="700"
            lineHeight="100%"
            color={navbarIcon}
          >
            {props.price} x {props.count}
          </Text>
        </Flex>
      </Flex>   
    </Flex>
  );
}
