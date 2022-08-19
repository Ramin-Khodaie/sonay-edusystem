const { Box, Select } = require("@chakra-ui/react")

const CourseSelector = ({ onChange, filter }) => {

    const courses = [
        { id: "1", name: "کلاس ۱" },
        { id: "2", name: "کلاس ۲" },
        { id: "3", name: "کلاس ۳" },
    ];

    const handleFilterChange = (field) => (e) => {
        const { value } = e.target
        onChange({ ...filter, [field]: value })

    }
    return (
        <Box>
            <Select
                focusBorderColor="purple.300"
                textAlign={"center"}
                placeholder="دوره کاربر را انتخاب کنید"
                id="fCourse"
                onChange={handleFilterChange("fCourse")}
            >


                {
                    courses.map((d) => (
                        <option value={d.id}>{d.name}</option>
                    ))
                }


            </Select>
        </Box>
    )
}
export default CourseSelector;