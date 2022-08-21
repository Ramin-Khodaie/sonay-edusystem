const { Box, Select } = require("@chakra-ui/react");

const CustomSelector = ({
  onChange,
  state,
  data,
  placeHolder = "انتخاب کنید",
  fieldId = "fCourse",
}) => {
  const handleChange = (e) => {
    const tmp = e.target.value.split(",");
    // console.log(tmp,tmp.length,tmp.length < 2   )
    if (tmp.length < 2) {
        console.log("heeeeeeeeeeey")

      onChange({
        ...state,
        [fieldId]: {
          id: "",
          name: "",
        },
      });
    } else {
      const idd = tmp[1];
      const value = tmp[0];
      onChange({
        ...state,
        [fieldId]: {
          id: idd,
          name: value,
        },
      });
    }


  };
  return (
    <Box>
      <Select
        focusBorderColor="purple.300"
        textAlign={"center"}
        placeholder={placeHolder}
        onChange={handleChange}
      >
        {data.map((d) => (
          <option value={[d.name, d._id]}>{d.name}</option>
        ))}
      </Select>
    </Box>
  );
};
export default CustomSelector;
