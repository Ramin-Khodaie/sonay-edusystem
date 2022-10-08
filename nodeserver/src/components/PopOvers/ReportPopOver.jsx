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

export const ReportPop1 = () => {
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

        <PopoverHeader textAlign={"center"}>
          راهنمای جدول سفارشات{" "}
        </PopoverHeader>
        <PopoverBody dir="rtl">
          <Text textAlign={"justify"}>
            پرداخت هایی که به همراه سفارش کتاب هستند،جدول زیر لیست می شود. به
            صورت پیش فرض سفارشات تا 3ماه گذشته نمایش داده می شود که قابل تغییر
            می باشد. جهت مشاهده تاریخ های پیشین میتوانید از قسمت جستجو بازه
            زمانی مد نظر خود را جستجو کنید. همچنین امکان جستجو بر حسب پارامتر
            های دیگر نیز امکان پذیر هست
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const ReportPop2 = () => {
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

        <PopoverHeader textAlign={"center"}>
          راهنمای جدول ثبت نام ها{" "}
        </PopoverHeader>
        <PopoverBody dir="rtl">
          <Text textAlign={"justify"}>

پرداخت هایی که برای ثبت نام کاربران می باشد در جدول زیر لیست می شود. به صورت پیش فرض ثبت نام ها تا 3ماه گذشته لیست می شود که قابل تغییر
            می باشد. جهت مشاهده تاریخ های پیشین میتوانید از قسمت جستجو بازه
            زمانی مد نظر خود را جستجو کنید. همچنین امکان جستجو بر حسب پارامتر
            های دیگر نیز امکان پذیر هست

          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
