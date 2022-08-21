const { Box, Input } = require("@chakra-ui/react")

const UserNameInput = ({ onChange, filter }) => {

    const handleFilterChange = (field) => (e) => {
        const { value } = e.target
       
        onChange({ ...filter, [field]: value })
    }
    return (
        <Box>
            <Input
                id="fFullName"
                onChange={handleFilterChange("fFullName")}
                focusBorderColor="purple.300"
                textAlign="right"
                variant="outline"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="نام و نام خانوادگی را وارد کنید"
                mb="10px"
                size="md"
            />
        </Box>
    )
}

export default UserNameInput;