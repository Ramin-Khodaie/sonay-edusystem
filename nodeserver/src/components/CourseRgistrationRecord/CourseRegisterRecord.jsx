import { DocumentIcon } from "components/Icons/Icons";
import {
  Avatar,
  Divider,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Box,
  Button,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import IconBox from "components/Icons/IconBox";
import { CheckIcon } from "@chakra-ui/icons";

const CourseRegisterRecord = (props) => {
  const {} = props;
  return (
    <div className="record-card">
       <SimpleGrid columns={3} spacing={0}>
       <Box>
       <Divider variant={'dashed'} borderColor={'green'} borderRadius={"50%"} borderBottomWidth={'3px'} my={'50px'} />


      </Box>
      <Flex>
      <Center h={"100px"} w="80px">
          <Button
            borderRadius={"50%"}
            bg={"green.400"}
  
            iconSpacing={"0px"}
            padding={'30px'}
           
          >

<CheckIcon  />
          </Button>
        </Center>
      </Flex>
      
        <Box>
        <Divider variant={'dashed'} borderColor={'green'} borderRadius={"50%"} borderBottomWidth={'3px'} my={'50px'} />
        </Box>

       </SimpleGrid>

    </div>
  );
};
export default CourseRegisterRecord;
