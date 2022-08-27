import SliderWrapper from "components/SliderWrapper/SliderWrapper"
import CourseRecords from "components/CourseRecord/CourseRecords"
const Karne = () => {
    return (
        <div style={{ marginTop: "80px", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <SliderWrapper >
                <CourseRecords />
            </SliderWrapper>
        </div>

    )
}

export default Karne