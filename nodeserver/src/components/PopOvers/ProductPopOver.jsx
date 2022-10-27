import { QuestionIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Text,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

export const ProductPop1 = () => {
  return (
    <Popover   offset={[-20, 20]} arrowSize={"12"}>
      <PopoverTrigger>
        <QuestionIcon
          mr={"10px"}
          mt={"5px"}
          color={"yellow.600"}
          fontSize={"22px"}
        />
      </PopoverTrigger>
      <PopoverContent mr={'20px'} w={{sm:'400px' , md:'500px' , lg:'500px'}}>
        <PopoverCloseButton />
        <PopoverArrow />

        <PopoverHeader textAlign={"center"}>راهنمای ثبت محصول</PopoverHeader>
        <PopoverBody  >
          <Text textAlign={"justify"}>
            محصولات ثبت شده در صفحات کاربران بسته به دوره ای که برایشان تعریف
            شده،نمایش داده می شود و کاربر میتواند با هزینه ای که شما تعریف میکند
            آنها را خریداری نماید هنگام ثبت محصول به موارد زیر توجه کنید:
          </Text>

          <List pt={"10px"} spacing={2}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              نام و توضیحات محصول کوتاه و معنادار باشد{" "}
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              میتوانید برای هر محصول چندین دوره انتخاب کنید
            </ListItem>

            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              محصولاتی که فعال نیستند به کاربران نمایش داده نمی شوند{" "}
            </ListItem>

            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              محصولات اصلی شامل محصولاتی هست که جهت شرکت در دوره ها الزامی می
              باشد
            </ListItem>
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const ProductPop2 = () => {
  return (
    <Popover offset={[-20, 20]} arrowSize={"12"}>
      <PopoverTrigger>
        <QuestionIcon
          mr={"10px"}
          mt={"15px"}
          color={"yellow.600"}
          fontSize={"22px"}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverArrow />

        <PopoverHeader textAlign={"center"}>راهنمای جدول محصولات </PopoverHeader>
        <PopoverBody dir="rtl">
          <Text textAlign={"justify"}>
             تمامی محصولات تعریف شده در جدول زیر لیست می شود. میتوانید آنها
            را حذف یا ویرایش کنید. با فشردن دکمه "نمایش فیلترها" می توانید محصول
            مورد نظر خود را بر حسب پارامتر های متفاوت جستجو کنید
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
