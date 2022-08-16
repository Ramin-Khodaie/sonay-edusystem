const { Box, Input } = require("@chakra-ui/react")

const UserNameInput = ({ filter , setFilter }) => {

    const handleFilterChange = (field) => (e) => {
        const { value } = e.target
        setFilter({ ...filter, [field]: value })
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