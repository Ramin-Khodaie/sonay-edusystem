// Chakra imports
import {
  
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  GridItem, 
  useColorModeValue,
  Flex,
  Text,
  Box,
  FormControl,
  Input,
  FormLabel
 


} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import React from "react";
import { tablesProjectData, tablesTableData } from "variables/general";

function Tables() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign={"right"}
          >
            ثبت کاربر جدید
          </Text>
        </CardHeader>



        <CardBody>
          <FormControl>

    <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing='24px' mb='20px' style={{"direction" : "rtl"}} >
        <Box   minH='80px'>
        <FormLabel textAlign='end' ms='4px' fontSize='sm' fontWeight='normal'>
                نام کاربری
              </FormLabel>
              <Input
             
              id="username"
             
                textAlign='right'
                variant='filled'
                fontSize='sm'
                ms='4px'
                type='text'
                placeholder='نام کاربری خود را وارد کنید'
                mb='5px'
                size='lg'
              />
        </Box>
        <Box   minH='80px'>
        <FormLabel textAlign='end' ms='4px' fontSize='sm' fontWeight='normal'>
نام و نام خانوادگی           </FormLabel>
              <Input
             
              id="username"
             
                textAlign='right'
                variant='filled'
                fontSize='sm'
                ms='4px'
                type='text'
                placeholder='نام کاربری خود را وارد کنید'
                mb='5px'
                size='lg'
              />
        </Box>
        <Box   minH='80px'>
        <FormLabel textAlign='end' ms='4px' fontSize='sm' fontWeight='normal'>
شماره تماس              </FormLabel>
              <Input
             
              id="username"
             
                textAlign='right'
                variant='filled'
                fontSize='sm'
                ms='4px'
                type='text'
                placeholder='نام کاربری خود را وارد کنید'
                mb='5px'
                size='lg'
              />
        </Box>

        


        <Box   minH='80px'>
        <FormLabel textAlign='end' ms='4px' fontSize='sm' fontWeight='normal'>
ایمیل             </FormLabel>
              <Input
             
              id="username"
             
                textAlign='right'
                variant='filled'
                fontSize='sm'
                ms='4px'
                type='text'
                placeholder='نام کاربری خود را وارد کنید'
                mb='5px'
                size='lg'
              />
        </Box>
        <Box   minH='80px'>
        <FormLabel textAlign='end' ms='4px' fontSize='sm' fontWeight='normal'>
رمز عبور              </FormLabel>
              <Input
             
              id="username"
             
                textAlign='right'
                variant='filled'
                fontSize='sm'
                ms='4px'
                type='text'
                placeholder='نام کاربری خود را وارد کنید'
                mb='5px'
                size='lg'
              />
        </Box>
        <Box   minH='80px'>
        <FormLabel textAlign='end' ms='4px' fontSize='sm' fontWeight='normal'>
تکرار رمز عبور              </FormLabel>
              <Input
             
              id="username"
             
                textAlign='right'
                variant='filled'
                fontSize='sm'
                ms='4px'
                type='text'
                placeholder='نام کاربری خود را وارد کنید'
                mb='5px'
                size='lg'
              />
        </Box>
     



        <Box   minH='80px'>
        <FormLabel textAlign='end' ms='4px' fontSize='sm' fontWeight='normal'>
نقش ها           </FormLabel>
              <Input
             
              id="username"
             
                textAlign='right'
                variant='filled'
                fontSize='sm'
                ms='4px'
                type='text'
                placeholder='نام کاربری خود را وارد کنید'
                mb='5px'
                size='lg'
              />
        </Box>


      </SimpleGrid>

          </FormControl>
    
        </CardBody>
      </Card>








      <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
              Projects Table
            </Text>
          </Flex>
        </CardHeader>
        <CardBody></CardBody>
      </Card>
    </Flex>
  );
}

export default Tables;
