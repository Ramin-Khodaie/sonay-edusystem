import SliderWrapper from "components/SliderWrapper/SliderWrapper"
import CourseRecords from "components/CourseRecord/CourseRecords"
import { useState } from "react"
const Karne = () => {

    const handleSelectCourse = () => {

    }
    return (
        <div style={{ marginTop: "60px", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <SliderWrapper>
                <CourseRecords onSelectCourse={handleSelectCourse}  />
            </SliderWrapper>
        </div>

    )
}

export default Karne