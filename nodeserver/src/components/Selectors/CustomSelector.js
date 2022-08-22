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

    onChange({
        ...state,
        [fieldId]: {
          id: tmp.length < 2 ? "" : tmp[1],
          name:  tmp.length < 2 ? "" : tmp[0],
        },
      });

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

          <option  selected={
             state[fieldId]["id"] === d._id
              ? true
              : false
          }  value={[d.name, d._id]}>{d.name}</option>
        ))}
      </Select>
    </Box>
  );
};
export default CustomSelector;
