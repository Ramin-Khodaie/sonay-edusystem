// Chakra imports
import {
    Avatar,
      Box,
      Center,
      SimpleGrid,
  
      Table,
      Tbody,
      Td,
      Text,
      Th,
      Thead,
      Tr,
      useColorModeValue,
    } from "@chakra-ui/react";
    // Custom components
    import Card from "components/Card/Card.js";
    

  const MessageBox = (props)=>{

    const {temp} = props

  

  
      return(
          <Card p="0px" maxW="100%">
          
          <Box  >
          <Center h={'300px'}>
            <Text fontWeight={'bold'} fontSize={'18px'}>
               {temp}
            </Text>
          </Center>
          </Box>
        </Card>
      )
  }
  
  
  
  export default MessageBox