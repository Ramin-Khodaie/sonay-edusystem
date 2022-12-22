import { Alert, AlertIcon, SimpleGrid, Text } from "@chakra-ui/react";
import TeacherCourseDetail from "../TeacherCourseDetail";

const TeacerCourse = (props) => {
  const { data } = props;


  console.log(data,7878)
  return (
    <>
      {data.length === 0 ? (
        <Alert
          borderRadius={"3rem"}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="100px"
          status="warning"
        >
          <AlertIcon />
          <Text textAlign={"center"}>هیچ کلاسی برای شما تعریف نشده است</Text>
        </Alert>
      ) : (
        <SimpleGrid
          dir="rtl"
          columns={{ sm: 1, md: 2, xl: 3 }}
          spacing="24px"
          mb="20px"
        >
          {data.map((item, key) => (
            <TeacherCourseDetail
              name={item.name}
              students={item.students}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default TeacerCourse;
