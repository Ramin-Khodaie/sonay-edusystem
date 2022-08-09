import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Select,
  Box,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  HStack,
  Wrap,
  WrapItem,
  IconButton,
} from "@chakra-ui/react";
import useNotify from "helpers/notify/useNotify";
import React from "react";

const MultiSelect = () => {
  const data = [
    { id: "teacher", name: "دبیر" },
    { id: "student", name: "دانش آموز" },
    { id: "manager", name: "مدیر" },
  ];

  const notify = useNotify();

  const [options, setOptions] = React.useState([]);

  const handleChange = (e) => {
    const newOpt = data.find((f) => f.id === e.target.value);

    options.findIndex((itm) => itm.id == newOpt.id) === -1
      ? setOptions([...options, newOpt])
      : notify("این آیتم قبلا انتخاب شده است", true, "solid", "warning");
  };

  const handleDelete =(id)=> (e) => {

    setOptions(current =>
        current.filter(element => {
          return element.id !== id;
        }),
      );
  };

  return (
    <>
      <Select
       focusBorderColor='purple.300'
        onChange={handleChange}
        textAlign={"center"}
        placeholder="نقش کاربر را انتخاب کنید"
      >
        {data.map((d) => (
          <option value={d.id}>{d.name}</option>
        ))}
      </Select>

      <Box
        padding={"10px"}
        marginTop={"25px"}
        borderWidth="1px"
        borderRadius="lg"
        minH={"150px"}
        overflow="hidden"
      >
        <Wrap>
          {options.map((d) => (
            <WrapItem>
              <Tag
                size="lg"
                key="lg"
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
              >
                <TagLabel my={"15px"}>{d.name}</TagLabel>

                <IconButton
                  onClick={handleDelete(d.id)}              
                  size={"sm"}
                  colorScheme="blue"
                  aria-label="Search database"
                  icon={<CloseIcon />}
                />
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </>
  );
};

export default MultiSelect;
