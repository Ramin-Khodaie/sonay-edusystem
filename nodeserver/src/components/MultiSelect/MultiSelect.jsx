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

const MultiSelect = ({ handleChange, handleDelete, data, options , placeholder }) => {

  const notify = useNotify();

  return (
    <>
      <Select
        focusBorderColor="purple.300"
        onChange={handleChange}
        textAlign={"center"}
        placeholder={placeholder}
      >
        {data.map((d) => (
          <option value={d._id}>{d.name}</option>
        ))}
      </Select>

      <Box
        padding={"10px"}
        marginTop={"25px"}
        borderWidth="1px"
        borderRadius="lg"
        minH={"155px"}
        overflow="hidden"
      >
        <Wrap>
          {options[0] && options.map((d) => {
            
            return (
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
                    colorScheme="transparent"
                    aria-label="Search database"
                    icon={<CloseIcon />}
                  />
                </Tag>
              </WrapItem>
            );
          })}
        </Wrap>
      </Box>
    </>
  );
};

export default MultiSelect;
