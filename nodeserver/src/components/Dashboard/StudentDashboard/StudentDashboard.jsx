import { Grid, SimpleGrid } from "@chakra-ui/react";
import Classmate from "./Classmate";
import InfoCard from "./InfoCard";
import MessageBox from "./MessageBox";
import StudentlineChart from "./StudentLineChart";

const StudentDashoard = (props) => {
  const{user} = props
  return (
    <>
    <InfoCard user={user} />

    <Grid
          templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
          templateRows={{ lg: "repeat(2, auto)" }}
          gap="20px"
        >
    <StudentlineChart />
    <Classmate />

        </Grid>

        <SimpleGrid  columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px" mb="20px"
        >
          <MessageBox temp={'هنوز هیچ پیامی نیست'} />
          <MessageBox temp={"تاکنون هیچ اعتراضی ثبت نشده است"} />
          
        </SimpleGrid>

      
    </>
  );
};

export default StudentDashoard;
{
  /* {" "}
<Spacer />
<Spacer />

   */
}
