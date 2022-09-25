import {
  Table,
  Thead,
  Tbody,

  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Divider,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Input,
  SimpleGrid,
  Spacer,

} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { getRecentOrder } from "services/AdminReport";
import { getRecentOrderFilter } from "services/AdminReport";

const RecentOrder = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    startDate : "",
    endDate:"",
  
    

  });

  const callData = () => {
    getRecentOrder().then((res) => {
      setData(res.data.data);
    });
  };
  useEffect(() => {
    callData();
  }, []);
  
  
  const doSearch = async() => {
    const tmp = await getRecentOrderFilter(filter)

    setData(tmp.data.data)
  };


  useEffect(() => {
    setData(data);

    if (
      filter.name !== "" ||     
      filter.startDate !== "" ||
      filter.endDate !== "" 

    ) {
      doSearch();
    }
  }, [filter]);

  const handleStartDateChange = (v)=>{
    if(v){
        setFilter({...filter , startDate : `${v.year}/${v.month}/${v.day}` })
    }else{
        setFilter({...filter , startDate : "" })
    }
    

  }

  const handleEndDateChange = (v)=>{
    if(v){
        setFilter({...filter , endDate : `${v.year}/${v.month}/${v.day}` })
    }else{
        setFilter({...filter , endDate : "" })
    }

  }
  const handleFilterChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setFilter({ ...filter, [field]: value });
  };

  return (
    <>
      <Card mt={"100px"}>
        

      <Flex direction="column">
      <Accordion allowToggle>
        <AccordionItem>
          <Flex>
            <Box>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {" "}
                    نمایش فیلتر ها{" "}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>{" "}
            </Box>
            <Spacer />
            <Box>
              <Text
                fontSize="xl"
                
                fontWeight="bold"
                textAlign={"right"}
                my={"10px"}
              >
              لیست سفارشات اخیر ثبت شده در سامانه  {" "}
              </Text>
            </Box>
          </Flex>

          <AccordionPanel pb={4}>
            <SimpleGrid
              style={{ direction: "rtl" }}
              columns={{ sm: 1, md: 2, xl: 3 }}
              spacing="24px"
              mb="20px"
            >
              <Box>
                <Text>
                  نام کاربر:
                </Text>
                <Input
                  id="name"
                  onChange={handleFilterChange}
                  focusBorderColor="purple.300"
                  textAlign="right"
                  variant="outline"
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="نام کاربر را وارد کنید"
             
                  size="md"
                />
               
              </Box>

         
                <Box>
                  <Text  >از تاریخ:</Text>

                  <DatePicker
                  placeholder="تاریخ شروع را وارد کنید"
                    calendar={persian}
                    locale={persian_fa}
                    style={{ padding: "17px", width: "300px" }}
                    selected={filter.startDate}
                   
                    onChange={(v)=>{handleStartDateChange(v)}}
                  />
                </Box>

                <Box >
                  <Text  >تا تاریخ:</Text>
                  <DatePicker
                  placeholder="تاریخ پایان را وارد کنید"
                    calendar={persian}
                    locale={persian_fa}
                    style={{ padding: "17px", width: "300px" }}
                
                    selected={filter.endDate}

                    onChange={(v)=>{handleEndDateChange(v)}}
                  />
                </Box>

 

              {/* <Checkbox onChange={handleCheckBoxChange} id="isMain" size={"lg"} >
فقط محصولات اصلی                </Checkbox> */}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>


      </Card>

      <Card mt={"30px"}>
        <TableContainer>
          <Table dir="rtl" variant="striped" colorScheme="gray">
            <TableCaption>لیست سفارشات ثبت شده</TableCaption>
            <Thead>
              <Tr>
                <Th>نام و نام خانوادگی</Th>
                <Th>لیست کتاب / تعداد / قیمت</Th>
                <Th>قیمت کلی</Th>
                <Th>تاریخ</Th>
                <Th>کد رهگیری</Th>
                <Th>کارمزد</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((itm, id) => (
                <Tr>
                  <Td>{itm.student.full_name}</Td>
                  <Td>

                    {
                        itm.products.map((pr , index , arr)=>(
                            <>
                             <Text py={'5px'} >
                              {pr.name} / {pr.quantity} عدد / {pr.price} ریال
                            </Text>

                            { index !== arr.length - 1 && <hr  style={{"color":"gray"  }}></hr>}
                            
                            </>
                           
                          ))
                    }

                  </Td>
                  <Td >{itm.price}ریال</Td>
                  <Td >{itm.date}</Td>
                  <Td >{itm.ref_id}</Td>
                  <Td >{itm.fee}ریال</Td>
                </Tr>
              ))}
            </Tbody>
            
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};
export default RecentOrder;
