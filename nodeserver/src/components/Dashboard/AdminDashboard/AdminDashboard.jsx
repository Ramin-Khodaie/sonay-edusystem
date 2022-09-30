import { Flex, Grid } from "@chakra-ui/react"
import AdminRecentTables from "./AdminRecenTables"
import Count from "./Counts"
import DashboardBarChart from "./DashboardBarChart"
import DashboardLineChart from "./DashboardLineChart"

const AdminDashboard = ()=>{
    return(
        <Flex flexDirection="column" pt="75px">
        <Count  />
        <Grid
          templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
          templateRows={{ lg: "repeat(2, auto)" }}
          gap="20px"
        >
          <DashboardLineChart />
          <DashboardBarChart />
        </Grid>
        <AdminRecentTables />
      </Flex>
    )
}

export default AdminDashboard