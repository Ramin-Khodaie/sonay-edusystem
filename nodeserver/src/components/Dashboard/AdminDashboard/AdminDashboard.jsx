import { Flex, Grid } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { courseListAction } from "redux/course/courseList/courseListAction"
import AdminRecentTables from "./AdminRecenTables"
import Count from "./Counts"
import DashboardBarChart from "./DashboardBarChart"
import DashboardLineChart from "./DashboardLineChart"

const AdminDashboard = ()=>{
  const dispatch = useDispatch()
  dispatch(courseListAction());
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