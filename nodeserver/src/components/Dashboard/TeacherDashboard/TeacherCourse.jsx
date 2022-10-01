import { SimpleGrid } from '@chakra-ui/react'
import TeacherCourseDetail from '../TeacherCourseDetail'


const TeacerCourse = (props)=>{
    const {data} = props
    return(<>


    <SimpleGrid dir='rtl' columns={{ sm: 1, md:2 , xl: 3 }} spacing="24px" mb="20px" >
 {
        data.map((item , key)=>(
            <TeacherCourseDetail name={item.courses.name} students={item.students} />
        ))
    }
    </SimpleGrid>
    
   
    
    </>)
}

export default TeacerCourse