// Chakra imports
import {
    Avatar,
      Box,
      Button,
      SimpleGrid,
  Flex,
      Spacer,
  
      Table,
      Tbody,
      Td,
      Text,
      Th,
      Thead,
      Tr,
      useColorModeValue,
    } from "@chakra-ui/react";import Card from "components/Card/Card";

const TeacherCourseDetail = (props)=>{

    const{name , students} = props

    
    
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");


    return(<>
    
    <Card p="0px" maxW="100%">
        <Flex>
  <Button disabled ml={'15px'} mt={'15px'}>اعلام مغایرت</Button>
  <Spacer />

        <Text
          p="22px"
          textAlign={"right"}
          fontSize="lg"
          color={textColor}
          fontWeight="bold"
        >
{name}
  </Text>
 
        </Flex>

        <Box maxH={'600px'} overflow='scroll'>
         
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
                {students.map((st, index, arr) => {
                  return (
                    <Tr key={index}>
                     
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border={index === arr.length - 1 ? "none" : null}
                        borderColor={borderColor}
                      >
                        <Avatar size={'sm'} />
                      </Td>

                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        fontWeight="bold"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        {st.full_name}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          
        </Box>
      </Card>
    
    </>)
}

export default TeacherCourseDetail