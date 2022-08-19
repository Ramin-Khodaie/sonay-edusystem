import { Box, Select } from "@chakra-ui/react";

const StudentStatusSelector = ({ onChange, filter }) => {

    const studentStatus = require('../../status.json');
    
    

    const handleFilterChange = (field) => (e) => {
        const { value } = e.target
        onChange({ ...filter, [field]: value })
    }
    return (
        <Box>
            <Select
                focusBorderColor="purple.300"
                textAlign={"center"}
                placeholder="وضعیت کاربر را انتخاب کنید"
                id="fStatus"
                onChange={handleFilterChange("fStatus")}
            >
                {studentStatus.map((d) => (
                    <option value={d.id}>{d.name}</option>
                ))}
            </Select>
        </Box>
    )
}

export default StudentStatusSelector;