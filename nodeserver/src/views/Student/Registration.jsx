import { Box , Flex } from "@chakra-ui/react"
import CourseRegisterRecords from "components/CourseRgistrationRecord/CourseRegisterRecords"
import SliderWrapper from "components/SliderWrapper/SliderWrapper"

const Registration = () =>{
    return(


<Box mt="60px" px="55px" py="5" w="100%" dir="rtl">





<Flex flexDirection="column" mb="30px" h="100%" align={"center"} >


        <SliderWrapper >


          <CourseRegisterRecords />

          </SliderWrapper>
</Flex>
  

</Box>

    )    
}

export default Registration