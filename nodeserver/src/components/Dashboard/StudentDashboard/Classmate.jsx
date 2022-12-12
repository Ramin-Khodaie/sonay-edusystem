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
  
  
import { useState } from "react"
import { useEffect } from "react"
import { getClassmate } from "services/dashboard"

const Classmate = ()=>{

    
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");


    const [classmate,setClassmate] = useState([])

    const callData = async()=>{
        await getClassmate().then((res)=>{
          

          setClassmate(res.data.data)

        })
    }

    useEffect(()=>{
        callData()
    },[])



    return(
        <Card p="0px" maxW="100%">
        <Text
          p="22px"
          textAlign={"right"}
          fontSize="lg"
          color={textColor}
          fontWeight="bold"
        >
همکلاسی های شما        </Text>

        <Box maxH={"300px"} overflow='scroll'>
          {classmate.length !== 0 ? (
            <Table dir="rtl">
              <Thead>
                <Tr bg={tableRowColor}>
                <Th color="gray.400" borderColor={borderColor}>
                   
                   </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    نام
                  </Th>
                  
                </Tr>
              </Thead>
              <Tbody>
                {classmate.map((el, index, arr) => {
                  return (
                    <Tr key={index}>
                     
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border={index === arr.length - 1 ? "none" : null}
                        borderColor={borderColor}
                      >
                        <Avatar  borderRadius='5px' size={'sm'} />
                      </Td>

                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        fontWeight="bold"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        {el.full_name}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          ):
          
          
          (


            <Box  >
            <Center h={'300px'}>
              <Text fontWeight={'bold'} fontSize={'18px'}>
حال حاضر همکلاسی یافت نشد              </Text>
            </Center>
            </Box>

          )}
        </Box>
      </Card>
    )
}



export default Classmate